const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Patient extends Model {
    static associate(models) {
        Patient.belongsTo(models.User, { foreignKey: 'userId' });
        Patient.belongsTo(models.Doctor, { foreignKey: 'generalDoctorId', as: 'generalDoctor' });
        Patient.hasOne(models.MedicalHistory, { foreignKey: 'patientId', as: 'medicalHistory' });
        Patient.hasMany(models.Appointment, { foreignKey: 'patientId', as: 'appointments' });
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
            unique: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        generalDoctorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'doctors',
                key: 'id'
            }
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('M', 'F', 'Otro'),
            allowNull: false,
        },
        bloodType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        allergies: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        contactPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
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