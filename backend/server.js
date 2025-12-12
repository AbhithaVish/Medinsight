// backend/server.js
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const pool = require("./db");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// ensure upload directory exists
const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// mount auth routes (separate file)
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// import JWT auth middleware for protected endpoints
const auth = require("./authMiddleware");

/* ---------- Public endpoints ---------- */
app.get("/api/stores", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM stores");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db_error" });
  }
});

app.get("/api/stores/:id/items", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM items WHERE store_id = ?", [req.params.id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db_error" });
  }
});

app.get("/api/appointments", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM appointments ORDER BY date_time ASC LIMIT 20");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db_error" });
  }
});

/* ---------- Protected endpoints (use auth middleware) ---------- */

app.post("/api/xray/upload", auth, async (req, res) => {
  try {
    if (!req.files || !req.files.scan) return res.status(400).json({ error: "no_file" });
    const scan = req.files.scan;
    const filename = Date.now() + "_" + scan.name;
    const savePath = path.join(UPLOAD_DIR, filename);
    await scan.mv(savePath);

    const [result] = await pool.query(
      "INSERT INTO xray_scans (user_id, filename, storage_path, analysis_status) VALUES (?, ?, ?, ?)",
      [req.user.id, scan.name, savePath, "queued"]
    );

    res.json({ success: true, id: result.insertId, message: "Uploaded and queued" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "upload_failed" });
  }
});

/* Cart endpoints (persistent cart) */
app.get("/api/cart", auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT ci.*, i.name, i.price FROM cart_items ci JOIN items i ON ci.item_id = i.id WHERE ci.user_id = ?",
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db_error" });
  }
});

app.post("/api/cart", auth, async (req, res) => {
  const { store_id, item_id, qty } = req.body;
  if (!store_id || !item_id) return res.status(400).json({ error: "missing_fields" });
  try {
    const [existing] = await pool.query(
      "SELECT id FROM cart_items WHERE user_id=? AND item_id=? AND store_id=?",
      [req.user.id, item_id, store_id]
    );
    if (existing.length) {
      await pool.query("UPDATE cart_items SET qty = qty + ? WHERE id = ?", [qty || 1, existing[0].id]);
      return res.json({ success: true });
    }
    await pool.query("INSERT INTO cart_items (user_id, store_id, item_id, qty) VALUES (?, ?, ?, ?)", [
      req.user.id,
      store_id,
      item_id,
      qty || 1,
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db_error" });
  }
});

app.post("/api/checkout", auth, async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [cart] = await conn.query(
      "SELECT ci.*, i.price FROM cart_items ci JOIN items i ON ci.item_id = i.id WHERE ci.user_id = ?",
      [req.user.id]
    );
    if (!cart.length) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({ error: "cart_empty" });
    }

    const byStore = {};
    for (const c of cart) {
      if (!byStore[c.store_id]) byStore[c.store_id] = [];
      byStore[c.store_id].push(c);
    }

    for (const storeId of Object.keys(byStore)) {
      const itemsForStore = byStore[storeId];
      const total = itemsForStore.reduce((s, it) => s + it.price * it.qty, 0);
      const [orderResult] = await conn.query("INSERT INTO orders (user_id, store_id, total) VALUES (?, ?, ?)", [
        req.user.id,
        storeId,
        total,
      ]);
      const orderId = orderResult.insertId;
      for (const it of itemsForStore) {
        await conn.query("INSERT INTO order_items (order_id, item_id, qty, price_at_purchase) VALUES (?, ?, ?, ?)", [
          orderId,
          it.item_id,
          it.qty,
          it.price,
        ]);
      }
    }

    await conn.query("DELETE FROM cart_items WHERE user_id = ?", [req.user.id]);
    await conn.commit();
    conn.release();
    res.json({ success: true });
  } catch (err) {
    if (conn) {
      try {
        await conn.rollback();
        conn.release();
      } catch (e) {
        console.error("Rollback failed:", e);
      }
    }
    console.error(err);
    res.status(500).json({ error: "checkout_failed" });
  }
});

const storesRoutes = require("./routes/stores");
app.use("/api/stores", storesRoutes);

/* ---------- Start server ---------- */
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
