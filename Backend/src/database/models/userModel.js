const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');
const bcrypt = require('bcrypt');

class User extends Model {
    static associate(models) {
        User.hasOne(models.Doctor, { foreignKey: 'userId', as: 'doctor' });
        User.hasOne(models.Patient, { foreignKey: 'userId', as: 'patient' });
    }
    
    async validPassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
                    msg: 'El nombre de usuario solo puede contener letras y espacios',
                },
                len: {
                    args: [3, 50],
                    msg: 'El nombre de usuario debe tener entre 3 y 50 caracteres',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'El email no es válido',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,100}$/],
                    msg: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial (Ejemplo: Abcdef1!)."
                },
                len: {
                    args: [8, 100],
                    msg: "La contraseña debe tener entre 8 y 100 caracteres."
                },
            },
        },
        role: {
            type: DataTypes.ENUM('admin', 'doctor', 'patient'),
            defaultValue: 'patient',
            allowNull: false,
            validate: {
                isIn: {
                    args: [['admin', 'doctor', 'patient']],
                    msg: "El rol debe ser 'admin', 'doctor' o 'patient'.",
                },
            },
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
        tableName: 'users',
        timestamps: true,
        underscored: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
);

module.exports = User;