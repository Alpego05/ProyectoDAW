const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class HorarioAtencion extends Model {}

HorarioAtencion.init(
  {
    id_horario: {
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
    },
    dia_semana: {
      type: DataTypes.ENUM("lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El día no puede estar vacío" },
        isIn: {
          args: [["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]],
          msg: "El día debe ser lunes, martes, miercoles, jueves, viernes, sabado o domingo",
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
  },
  {
    sequelize,
    modelName: "HorarioAtencion",
    tableName: "horarios_atencion",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = HorarioAtencion;