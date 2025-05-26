const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Medicamento extends Model { }

Medicamento.init(
    {
        id_medicamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "El nombre del medicamento no puede estar vacío" },
                len: { args: [3, 100], msg: "El nombre del medicamento debe tener entre 3 y 100 caracteres" },
            },
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "La categoría no puede estar vacía" },
                isIn: {
                    args: [[
                        "Analgésico",
                        "Antibiótico",
                        "Antiinflamatorio",
                        "Antihipertensivo",
                        "Antidiabético",
                        "Antidepresivo",
                        "Anticonvulsivante",
                        "Antihistamínico",
                        "Antiviral",
                        "Vacuna"
                    ]],
                    msg: "Categoría no válida",
                },
            },
        },
        efectos_secundarios: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: { args: [0, 2000], msg: "Los efectos secundarios no pueden exceder los 2000 caracteres" },
            },
        },
        forma_via: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "La forma/vía de administración no puede estar vacío" },
                len: { args: [3, 100], msg: "La forma/vía debe tener entre 3 y 100 caracteres" },
                isIn: {
                    args: [
                        [
                            "Oral",
                            "Intravenosa",
                            "Intramuscular",
                            "Subcutánea",
                            "Tópica",
                            "Inhalada",
                            "Rectal",
                            "Oftálmica",
                            "Ótica",
                            "Nasal",
                            "Sublingual",
                            "Transdérmica",
                        ],
                    ],
                    msg: "La forma/vía debe ser una de las formas de administración válidas",
                },
            },
        },

        desc: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: { args: [0, 500], msg: "La descripción no puede exceder los 500 caracteres" },
            },
        },
    },
    {
        sequelize,
        modelName: "Medicamento",
        tableName: "medicamentos",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
)

module.exports = Medicamento;
