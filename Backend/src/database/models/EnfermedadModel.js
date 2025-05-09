const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Enfermedad extends Model {}

Enfermedad.init(
    {
        id_enfermedad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sintomas: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        codigo_cie: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'Enfermedad',
        tableName: 'enfermedades',
        timestamps: true,
        underscored: true
    }
);

module.exports = Enfermedad;
