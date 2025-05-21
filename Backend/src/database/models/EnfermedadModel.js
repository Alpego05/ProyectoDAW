const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Enfermedad extends Model { }
Enfermedad.init(
    {
        id_enfermedad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "El nombre de la enfermedad no puede estar vacío" },
                len: { args: [3, 100], msg: "El nombre de la enfermedad debe tener entre 3 y 100 caracteres" },
            },
        },
        sintomas: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: { args: [0, 2000], msg: "Los síntomas no pueden exceder los 2000 caracteres" },
            },
        },

        desc: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: { args: [0, 500], msg: "La descripción no puede exceder los 500 caracteres" },
            },
        },

        codigo_cie: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "El código CIE no puede estar vacío" },
                len: { args: [3, 10], msg: "El código CIE debe tener entre 3 y 10 caracteres" },
                is: {
                    args: /^[A-Z][0-9]{2}(\.[0-9]{1,2})?$/,
                    msg: "El formato del código CIE no es válido (ej: A01, A01.1)",
                },
            },
        },
    },
    {
        sequelize,
        modelName: "Enfermedad",
        tableName: "enfermedades",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

module.exports = Enfermedad;
