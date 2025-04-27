const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Doctor extends Model {
    static associate(models) {
        Doctor.belongsTo(models.User, { foreignKey: 'userId' });
        Doctor.hasMany(models.Schedule, { foreignKey: 'doctorId', as: 'schedules' });
        Doctor.hasMany(models.Appointment, { foreignKey: 'doctorId', as: 'appointments' });
        Doctor.hasMany(models.Diagnosis, { foreignKey: 'doctorId', as: 'diagnoses' });
        Doctor.hasMany(models.Patient, { foreignKey: 'generalDoctorId', as: 'patients' });
    }
}

Doctor.init(
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
        speciality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        licenseNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isGeneralDoctor: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        modelName: 'Doctor',
        tableName: 'doctors',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Doctor;