const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Patient extends Model {
    static associate(models) {
        Patient.belongsTo(models.User, { foreignKey: 'id_paciente', targetKey: 'dni', as: 'usuario' });
        Patient.hasMany(models.Cita, { foreignKey: 'id_paciente', as: 'citas' });
        Patient.hasMany(models.Diagnostico, { foreignKey: 'id_paciente', as: 'diagnosticos' });
        Patient.hasMany(models.Receta, { foreignKey: 'id_paciente', as: 'recetas' });
    }
}

Patient.init(
    {
        id_paciente: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'dni'
            }
        },
        genero: {
            type: DataTypes.ENUM('masculino', 'femenino', 'otro'),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[0-9+\-\s]+$/],
                    msg: 'El teléfono debe contener sólo números, espacios y caracteres +/-'
                }
            }
        },
        tipo_sangre: {
            type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
            allowNull: true
        },
        alergias: {
            type: DataTypes.TEXT,
            allowNull: true
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
        modelName: 'Patient',
        tableName: 'pacientes',
        timestamps: true,
        underscored: true
    }
);

module.exports = Patient;
