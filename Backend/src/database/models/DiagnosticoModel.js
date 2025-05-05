const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Diagnostico extends Model {
    static associate(models) {
        Diagnostico.belongsTo(models.Cita, { foreignKey: 'id_cita', as: 'cita' });
        Diagnostico.belongsTo(models.Patient, { foreignKey: 'id_paciente', as: 'paciente' });
        Diagnostico.hasOne(models.Receta, { foreignKey: 'id_diagnostico', as: 'receta' });
    }
}

Diagnostico.init(
    {
        id_diagnostico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cita: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'citas',
                key: 'id_cita'
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
        id_receta: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'recetas',
                key: 'id_receta'
            }
        },
        sintomas: {
            type: DataTypes.TEXT,
            allowNull: false
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
        modelName: 'Diagnostico',
        tableName: 'diagnosticos',
        timestamps: true,
        underscored: true
    }
);

module.exports = Diagnostico;
