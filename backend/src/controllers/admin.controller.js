const Shop = require("../models/Shop");
const User = require("../models/User");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

/* ---------- ADMIN STATS ---------- */
exports.getStats = async (req, res) => {
  const shops = await Shop.count();
  const users = await User.count();
  const orders = await Order.count();

  res.json({ shops, users, orders });
};

/* ---------- SHOPS ---------- */
exports.getAllShops = async (req, res) => {
  const shops = await Shop.findAll({
    include: ["owner"]
  });
  res.json(shops);
};

exports.updateShopStatus = async (req, res) => {
  const { status } = req.body;
  await Shop.update({ status }, { where: { id: req.params.id } });
  res.json({ message: "Shop status updated" });
};

/* ---------- USERS ---------- */
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "email", "role", "blocked"]
  });
  res.json(users);
};

exports.toggleUserStatus = async (req, res) => {
  const { blocked } = req.body;
  await User.update({ blocked }, { where: { id: req.params.id } });
  res.json({ message: "User status updated" });
};

/* ---------- ORDERS ---------- */
exports.getAllOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [OrderItem]
  });
  res.json(orders);
};
