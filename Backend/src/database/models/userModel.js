const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');
const bcrypt = require('bcrypt');

class User extends Model {
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
            },
            
            beforeDestroy: async (user, options) => {
                const deleteAssociatedDoctor = async (user, transaction) => {
                    try {
                        const doctor = await Doctor.findOne({ 
                            where: { id_doctor: user.id },
                            transaction 
                        });
                        
                        if (doctor) {
                            console.log(`Eliminando doctor con id_doctor: ${doctor.id_doctor}`);
                            await doctor.destroy({ transaction });
                        }
                    } catch (error) {
                        console.error('Error al eliminar doctor asociado:', error);
                        throw error;
                    }
                };
                
                const deleteAssociatedPatient = async (user, transaction) => {
                    try {
                        const patient = await Patient.findOne({ 
                            where: { id_paciente: user.id },
                            transaction 
                        });
                        
                        if (patient) {
                            console.log(`Eliminando paciente con id_paciente: ${patient.id_paciente}`);
                            await patient.destroy({ transaction });
                        }
                    } catch (error) {
                        console.error('Error al eliminar paciente asociado:', error);
                        throw error;
                    }
                };
                
                const transaction = options.transaction;
                await deleteAssociatedDoctor(user, transaction);
                await deleteAssociatedPatient(user, transaction);
            }
        }
    });


module.exports = User;
