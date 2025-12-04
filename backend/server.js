const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const pool = require("./db");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

/* Auth: register/login */
app.post("/api/auth/register", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: "missing_fields" });
  try {
    const [exists] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (exists.length) return res.status(400).json({ error: "user_exists" });
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)", [email, hash, name || null]);
    const userId = result.insertId;
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: userId, email, name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db_error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "missing_fields" });
  try {
    const [rows] = await pool.query("SELECT id, email, password_hash, name FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(400).json({ error: "invalid_credentials" });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: "invalid_credentials" });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db_error" });
  }
});

/* Public endpoints */
app.get("/api/stores", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM stores");
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "db_error" }); }
});

app.get("/api/stores/:id/items", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM items WHERE store_id = ?", [req.params.id]);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "db_error" }); }
});

app.get("/api/appointments", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM appointments ORDER BY date_time ASC LIMIT 20");
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "db_error" }); }
});

/* Protected endpoints require JWT */
const auth = require("./authMiddleware");

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
    const [rows] = await pool.query("SELECT ci.*, i.name, i.price FROM cart_items ci JOIN items i ON ci.item_id = i.id WHERE ci.user_id = ?", [req.user.id]);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "db_error" }); }
});

app.post("/api/cart", auth, async (req, res) => {
  const { store_id, item_id, qty } = req.body;
  if (!store_id || !item_id) return res.status(400).json({ error: "missing_fields" });
  try {
    const [existing] = await pool.query("SELECT id FROM cart_items WHERE user_id=? AND item_id=? AND store_id=?", [req.user.id, item_id, store_id]);
    if (existing.length) {
      await pool.query("UPDATE cart_items SET qty = qty + ? WHERE id = ?", [qty || 1, existing[0].id]);
      return res.json({ success: true });
    }
    await pool.query("INSERT INTO cart_items (user_id, store_id, item_id, qty) VALUES (?, ?, ?, ?)", [req.user.id, store_id, item_id, qty || 1]);
    res.json({ success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: "db_error" }); }
});

app.post("/api/checkout", auth, async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [cart] = await conn.query("SELECT ci.*, i.price FROM cart_items ci JOIN items i ON ci.item_id = i.id WHERE ci.user_id = ?", [req.user.id]);
    if (!cart.length) { await conn.rollback(); conn.release(); return res.status(400).json({ error: "cart_empty" }); }
    const byStore = {};
    for (const c of cart) {
      if (!byStore[c.store_id]) byStore[c.store_id] = [];
      byStore[c.store_id].push(c);
    }
    for (const storeId of Object.keys(byStore)) {
      const itemsForStore = byStore[storeId];
      const total = itemsForStore.reduce((s, it) => s + it.price * it.qty, 0);
      const [orderResult] = await conn.query("INSERT INTO orders (user_id, store_id, total) VALUES (?, ?, ?)", [req.user.id, storeId, total]);
      const orderId = orderResult.insertId;
      for (const it of itemsForStore) {
        await conn.query("INSERT INTO order_items (order_id, item_id, qty, price_at_purchase) VALUES (?, ?, ?, ?)", [orderId, it.item_id, it.qty, it.price]);
      }
    }
    await conn.query("DELETE FROM cart_items WHERE user_id = ?", [req.user.id]);
    await conn.commit();
    res.json({ success: true });
  } catch (err) { await conn.rollback(); conn.release(); console.error(err); res.status(500).json({ error: "checkout_failed" }); }
});

/* Start server */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server listening on", port));
