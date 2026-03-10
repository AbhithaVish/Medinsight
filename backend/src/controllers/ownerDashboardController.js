const Order = require("../models/Order");
const Product = require("../models/Product");
const OrderItem = require("../models/OrderItem");

exports.getOwnerStats = async (req, res) => {
  try {

    const shopId = req.params.shopId;

    // total sales
    const sales = await OrderItem.sum("price", {
      where: { shop_id: shopId }
    });

    // total orders
    const orders = await OrderItem.count({
      distinct: true,
      col: "order_id",
      where: { shop_id: shopId }
    });

    // total products
    const products = await Product.count({
      where: { shop_id: shopId }
    });

    // pending orders
    const pending = await OrderItem.count({
      where: {
        shop_id: shopId,
        status: "PENDING"
      }
    });

    res.json({
      totalSales: sales || 0,
      totalOrders: orders,
      totalProducts: products,
      pendingOrders: pending
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard stats error" });
  }
};