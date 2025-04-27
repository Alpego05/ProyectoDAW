const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class MedicalHistory extends Model {
    static associate(models) {
        MedicalHistory.belongsTo(models.Patient, { foreignKey: 'patientId' });
        MedicalHistory.belongsToMany(models.Diagnosis, {
            through: 'historial_diagnostico',
            foreignKey: 'id_historial',
            otherKey: 'id_diagnostico',
            as: 'diagnoses'
        });
    }
}

MedicalHistory.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        patientId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: 'patients',
                key: 'id'
            }
        },
        backgroundInfo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        familyHistory: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        notes: {
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
        modelName: 'MedicalHistory',
        tableName: 'medical_histories',
        timestamps: true,
        underscored: true,
    }
);

module.exports = MedicalHistory;
