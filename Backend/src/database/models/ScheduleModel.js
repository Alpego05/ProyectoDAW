const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../dbConfig');

class Schedule extends Model {
    static associate(models) {
        Schedule.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
        Schedule.belongsToMany(models.Appointment, {
            through: 'agenda_cita',
            foreignKey: 'id_agenda',
            otherKey: 'id_cita'
        });
    }
}

Schedule.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_agenda'
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
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'fecha',
            validate: {
                isDate: {
                    msg: 'La fecha debe ser válida'
                }
            }
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
            field: 'hora_inicio'
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
            field: 'hora_fin'
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'disponible'
        }
    },
    {
        sequelize,
        modelName: 'Schedule',
        tableName: 'agendas',
        timestamps: false
    }
);

module.exports = Schedule;