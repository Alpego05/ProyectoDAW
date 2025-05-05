const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Receta extends Model {
    static associate(models) {
        Receta.belongsTo(models.Diagnostico, { foreignKey: 'id_diagnostico', as: 'diagnostico' });
        Receta.belongsTo(models.Patient, { foreignKey: 'id_paciente', as: 'paciente' });
        Receta.belongsTo(models.Medicamento, { foreignKey: 'id_medicamento', as: 'medicamento' });
        Receta.belongsTo(models.Enfermedad, { foreignKey: 'id_enfermedad', as: 'enfermedad' });
    }
}

Receta.init(
    {
        id_receta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_diagnostico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'diagnosticos',
                key: 'id_diagnostico'
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
        id_medicamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'medicamentos',
                key: 'id_medicamento'
            }
        },
        id_enfermedad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'enfermedades',
                key: 'id_enfermedad'
            }
        },
        dosis: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duracion: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Duración del tratamiento (ej. 5 días)'
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
        modelName: 'Receta',
        tableName: 'recetas',
        timestamps: true,
        underscored: true
    }
);

module.exports = Receta;
