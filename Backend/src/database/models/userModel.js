const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConfig");
const bcrypt = require("bcrypt");

class User extends Model {
    async validPassword(password) {
        return await bcrypt.compare(password, this.clave);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        dni: {
            type: DataTypes.STRING(8),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: {
                    args: [8, 8],
                    msg: "El DNI debe tener 8 dígitos",
                },
            },
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
                    msg: "El nombre solo puede contener letras y espacios",
                },
                notEmpty: true,
            },
        },
        apellido1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
                    msg: "El apellido solo puede contener letras y espacios",
                },
                notEmpty: true,
            },
        },
        apellido2: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/],
                    msg: "El segundo apellido solo puede contener letras y espacios",
                },
            },
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 100],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "El email no es válido",
                },
                notEmpty: true,
            },
        },
        tipo_usuario: {
            type: DataTypes.ENUM("paciente", "doctor", "admin"),
            allowNull: false,
            validate: {
                isIn: {
                    args: [["paciente", "doctor", "admin"]],
                    msg: "El rol debe ser 'admin', 'doctor' o 'paciente'",
                },
            },
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "usuarios",
        timestamps: true,
        underscored: true,
        // hooks: {
        //     beforeCreate: async (user) => {
        //         if (user.clave) {
        //             const salt = await bcrypt.genSalt(10);
        //             user.clave = await bcrypt.hash(user.clave, salt);
        //         }
        //     },
        //     beforeUpdate: async (user) => {
        //         if (user.changed("clave")) {
        //             const salt = await bcrypt.genSalt(10);
        //             user.clave = await bcrypt.hash(user.clave, salt);
        //         }
        //     },
        // },
    }
);

module.exports = User;
