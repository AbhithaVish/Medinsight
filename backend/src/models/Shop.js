const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Shop = sequelize.define("Shop", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM("PENDING", "APPROVED", "BLOCKED"),
    defaultValue: "PENDING"
  }
});

/* ✅ NAMED ASSOCIATIONS (CRITICAL FIX) */
User.hasOne(Shop, {
  foreignKey: "owner_id",
  as: "shop"
});

Shop.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner"
});

module.exports = Shop;
