const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../dbConfig');

class Patient extends Model {
    static associate(models) {
        Patient.belongsTo(models.User, { foreignKey: 'userId' });
        Patient.belongsTo(models.Doctor, { foreignKey: 'generalDoctorId', as: 'generalDoctor' });
        Patient.hasMany(models.Appointment, { foreignKey: 'patientId', as: 'appointments' });
        Patient.hasMany(models.Diagnosis, { foreignKey: 'patientId', as: 'diagnoses' });
    }
}

Patient.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
            references: {
                model: 'users',
                key: 'id'
            }
        },
        generalDoctorId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'general_doctor_id',
            references: {
                model: 'doctors',
                key: 'id'
            }
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'date_of_birth', 
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bloodType: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'blood_type',
        },
        allergies: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        contactPhone: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'contact_phone',
        },
        address: {
            type: DataTypes.STRING,
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
        modelName: 'Patient',
        tableName: 'patients',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Patient;