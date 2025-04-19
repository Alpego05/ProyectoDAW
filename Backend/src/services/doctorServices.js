const Patient = require('../database/models/patientModel');
const { User } = require('../database/models/userModel');
const Doctor = require("./../database/models/doctorModel");

const { sequelize } = require('../database');
const userService = require('./userService');

const doctorService = {
    // Obtener todos los médicos con información de usuario
    getAllDoctors: async () => {
        try {
            return await Doctor.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'role', 'active']
                    }
                ]
            });
        } catch (error) {
            throw new Error(`Error al obtener médicos: ${error.message}`);
        }
    },

    // Obtener un médico por ID
    getDoctorById: async (id) => {
        try {
            const doctor = await Doctor.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'role', 'active']
                    },
                    {
                        model: Patient,
                        as: 'Patients',
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'username', 'email']
                            }
                        ]
                    }
                ]
            });

            if (!doctor) {
                throw new Error('Médico no encontrado');
            }

            return doctor;
        } catch (error) {
            throw new Error(`Error al obtener el médico: ${error.message}`);
        }
    },


    // Crear un nuevo médico (y su usuario asociado)
    createDoctor: async (doctorData) => {
        const transaction = await sequelize.transaction();

        try {
            const {
                username,
                email,
                password,
                specialty,
                licenseNumber,
                consultationFee,
                education,
                experience
            } = doctorData;

            // Validar campos requeridos
            if (!username || !email || !password || !specialty || !licenseNumber) {
                await transaction.rollback();
                throw new Error('Faltan campos requeridos');
            }

            // Verificar si el email ya está registrado
            const userExists = await userService.checkUserExists(email);

            if (userExists) {
                await transaction.rollback();
                throw new Error('El correo ya está registrado');
            }

            // Verificar si la licencia ya está registrada
            const licenseExists = await doctorService.checkLicenseExists(licenseNumber);

            if (licenseExists) {
                await transaction.rollback();
                throw new Error('El número de licencia ya está registrado');
            }

            // Crear usuario
            const newUser = await User.create({
                username,
                email,
                password,
                role: 'doctor'
            }, { transaction });

            // Crear médico
            const newDoctor = await Doctor.create({
                userId: newUser.id,
                specialty,
                licenseNumber,
                consultationFee: consultationFee || 0,
                education: education || '',
                experience: experience || 0
            }, { transaction });

            // Confirmar transacción
            await transaction.commit();

            // Obtener el médico con su información de usuario
            return await Doctor.findByPk(newDoctor.id, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'role', 'active']
                    }
                ]
            });
        } catch (error) {
            // Revertir transacción en caso de error
            await transaction.rollback();
            throw new Error(`Error al crear el médico: ${error.message}`);
        }
    },

    // Actualizar información de un médico
    updateDoctor: async (id, doctorData) => {
        const transaction = await sequelize.transaction();

        try {
            const {
                username,
                email,
                specialty,
                licenseNumber,
                consultationFee,
                education,
                experience,
                active
            } = doctorData;

            // Buscar el médico
            const doctor = await Doctor.findByPk(id, {
                include: [{ model: User }],
                transaction
            });

            if (!doctor) {
                await transaction.rollback();
                throw new Error('Médico no encontrado');
            }

            // Actualizar información del médico
            if (specialty) doctor.specialty = specialty;
            if (licenseNumber && licenseNumber !== doctor.licenseNumber) {
                // Verificar si la licencia ya está registrada por otro médico
                const existingLicense = await Doctor.findOne({
                    where: { licenseNumber },
                    transaction
                });

                if (existingLicense && existingLicense.id !== id) {
                    await transaction.rollback();
                    throw new Error('El número de licencia ya está registrado');
                }

                doctor.licenseNumber = licenseNumber;
            }
            if (consultationFee !== undefined) doctor.consultationFee = consultationFee;
            if (education !== undefined) doctor.education = education;
            if (experience !== undefined) doctor.experience = experience;

            await doctor.save({ transaction });

            // Actualizar información del usuario asociado
            const user = doctor.User;
            if (username) user.username = username;
            if (email && email !== user.email) {
                // Verificar si el email ya está registrado por otro usuario
                const existingUser = await User.findOne({
                    where: { email },
                    transaction
                });

                if (existingUser && existingUser.id !== user.id) {
                    await transaction.rollback();
                    throw new Error('El correo ya está registrado');
                }

                user.email = email;
            }
            if (active !== undefined) user.active = active;

            await user.save({ transaction });

            // Confirmar transacción
            await transaction.commit();

            // Obtener el médico actualizado con su información de usuario
            return await Doctor.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'role', 'active']
                    }
                ]
            });
        } catch (error) {
            // Revertir transacción en caso de error
            await transaction.rollback();
            throw new Error(`Error al actualizar el médico: ${error.message}`);
        }
    },

    // Eliminar un médico y su usuario asociado
    deleteDoctor: async (id) => {
        const transaction = await sequelize.transaction();

        try {
            // Buscar el médico
            const doctor = await Doctor.findByPk(id, { transaction });

            if (!doctor) {
                await transaction.rollback();
                throw new Error('Médico no encontrado');
            }

            // Obtener el ID del usuario
            const userId = doctor.userId;

            // Eliminar el médico
            await doctor.destroy({ transaction });

            // Eliminar el usuario asociado
            await User.destroy({
                where: { id: userId },
                transaction
            });

            // Confirmar transacción
            await transaction.commit();

            return true;
        } catch (error) {
            // Revertir transacción en caso de error
            await transaction.rollback();
            throw new Error(`Error al eliminar el médico: ${error.message}`);
        }
    },

    // Obtener pacientes de un médico
    getDoctorPatients: async (doctorId) => {
        try {
            const doctor = await Doctor.findByPk(doctorId);

            if (!doctor) {
                throw new Error('Médico no encontrado');
            }

            return await Patient.findAll({
                where: { doctorId },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'active']
                    }
                ]
            });
        } catch (error) {
            throw new Error(`Error al obtener los pacientes del médico: ${error.message}`);
        }
    }
};

module.exports = doctorService