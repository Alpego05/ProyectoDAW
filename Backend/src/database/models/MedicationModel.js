const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../dbConfig');

class Medication extends Model {
    static associate(models) {
        Medication.hasMany(models.Prescription, { foreignKey: 'medicationId' });
        Medication.belongsToMany(models.Disease, {
            through: 'enfermedad_medicamento',
            foreignKey: 'id_medicamento',
            otherKey: 'id_enfermedad'
        });
    }
}

Medication.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_medicamento'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'nombre',
            validate: {
                notEmpty: {
                    msg: 'El nombre del medicamento no puede estar vacío'
                }
            }
        },
        activeIngredient: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'principio_activo',
            validate: {
                notEmpty: {
                    msg: 'El principio activo no puede estar vacío'
                }
            }
        },
        concentration: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'concentracion'
        },
        presentation: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'presentacion'
        },
        administrationRoute: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'via_administracion'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'descripcion'
        },
        requiresPrescription: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'requiere_receta'
        }
    },
    {
        sequelize,
        modelName: 'Medication',
        tableName: 'medicamentos',
        timestamps: false
    }
);

module.exports = Medication;