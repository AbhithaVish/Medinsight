const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const Product = require("../models/Product");
const Order = require("../models/Order");


/* ===============================
   CREATE STRIPE CHECKOUT SESSION
=================================*/
exports.createCheckoutSession = async (req, res) => {
  try {

    const { cartItems, userId } = req.body;

    console.log("User ID from frontend:", userId);

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const line_items = [];

    for (const item of cartItems) {

      const product = await Product.findByPk(item.id);

      if (!product) {
        return res.status(404).json({
          message: `Product ${item.id} not found`
        });
      }

      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name
          },
          unit_amount: Math.round(product.price * 100)
        },
        quantity: item.qty
      });

    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,

      metadata: {
        userId: userId || "guest",
        cartItems: JSON.stringify(
          cartItems.map(i => ({
            id: i.id,
            qty: i.qty
          }))
        )
      },

      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    });

    res.json({
      id: session.id,
      url: session.url
    });

  } catch (error) {

    console.error("Stripe Session Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });

  }
};



/* ===============================
   CONFIRM ORDER AFTER PAYMENT
=================================*/
exports.confirmOrder = async (req, res) => {

  try {

    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required"
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Stripe session not found"
      });
    }

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed"
      });
    }

    /* ===============================
       PREVENT DUPLICATE ORDERS
    =============================== */

    const existingOrder = await Order.findOne({
      where: { stripeSessionId: session.id }
    });

    if (existingOrder) {
      return res.json({
        success: true,
        message: "Order already processed",
        order: existingOrder
      });
    }

    /* ===============================
       CREATE ORDER
    =============================== */

    const newOrder = await Order.create({

      user_id:
        session.metadata?.userId &&
        session.metadata.userId !== "guest"
          ? session.metadata.userId
          : null,

      total: session.amount_total
        ? session.amount_total / 100
        : 0,

      status: "PAID",

      stripeSessionId: session.id
    });

    return res.json({
      success: true,
      message: "Order saved successfully",
      order: newOrder
    });

  } catch (error) {

    console.error("Confirmation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error confirming order",
      error: error.message
    });

  }
};