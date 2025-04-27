const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Diagnosis extends Model {
    static associate(models) {
        Diagnosis.belongsTo(models.Appointment, { foreignKey: 'appointmentId' });
        Diagnosis.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
        Diagnosis.belongsToMany(models.Disease, {
            through: 'diagnostico_enfermedad',
            foreignKey: 'id_diagnostico',
            otherKey: 'id_enfermedad',
            as: 'diseases'
        });
        Diagnosis.belongsToMany(models.Test, {
            through: 'diagnostico_prueba',
            foreignKey: 'id_diagnostico',
            otherKey: 'id_prueba',
            as: 'tests'
        });
        Diagnosis.belongsToMany(models.MedicalHistory, {
            through: 'historial_diagnostico',
            foreignKey: 'id_diagnostico',
            otherKey: 'id_historial',
            as: 'medicalHistories'
        });
        Diagnosis.hasMany(models.Prescription, { foreignKey: 'diagnosisId', as: 'prescriptions' });
    }
}

Diagnosis.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        appointmentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'appointments',
                key: 'id'
            }
        },
        doctorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'doctors',
                key: 'id'
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        modelName: 'Diagnosis',
        tableName: 'diagnoses',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Diagnosis;