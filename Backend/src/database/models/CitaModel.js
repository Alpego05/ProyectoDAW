const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Cita extends Model { }

Cita.init(
  {
    id_cita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "doctores",
        key: "usuario_id",
      },
      validate: {
        notEmpty: { msg: "El ID del doctor no puede estar vacío" },
      },
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
          msg: "El nombre solo puede contener letras y espacios",
        },
        notEmpty: true,
      },
    },

    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pacientes",
        key: "usuario_id",
      },
      validate: {
        notEmpty: { msg: "El ID del paciente no puede estar vacío" },
      },
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La fecha no puede estar vacía" },
        isDate: { msg: "El formato de la fecha no es válido" },
        isFutureDate(value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const dateValue = new Date(value);
          if (dateValue < today) {
            throw new Error("La fecha de la cita no puede ser en el pasado");
          }
        },
      },
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La hora de inicio no puede estar vacía" },
      },
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La hora de fin no puede estar vacía" },
        isAfterStartTime(value) {
          if (this.hora_inicio && value <= this.hora_inicio) {
            throw new Error("La hora de fin debe ser posterior a la hora de inicio");
          }
        },
      },
    },
    estado: {
      type: DataTypes.ENUM("Pendiente", "Completada", "No asistida"),
      defaultValue: "Pendiente",
      allowNull: false,
      validate: {
        notEmpty: { msg: "El estado no puede estar vacío" },
        isIn: {
          args: [["Pendiente", "Completada", "No asistida"]],
          msg: "El estado debe ser Pendiente, Completada o No asistida",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Cita",
    tableName: "citas",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Cita;