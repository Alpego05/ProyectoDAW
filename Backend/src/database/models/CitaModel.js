const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Cita extends Model {
    static associate(models) {
        Cita.belongsTo(models.Doctor, { foreignKey: 'id_doctor', as: 'doctor' });
        Cita.belongsTo(models.Patient, { foreignKey: 'id_paciente', as: 'paciente' });
        Cita.hasOne(models.Diagnostico, { foreignKey: 'id_cita', as: 'diagnostico' });
    }
}

Cita.init(
    {
        id_cita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_doctor: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'doctores',
                key: 'id_doctor'
            }
        },
        id_paciente: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'pacientes',
                key: 'id_paciente'
            }
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        hora_inicio: {
            type: DataTypes.TIME,
            allowNull: false
        },
        hora_fin: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                isAfterStartTime(value) {
                    if (this.hora_inicio >= value) {
                        throw new Error('La hora de fin debe ser posterior a la hora de inicio');
                    }
                }
            }
        },
        estado: {
            type: DataTypes.ENUM('Pendiente', 'Completada', 'No asistida'),
            allowNull: false,
            defaultValue: 'Pendiente',
            validate: {
                isIn: {
                    args: [['Pendiente', 'Completada', 'No asistida']],
                    msg: "El estado debe ser 'Pendiente', 'Completada' o 'No asistida'"
                }
            }
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
        modelName: 'Cita',
        tableName: 'citas',
        timestamps: true,
        underscored: true
    }
);

module.exports = Cita;
