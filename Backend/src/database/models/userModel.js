const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');
const bcrypt = require('bcrypt');

class User extends Model {
    static associate(models) {
        User.hasOne(models.Doctor, { foreignKey: 'id_doctor', sourceKey: 'dni', as: 'doctor' });
        User.hasOne(models.Patient, { foreignKey: 'id_paciente', sourceKey: 'dni', as: 'patient' });
    }

    async validPassword(password) {
        return await bcrypt.compare(password, this.clave);
    }
}

User.init(
    {
        dni: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isNumeric: true,
                len: {
                    args: [8, 8],
                    msg: "El DNI debe tener 8 dígitos"
                }
            }
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
                    msg: 'El nombre solo puede contener letras y espacios',
                },
                notEmpty: true
            }
        },
        apellido1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
                    msg: 'El apellido solo puede contener letras y espacios',
                },
                notEmpty: true
            }
        },
        apellido2: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/],
                    msg: 'El segundo apellido solo puede contener letras y espacios',
                }
            }
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 100]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'El email no es válido',
                },
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.ENUM('admin', 'doctor', 'paciente'),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['admin', 'doctor', 'paciente']],
                    msg: "El rol debe ser 'admin', 'doctor' o 'paciente'",
                }
            }
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
        modelName: 'User',
        tableName: 'usuarios',
        timestamps: true,
        underscored: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.clave) {
                    const salt = await bcrypt.genSalt(10);
                    user.clave = await bcrypt.hash(user.clave, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('clave')) {
                    const salt = await bcrypt.genSalt(10);
                    user.clave = await bcrypt.hash(user.clave, salt);
                }
            }
        }
    }
);

module.exports = User;
