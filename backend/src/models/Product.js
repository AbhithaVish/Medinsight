const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Shop = require("./Shop");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
  type: DataTypes.STRING,
  allowNull: true
}
});

Shop.hasMany(Product, { foreignKey: "shop_id" });
Product.belongsTo(Shop, { foreignKey: "shop_id" });

module.exports = Product;
