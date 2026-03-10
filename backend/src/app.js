const express = require("express");
const cors = require("cors");
const path = require("path");
const ownerRoutes = require("./routes/ownerRoutes");
const app = express();

/* ---------- Static Uploads ---------- */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/* ---------- Middlewares ---------- */
app.use(cors());
app.use(express.json());

/* ---------- Routes ---------- */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/shops", require("./routes/shop.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/owner/orders", require("./routes/ownerOrder.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/admin/shops", require("./routes/adminShop.routes"));
app.use("/api/assistants", require("./routes/assistant.routes"));
app.use("/api/consultants", require("./routes/consultant.routes"));
app.use("/api/consultants/auth", require("./routes/consultantAuth.routes"));

/* ---------- Payments (Stripe) ---------- */
app.use("/api/payments", require("./routes/paymentRoutes"));

module.exports = app;