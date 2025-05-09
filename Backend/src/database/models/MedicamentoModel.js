const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Medicamento extends Model {}

Medicamento.init(
    {
        id_medicamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        efectos_secundarios: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        forma_via: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
    {
        sequelize,
        modelName: 'Medicamento',
        tableName: 'medicamentos',
        timestamps: true,
        underscored: true
    }
);

module.exports = Medicamento;
