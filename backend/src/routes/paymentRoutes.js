const express = require("express");
const { createCheckoutSession, confirmOrder } = require("../controllers/payment.Controller");

const router = express.Router();

// 1. Existing route for checkout
router.post("/create-checkout-session", createCheckoutSession);

// 2. NEW route to confirm and save the order (Fixes the 404 error)
router.post("/confirm-order", confirmOrder);

module.exports = router;