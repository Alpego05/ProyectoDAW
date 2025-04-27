const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Prescription extends Model {
    static associate(models) {
        Prescription.belongsTo(models.Diagnosis, { foreignKey: 'diagnosisId' });
        Prescription.belongsTo(models.Medication, { foreignKey: 'medicationId' });
    }
}

Prescription.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        diagnosisId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'diagnoses',
                key: 'id'
            }
        },
        medicationId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'medications',
                key: 'id'
            }
        },
        dosage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        frequency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Prescription',
        tableName: 'prescriptions',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Prescription;