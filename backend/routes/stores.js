// backend/routes/stores.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../authMiddleware");

// GET /stores (all stores)
router.get("/", async (req, res) => {
  try {
    const rows = await pool.query("SELECT S_id, name, short, rating, id FROM stores ORDER BY S_id DESC");
    res.json(rows);
  } catch (err) {
    console.error("GET /stores error:", err);
    res.status(500).json({ error: "db_error" });
  }
});

// POST /stores (create store)
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user || req.user.role !== "shopowner") {
      return res.status(403).json({ error: "forbidden" });
    }

    const { name, short = "", rating = 0, id } = req.body; 
    if (!name || !id) {
      return res.status(400).json({ error: "missing_fields" });
    }

    const result = await pool.query(
      "INSERT INTO stores (name, short, rating, id) VALUES (?, ?, ?, ?)",
      [name, short, rating, id]
    );

    res.status(201).json({
      S_id: result.insertId,
      name,
      short,
      rating,
      id
    });

  } catch (err) {
    console.error("POST /stores error:", err);
    res.status(500).json({ error: "db_error", details: err });
  }
});

module.exports = router;
