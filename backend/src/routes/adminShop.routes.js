const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/adminShop.controller");

/* ---------------- ADMIN ONLY ---------------- */

router.get(
  "/",
  auth,
  role(["ADMIN"]),
  controller.getAllShops
);

router.put(
  "/:id/status",
  auth,
  role(["ADMIN"]),
  controller.updateShopStatus
);

module.exports = router;
