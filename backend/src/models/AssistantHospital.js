const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const HospitalAssistant = require("./HospitalAssistant");

const AssistantHospital = sequelize.define("AssistantHospital", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  hospital_name: DataTypes.STRING,
  location: DataTypes.STRING
});

/* 🔗 RELATION */
HospitalAssistant.hasMany(AssistantHospital, {
  foreignKey: "assistant_id"
});
AssistantHospital.belongsTo(HospitalAssistant, {
  foreignKey: "assistant_id"
});

module.exports = AssistantHospital;
