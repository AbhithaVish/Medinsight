const Shop = require("../models/Shop");

// Shop owner creates shop
exports.createShop = async (req, res) => {
  const shop = await Shop.create({
    name: req.body.name,
    description: req.body.description,
    owner_id: req.user.id
  });

  res.status(201).json(shop);
};

// Get approved shops (public)
exports.getApprovedShops = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      where: { status: "APPROVED" }
    });

    res.json(shops);
  } catch (err) {
    console.error("SHOP FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to load shops" });
  }
};


// Admin updates shop status
exports.updateStatus = async (req, res) => {
  const shop = await Shop.findByPk(req.params.id);
  shop.status = req.body.status;
  await shop.save();

  res.json({ message: "Shop status updated" });
};

// Owner views own shop
exports.getMyShop = async (req, res) => {
  const shop = await Shop.findOne({
    where: { owner_id: req.user.id }
  });

  res.json(shop);
};

// Admin: get all shops
exports.getAllShops = async (req, res) => {
  const shops = await Shop.findAll();
  res.json(shops);
}
