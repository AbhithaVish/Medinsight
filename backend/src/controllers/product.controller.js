const Product = require("../models/Product");
const Shop = require("../models/Shop");
const { Op } = require("sequelize");

// ---------------- CREATE PRODUCT ----------------
exports.createProduct = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      where: {
        owner_id: req.user.id,
        status: "APPROVED"
      }
    });

    if (!shop) {
      return res.status(403).json({
        message: "Shop not approved or not found"
      });
    }

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      shop_id: shop.id,
      image: req.file ? req.file.filename : null
    });

    res.status(201).json(product);

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// ---------------- GET PRODUCTS BY SHOP ----------------
exports.getProductsByShop = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { shop_id: req.params.shopId }
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ---------------- UPDATE PRODUCT ----------------
exports.updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: Shop
  });

  if (!product || product.Shop.owner_id !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await product.update({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  });

  res.json(product);
};

// ---------------- DELETE PRODUCT ----------------
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: Shop
  });

  if (!product || product.Shop.owner_id !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await product.destroy();
  res.json({ message: "Product deleted" });
};

// ---------------- UPLOAD PRODUCT IMAGE ----------------
exports.uploadProductImage = async (req, res) => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.image = req.file.filename;
  await product.save();

  res.json(product);
};

// ---------------- GET MY PRODUCTS ----------------
exports.getMyProducts = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      where: { owner_id: req.user.id }
    });

    if (!shop) return res.json([]);

    const products = await Product.findAll({
      where: { shop_id: shop.id }
    });

    res.json(products);

  } catch (error) {
    console.error("GET MY PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ---------------- GET ALL PRODUCTS ----------------
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Shop,
        where: { status: "APPROVED" },
        attributes: ["name"]
      }
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ---------------- GET RECOMMENDED PRODUCTS ----------------
exports.getRecommendedProducts = async (req, res) => {
  try {
    const { tags } = req.body;

    if (!tags || !Array.isArray(tags)) {
      return res.status(400).json({
        message: "Tags array is required"
      });
    }

    const products = await Product.findAll({
      where: {
        [Op.or]: tags.map(tag => ({
          name: {
            [Op.like]: `%${tag}%`
          }
        }))
      },
      include: {
        model: Shop,
        where: { status: "APPROVED" },
        attributes: ["name"]
      }
    });

    res.json(products);

  } catch (error) {
    console.error("RECOMMENDATION ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch recommended products"
    });
  }
};