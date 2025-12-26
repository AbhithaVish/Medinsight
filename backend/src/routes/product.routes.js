const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware"); // ✅ ONLY ONE
const controller = require("../controllers/product.controller");

// ---------------- PUBLIC ----------------
router.get("/", controller.getAllProducts);

router.get(
  "/shop/:shopId",
  controller.getProductsByShop
);

// ---------------- SHOP OWNER ----------------

// Get my products
router.get(
  "/my",
  auth,
  role(["SHOP_OWNER"]),
  controller.getMyProducts
);

// Add product (with optional image)
router.post(
  "/",
  auth,
  role(["SHOP_OWNER"]),
  upload.single("image"),
  controller.createProduct
);

// Update product (no image here)
router.put(
  "/:id",
  auth,
  role(["SHOP_OWNER"]),
  controller.updateProduct
);

// Upload / change product image
router.post(
  "/:id/image",
  auth,
  role(["SHOP_OWNER"]),
  upload.single("image"),
  controller.uploadProductImage
);

// Delete product
router.delete(
  "/:id",
  auth,
  role(["SHOP_OWNER"]),
  controller.deleteProduct
);

module.exports = router;
