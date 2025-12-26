const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./Order");
const Product = require("./Product");
const Shop = require("./Shop");

const OrderItem = sequelize.define("OrderItem", {
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("PENDING", "PROCESSING", "SHIPPED", "DELIVERED"),
    defaultValue: "PENDING"
  }
});

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

Shop.hasMany(OrderItem, { foreignKey: "shop_id" });
OrderItem.belongsTo(Shop, { foreignKey: "shop_id" });

module.exports = OrderItem;
