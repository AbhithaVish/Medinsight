const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/shop.controller");

router.get("/", controller.getApprovedShops);

router.post(
  "/",
  auth,
  role(["SHOP_OWNER"]),
  controller.createShop
);

router.get(
  "/me",
  auth,
  role(["SHOP_OWNER"]),
  controller.getMyShop
);

router.put(
  "/:id/status",
  auth,
  role(["ADMIN"]),
  controller.updateStatus
);

router.get(
  "/admin/all",
  auth,
  role(["ADMIN"]),
  controller.getAllShops
);

module.exports = router; // 🔴 THIS LINE MUST EXIST
