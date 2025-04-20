const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../dbConfig');

class Prescription extends Model {
    static associate(models) {
        Prescription.belongsTo(models.Diagnosis, { foreignKey: 'diagnosisId' });
        Prescription.belongsTo(models.Medication, { foreignKey: 'medicationId' });
    }
}

Prescription.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_receta'
        },
        diagnosisId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_diagnostico',
            references: {
                model: 'diagnosticos',
                key: 'id_diagnostico'
            }
        },
        medicationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_medicamento',
            references: {
                model: 'medicamentos',
                key: 'id_medicamento'
            }
        },
        dose: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'dosis',
            validate: {
                notEmpty: {
                    msg: 'La dosis no puede estar vacía'
                }
            }
        },
        frequency: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'frecuencia',
            validate: {
                notEmpty: {
                    msg: 'La frecuencia no puede estar vacía'
                }
            }
        },
        duration: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'duracion',
            validate: {
                notEmpty: {
                    msg: 'La duración no puede estar vacía'
                }
            }
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'instrucciones'
        }
    },
    {
        sequelize,
        modelName: 'Prescription',
        tableName: 'recetas',
        timestamps: false
    }
);

module.exports = Prescription;