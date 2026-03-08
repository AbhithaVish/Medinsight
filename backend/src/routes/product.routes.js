const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/product.controller");

// ---------------- PUBLIC ----------------
router.get("/", controller.getAllProducts);
router.get("/shop/:shopId", controller.getProductsByShop);

// ---------------- RECOMMENDATIONS ----------------
router.post("/recommendations", controller.getRecommendedProducts);

// ---------------- SHOP OWNER ----------------
router.get(
  "/my",
  auth,
  role(["SHOP_OWNER"]),
  controller.getMyProducts
);

router.post(
  "/",
  auth,
  role(["SHOP_OWNER"]),
  upload.single("image"),
  controller.createProduct
);

router.put(
  "/:id",
  auth,
  role(["SHOP_OWNER"]),
  controller.updateProduct
);

router.post(
  "/:id/image",
  auth,
  role(["SHOP_OWNER"]),
  upload.single("image"),
  controller.uploadProductImage
);

router.delete(
  "/:id",
  auth,
  role(["SHOP_OWNER"]),
  controller.deleteProduct
);

module.exports = router;