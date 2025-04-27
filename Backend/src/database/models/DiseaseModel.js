const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Disease extends Model {
    static associate(models) {
        Disease.belongsToMany(models.Diagnosis, {
            through: 'diagnostico_enfermedad',
            foreignKey: 'id_enfermedad',
            otherKey: 'id_diagnostico',
            as: 'diagnoses'
        });
        Disease.belongsToMany(models.Medication, {
            through: 'enfermedad_medicamento',
            foreignKey: 'id_enfermedad',
            otherKey: 'id_medicamento',
            as: 'medications'
        });
    }
}

Disease.init(
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
        symptoms: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        treatmentInfo: {
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
        modelName: 'Disease',
        tableName: 'diseases',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Disease;