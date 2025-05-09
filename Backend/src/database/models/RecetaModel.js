const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Receta extends Model {}

Receta.init(
    {
        id_receta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_diagnostico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'diagnosticos',
                key: 'id_diagnostico'
            }
        },
        id_paciente: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'pacientes',
                key: 'id_paciente'
            }
        },
        id_medicamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'medicamentos',
                key: 'id_medicamento'
            }
        },
        id_enfermedad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'enfermedades',
                key: 'id_enfermedad'
            }
        },
        dosis: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duracion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    },
    {
        sequelize,
        modelName: 'Receta',
        tableName: 'recetas',
        timestamps: true,
        underscored: true
    }
);

module.exports = Receta;
