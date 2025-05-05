const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Enfermedad extends Model {
    static associate(models) {
        Enfermedad.hasMany(models.Receta, { foreignKey: 'id_enfermedad', as: 'recetas' });
        Enfermedad.belongsToMany(models.Medicamento, {
            through: 'enfermedades_medicamentos',
            foreignKey: 'id_enfermedad',
            otherKey: 'id_medicamento',
            as: 'medicamentos'
        });
    }
}

Enfermedad.init(
    {
        id_enfermedad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sintomas: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        codigo_cie: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
        modelName: 'Enfermedad',
        tableName: 'enfermedades',
        timestamps: true,
        underscored: true
    }
);

module.exports = Enfermedad;
