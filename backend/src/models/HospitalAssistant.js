const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const HospitalAssistant = sequelize.define("HospitalAssistant", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
  experience_years: DataTypes.INTEGER,
  bio: DataTypes.TEXT,
  hourly_rate: DataTypes.FLOAT
});

module.exports = HospitalAssistant;
