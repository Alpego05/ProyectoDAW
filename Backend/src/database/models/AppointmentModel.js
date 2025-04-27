const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Appointment extends Model {
    static associate(models) {
        Appointment.belongsTo(models.Patient, { foreignKey: 'patientId' });
        Appointment.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
        Appointment.belongsToMany(models.Schedule, {
            through: 'agenda_cita',
            foreignKey: 'id_cita',
            otherKey: 'id_agenda',
            as: 'schedules'
        });
        Appointment.hasOne(models.Diagnosis, { foreignKey: 'appointmentId', as: 'diagnosis' });
    }
}

Appointment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        patientId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'patients',
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        room: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pendiente', 'completada','no_asistida'),
            defaultValue: 'pendiente',
            allowNull: false,
        },
        reason: {
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
        modelName: 'Appointment',
        tableName: 'appointments',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Appointment;