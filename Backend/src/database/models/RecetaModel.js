const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Receta extends Model { }

Receta.init(
    {
        id_receta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        diagnostico_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'diagnosticos',
                key: 'id_diagnostico'
            }
        },
        id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pacientes',
                key: 'usuario_id'
            }
        },
        medicamento_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'medicamentos',
                key: 'id_medicamento'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        id_enfermedad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'enfermedades',
                key: 'id_enfermedad'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE'
        },
        dosis: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duracion: {
            type: DataTypes.STRING,
            allowNull: false
        }
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

