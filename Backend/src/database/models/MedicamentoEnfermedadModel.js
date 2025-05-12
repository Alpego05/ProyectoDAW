const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class MedicamentoEnfermedad extends Model { }

MedicamentoEnfermedad.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
        dosis_recomendada: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eficacia: {
            type: DataTypes.ENUM('Baja', 'Media', 'Alta'),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: "MedicamentoEnfermedad",
        tableName: "medicamentos_enfermedades",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

module.exports = MedicamentoEnfermedad;
