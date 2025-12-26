const OrderItem = require("../models/OrderItem");
const Shop = require("../models/Shop");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Get orders for shop owner
exports.getMyOrders = async (req, res) => {
  const shop = await Shop.findOne({
    where: { owner_id: req.user.id }
  });

  if (!shop) {
    return res.status(404).json({ message: "Shop not found" });
  }

  const items = await OrderItem.findAll({
    where: { shop_id: shop.id },
    include: [
      { model: Product, attributes: ["name"] },
      { model: Order, attributes: ["id", "createdAt"] }
    ],
    order: [["createdAt", "DESC"]]
  });

  res.json(items);
};

// Update order item status
exports.updateItemStatus = async (req, res) => {
  const item = await OrderItem.findByPk(req.params.id, {
    include: {
      model: Shop
    }
  });

  if (!item || item.Shop.owner_id !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  item.status = req.body.status;
  await item.save();

  res.json(item);
};


