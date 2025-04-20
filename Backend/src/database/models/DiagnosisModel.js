const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../dbConfig');

class Diagnosis extends Model {
    static associate(models) {
        Diagnosis.belongsTo(models.Appointment, { foreignKey: 'appointmentId' });
        Diagnosis.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
        Diagnosis.hasMany(models.Prescription, { foreignKey: 'diagnosisId' });
        Diagnosis.belongsToMany(models.Disease, {
            through: 'diagnostico_enfermedad',
            foreignKey: 'id_diagnostico',
            otherKey: 'id_enfermedad'
        });
        Diagnosis.belongsToMany(models.Test, {
            through: 'diagnostico_prueba',
            foreignKey: 'id_diagnostico',
            otherKey: 'id_prueba'
        });
        Diagnosis.belongsToMany(models.MedicalHistory, {
            through: 'historial_diagnostico',
            foreignKey: 'id_diagnostico',
            otherKey: 'id_historial'
        });
    }
}

Diagnosis.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_diagnostico'
        },
        appointmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_cita',
            references: {
                model: 'citas',
                key: 'id_cita'
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
            defaultValue: DataTypes.NOW
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'descripcion',
            validate: {
                notEmpty: {
                    msg: 'La descripción del diagnóstico no puede estar vacía'
                }
            }
        },
        treatment: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'tratamiento'
        }
    },
    {
        sequelize,
        modelName: 'Diagnosis',
        tableName: 'diagnosticos',
        timestamps: false
    }
);

module.exports = Diagnosis;