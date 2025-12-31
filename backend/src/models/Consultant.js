const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Consultant = sequelize.define("Consultant", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experience_years: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  bio: {
    type: DataTypes.TEXT
  },
  hourly_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = Consultant;
