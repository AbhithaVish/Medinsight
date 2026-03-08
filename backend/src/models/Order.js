const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Order = sequelize.define("Order", {

  total: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM("PLACED", "PAID", "CANCELLED"),
    defaultValue: "PLACED"
  },

  // 🔑 ADD THIS FIELD
  stripeSessionId: {
    type: DataTypes.STRING,
    unique: true
  }

});

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

module.exports = Order;