const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !cartItems.length) {
    return res.status(400).json({ message: "Cart empty" });
  }

  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.qty;
  });

  const order = await Order.create({
    user_id: req.user.id,
    total
  });

  for (const item of cartItems) {
    const product = await Product.findByPk(item.product_id);

    await OrderItem.create({
      order_id: order.id,
      product_id: product.id,
      shop_id: product.shop_id,
      qty: item.qty,
      price: product.price
    });

    product.stock -= item.qty;
    await product.save();
  }

  res.status(201).json(order);
};

// ✅ RENAMED FUNCTION
exports.getMyOrders = async (req, res) => {
  const orders = await Order.findAll({
    where: { user_id: req.user.id },
    include: {
      model: OrderItem,
      include: Product
    },
    order: [["createdAt", "DESC"]]
  });

  res.json(orders);
};


