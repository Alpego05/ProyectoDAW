const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Schedule extends Model {
    static associate(models) {
        Schedule.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
        Schedule.belongsToMany(models.Appointment, {
            through: 'agenda_cita',
            foreignKey: 'id_agenda',
            otherKey: 'id_cita',
            as: 'appointments'
        });
    }
}

Schedule.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        doctorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'doctors',
                key: 'id'
            }
        },
        day: {
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
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
        modelName: 'Schedule',
        tableName: 'schedules',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Schedule;