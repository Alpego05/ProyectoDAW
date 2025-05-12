const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Diagnostico extends Model {}

Diagnostico.init(
  {
    id_diagnostico: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cita_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "citas",
        key: "id_cita",
      },
      validate: {
        notEmpty: { msg: "El ID de la cita no puede estar vacío" },
        isInt: { msg: "El ID de la cita debe ser un número entero" },
      },
    },
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pacientes",
        key: "usuario_id",
      },
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "doctores",
        key: "usuario_id",
      },
    },
    sintomas: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Los síntomas no pueden estar vacíos" },
        len: { args: [10, 2000], msg: "Los síntomas deben tener entre 10 y 2000 caracteres" },
      },
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Diagnostico",
    tableName: "diagnosticos",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Diagnostico;