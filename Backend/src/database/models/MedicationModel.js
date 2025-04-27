const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Medication extends Model {
    static associate(models) {
        Medication.belongsToMany(models.Disease, {
            through: 'enfermedad_medicamento',
            foreignKey: 'id_medicamento',
            otherKey: 'id_enfermedad',
            as: 'diseases'
        });
        Medication.hasMany(models.Prescription, { foreignKey: 'medicationId', as: 'prescriptions' });
    }
}

Medication.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dosageForm: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activeIngredient: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contraindications: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sideEffects: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        modelName: 'Medication',
        tableName: 'medications',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Medication;