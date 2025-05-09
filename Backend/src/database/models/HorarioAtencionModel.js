const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class HorarioAtencion extends Model {}

HorarioAtencion.init(
    {
        id_horario: {
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
        dia: {
            type: DataTypes.ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']],
                    msg: "El día debe ser uno de los días de la semana"
                }
            }
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

        



    },
    {
        sequelize,
        modelName: 'HorarioAtencion',
        tableName: 'horarios_atencion',
        timestamps: true,
        underscored: true
    }
);

module.exports = HorarioAtencion;
