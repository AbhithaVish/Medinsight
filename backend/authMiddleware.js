// backend/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "CHANGE_THIS_SECRET";

module.exports = function (req, res, next) {
  // debug log (remove or reduce in production)
  console.log("[authMiddleware] Authorization header:", req.headers.authorization);

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "no_token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id, email: payload.email, role: payload.role };
    return next();
  } catch (err) {
    console.error("[authMiddleware] token verify failed:", err && err.message ? err.message : err);
    return res.status(401).json({ error: "invalid_token" });
  }
};
