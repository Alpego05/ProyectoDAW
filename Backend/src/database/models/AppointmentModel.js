const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../dbConfig');

class Appointment extends Model {
    static associate(models) {
        Appointment.belongsTo(models.Patient, { foreignKey: 'patientId' });
        Appointment.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
        Appointment.hasOne(models.Diagnosis, { foreignKey: 'appointmentId' });
        Appointment.belongsToMany(models.Schedule, {
            through: 'agenda_cita',
            foreignKey: 'id_cita',
            otherKey: 'id_agenda'
        });
    }
}

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_cita'
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_paciente',
            references: {
                model: 'pacientes',
                key: 'id_paciente'
            }
        },
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_medico',
            references: {
                model: 'medicos',
                key: 'id_medico'
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fecha',
            validate: {
                isDate: {
                    msg: 'La fecha debe ser válida'
                }
            }
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'motivo'
        },
        status: {
            type: DataTypes.ENUM('Programada', 'Completada', 'Cancelada'),
            defaultValue: 'Programada',
            field: 'estado',
            validate: {
                isIn: {
                    args: [['Programada', 'Completada', 'Cancelada']],
                    msg: "El estado debe ser 'Programada', 'Completada' o 'Cancelada'"
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Appointment',
        tableName: 'citas',
        timestamps: false
    }
);

module.exports = Appointment;