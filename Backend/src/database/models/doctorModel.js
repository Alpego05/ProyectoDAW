const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConfig");

class Doctor extends Model {}

Doctor.init(
  {
    id_doctor: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "dni",
      },
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sala_asignada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Doctor",
    tableName: "doctores",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Doctor;
