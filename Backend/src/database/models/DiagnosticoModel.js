const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Diagnostico extends Model { }

Diagnostico.init(
    {
        id_diagnostico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_cita: {
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
        id_paciente: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "pacientes",
                key: "id_paciente",
            },
        },
        id_doctor: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "doctores",
                key: "id_doctor",
            },
        },
        id_receta: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "recetas",
                key: "id_receta",
            },
            validate: {
                isInt: { msg: "El ID de la receta debe ser un número entero" },
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
    },
    {
        sequelize,
        modelName: "Diagnostico",
        tableName: "diagnosticos",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

module.exports = Diagnostico;
