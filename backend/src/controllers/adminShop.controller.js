const Shop = require("../models/Shop");
const User = require("../models/User");

/* ---------------- GET ALL SHOPS ---------------- */
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      include: {
        model: User,
        as: "owner",
        attributes: ["id", "email"]
      },
      order: [["createdAt", "DESC"]]
    });

    res.json(shops);
  } catch (err) {
    console.error("ADMIN GET SHOPS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch shops" });
  }
};

/* ---------------- UPDATE SHOP STATUS ---------------- */
exports.updateShopStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const shop = await Shop.findByPk(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    shop.status = status;
    await shop.save();

    res.json({ message: "Shop status updated" });
  } catch (err) {
    console.error("ADMIN UPDATE SHOP ERROR:", err);
    res.status(500).json({ message: "Failed to update shop" });
  }
};
