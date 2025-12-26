const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/order.controller");

router.post(
  "/",
  auth,
  role(["USER"]),
  controller.createOrder
);

router.get(
  "/my",
  auth,
  role(["USER"]),
  controller.getMyOrders
);


module.exports = router;
