const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConfig");

class Doctor extends Model { }

Doctor.init(
  {
    id_doctor: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      },
      
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La especialidad no puede estar vacía" },
        len: { args: [3, 100], msg: "La especialidad debe tener entre 3 y 100 caracteres" },
      },
    },
    sala_asignada: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La sala asignada no puede estar vacía" },
        len: { args: [2, 20], msg: "La sala asignada debe tener entre 2 y 20 caracteres" },
      },
    },
  },
  {
    sequelize,
    modelName: "Doctor",
    tableName: "doctores",
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = Doctor;
