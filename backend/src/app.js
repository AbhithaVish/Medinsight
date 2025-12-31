const express = require("express");
const cors = require("cors");

const app = express();

const path = require("path");


app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.use(cors());
app.use(express.json());

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

module.exports = app;
