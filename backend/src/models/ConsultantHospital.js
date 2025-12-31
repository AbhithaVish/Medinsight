const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Consultant = require("./Consultant");

const ConsultantHospital = sequelize.define("ConsultantHospital", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  hospital_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING
  }
});

Consultant.hasMany(ConsultantHospital, {
  foreignKey: "consultant_id",
  onDelete: "CASCADE"
});
ConsultantHospital.belongsTo(Consultant, {
  foreignKey: "consultant_id"
});

module.exports = ConsultantHospital;
