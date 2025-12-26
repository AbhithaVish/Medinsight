const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/admin.controller");

/* ---------- STATS ---------- */
router.get(
  "/stats",
  auth,
  role(["ADMIN"]),
  controller.getStats
);

/* ---------- SHOPS ---------- */
router.get(
  "/shops",
  auth,
  role(["ADMIN"]),
  controller.getAllShops
);

router.put(
  "/shops/:id/status",
  auth,
  role(["ADMIN"]),
  controller.updateShopStatus
);

/* ---------- USERS ---------- */
router.get(
  "/users",
  auth,
  role(["ADMIN"]),
  controller.getAllUsers
);

router.put(
  "/users/:id/status",
  auth,
  role(["ADMIN"]),
  controller.toggleUserStatus
);

/* ---------- ORDERS ---------- */
router.get(
  "/orders",
  auth,
  role(["ADMIN"]),
  controller.getAllOrders
);

module.exports = router;
