const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../dbConfig');

class Disease extends Model {
    static associate(models) {
        Disease.belongsToMany(models.Diagnosis, {
            through: 'diagnostico_enfermedad',
            foreignKey: 'id_enfermedad',
            otherKey: 'id_diagnostico'
        });
        Disease.belongsToMany(models.Medication, {
            through: 'enfermedad_medicamento',
            foreignKey: 'id_enfermedad',
            otherKey: 'id_medicamento'
        });
    }
}

Disease.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_enfermedad'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'nombre',
            validate: {
                notEmpty: {
                    msg: 'El nombre de la enfermedad no puede estar vacío'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'descripcion'
        },
        cieCode: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'codigo_cie'
        }
    },
    {
        sequelize,
        modelName: 'Disease',
        tableName: 'enfermedades',
        timestamps: false
    }
);

module.exports = Disease;