const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Doctor extends Model {
    static associate(models) {
        Doctor.belongsTo(models.User, { foreignKey: 'userId' });
        Doctor.hasMany(models.Appointment, { foreignKey: 'doctorId' });
        Doctor.hasMany(models.Schedule, { foreignKey: 'doctorId' });
        Doctor.hasMany(models.Diagnosis, { foreignKey: 'doctorId' });
    }
}

Doctor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_medico'
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'id_usuario',
            references: {
                model: 'users',
                key: 'id'
            }
        },
        specialty: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'especialidad',
            validate: {
                notEmpty: {
                    msg: 'La especialidad no puede estar vacía'
                }
            }
        },
        licenseNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            field: 'numero_colegiado',
            validate: {
                notEmpty: {
                    msg: 'El número de colegiado no puede estar vacío'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Doctor',
        tableName: 'medicos',
        timestamps: false
    }
);

module.exports = Doctor;