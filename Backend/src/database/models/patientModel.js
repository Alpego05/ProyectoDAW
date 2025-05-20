const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConfig");

class Patient extends Model { }

Patient.init(
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    genero: {
      type: DataTypes.ENUM("masculino", "femenino", "otro"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El género no puede estar vacío" },
        isIn: {
          args: [["masculino", "femenino", "otro"]],
          msg: "El género debe ser masculino, femenino u otro",
        },
      },
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La fecha de nacimiento no puede estar vacía" },
        isDate: { msg: "La fecha de nacimiento debe ser una fecha válida" },
      },
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La dirección no puede estar vacía" },
        len: { args: [5, 255], msg: "La dirección debe tener entre 5 y 255 caracteres" },
      },
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El teléfono no puede estar vacío" },
        len: { args: [9, 15], msg: "El teléfono debe tener entre 9 y 15 caracteres" },
        is: {
          args: /^[0-9\-+\s]+$/,
          msg: "El formato del teléfono no es válido",
        },
      },
    },
    tipo_sangre: {
      type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      allowNull: true,
      validate: {
        isIn: {
          args: [["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]],
          msg: "El tipo de sangre debe ser uno de los siguientes: A+, A-, B+, B-, AB+, AB-, O+, O-",
        },
      },
    },
    alergias: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: { args: [0, 1000], msg: "Las alergias no pueden exceder los 1000 caracteres" },
      },
    },
    historial: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: { args: [0, 1000], msg: "El historial médico no puede exceder los 1000 caracteres" },
      },
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "doctores",
        key: "usuario_id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "Patient",
    tableName: "pacientes",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Patient;