// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../db");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "CHANGE_THIS_SECRET";
const SALT_ROUNDS = 10;

// Helper: remove password field from returned user object
function sanitizeUser(row) {
  if (!row) return null;
  const { password, ...u } = row;
  return u;
}

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "Missing required fields (email/password/role)." });
    }
    if (!["patient", "shopowner"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role." });
    }

    const existing = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    // IMPORTANT: your DB column is named `password` — store the hash there
    await query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
      name || null,
      email,
      hashed,
      role,
    ]);

    // fetch created user to return (without password)
    const rows = await query("SELECT id, name, email, role, created_at FROM users WHERE email = ?", [email]);
    const user = rows[0];

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({ success: true, token, user });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log("[LOGIN] incoming", { email, role, hasPassword: !!password });

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "Missing required fields (email/password/role)." });
    }
    if (!["patient", "shopowner"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role." });
    }

    // select the `password` column (your DB column)
    const rows = await query(
      "SELECT id, name, email, password, role, created_at FROM users WHERE email = ? AND role = ?",
      [email, role]
    );

    console.log("[LOGIN] rows found:", rows.length);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const userRow = rows[0];

    // compare provided password with the hashed value stored in `password`
    const ok = await bcrypt.compare(password, userRow.password);
    console.log("[LOGIN] bcrypt.compare:", ok);

    if (!ok) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const user = sanitizeUser(userRow);
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({ success: true, token, user });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
