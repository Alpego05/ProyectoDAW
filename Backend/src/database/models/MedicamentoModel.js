const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Medicamento extends Model {
    static associate(models) {
        Medicamento.hasMany(models.Receta, { foreignKey: 'id_medicamento', as: 'recetas' });
        Medicamento.belongsToMany(models.Enfermedad, {
            through: 'enfermedades_medicamentos',
            foreignKey: 'id_medicamento',
            otherKey: 'id_enfermedad',
            as: 'enfermedades'
        });
    }
}

Medicamento.init(
    {
        id_medicamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        efectos_secundarios: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        forma_via: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Forma farmacéutica y vía de administración'
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
        modelName: 'Medicamento',
        tableName: 'medicamentos',
        timestamps: true,
        underscored: true
    }
);

module.exports = Medicamento;
