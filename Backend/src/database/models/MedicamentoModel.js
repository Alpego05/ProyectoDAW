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
            type: DataTypes.ENUM(
                'Analgésico',
                'Antibiótico',
                'Antiinflamatorio',
                'Antihipertensivo',
                'Antidiabético',
                'Antidepresivo',
                'Anticonvulsivante',
                'Antihistamínico',
                'Vacuna',
                'Anticoagulante',
                'Diurético',
                'Corticosteroide',
                'Antifúngico',
                'Ansiolítico',
                'Antipsicótico',
                'Gastroprotector',
                'Vitamina',
                'Suplemento',
                'Hormonal',
                'Antialérgico',
                'Cardiotónico',
                'Antiemético',
                'Laxante',
                'Antidiarreico',
                'Mucolítico',
                'Expectorante',
                'Antiséptico',
                'Anestésico'
            ),
            allowNull: false,
            validate: {
                notEmpty: { msg: "La categoría no puede estar vacía" }
            },
        },
        efectos_secundarios: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: { args: [0, 2000], msg: "Los efectos secundarios no pueden exceder los 2000 caracteres" },
            },
        },
        alergernos: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: { args: [0, 2000], msg: "Los alergenos no pueden exceder los 2000 caracteres" },
            },
        },
        forma_via: {
            type: DataTypes.ENUM(
                'Oral',
                'Inyectable',
                'Tópica',
                'Inhalada',
                'Oftálmica',
                'Ótica',
                'Nasal',
                'Rectal',
                'Vaginal',
                'Sublingual',
                'Vacuna'
            ),
            allowNull: false,
            validate: {
                notEmpty: { msg: "La forma/vía de administración no puede estar vacío" }
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
