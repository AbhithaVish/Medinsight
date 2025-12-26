const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/ownerOrder.controller");

router.get(
  "/my",
  auth,
  role(["SHOP_OWNER"]),
  controller.getMyOrders
);

router.put(
  "/item/:id/status",
  auth,
  role(["SHOP_OWNER"]),
  controller.updateItemStatus
);

module.exports = router;
