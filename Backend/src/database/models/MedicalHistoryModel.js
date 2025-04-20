const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../dbConfig');

class MedicalHistory extends Model {
    static associate(models) {
        MedicalHistory.belongsTo(models.Patient, { foreignKey: 'patientId' });
        MedicalHistory.belongsToMany(models.Diagnosis, {
            through: 'historial_diagnostico',
            foreignKey: 'id_historial',
            otherKey: 'id_diagnostico'
        });
    }
}

MedicalHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_historial'
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
        creationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'fecha_creacion',
            defaultValue: DataTypes.NOW
        },
        background: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'antecedentes'
        },
        allergies: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'alergias'
        }
    },
    {
        sequelize,
        modelName: 'MedicalHistory',
        tableName: 'historiales',
        timestamps: false
    }
);

module.exports = MedicalHistory;