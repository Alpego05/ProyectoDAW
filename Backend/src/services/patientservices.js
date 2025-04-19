const Patient = require('../database/models/patientModel');

const patientService = {
    // Obtener todos los pacientes con información de usuario
    getAllPatients: async () => {
        try {
            return await Patient.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'role', 'active']
                    },
                    {
                        model: Doctor,
                        as: 'primaryDoctor',
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'username', 'email']
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new Error(`Error al obtener pacientes: ${error.message}`);
        }
    },

    // Obtener un paciente por ID
    getPatientById: async (id) => {
        try {
            const patient = await Patient.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'role', 'active']
                    },
                    {
                        model: Doctor,
                        as: 'primaryDoctor',
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'username', 'email']
                            }
                        ]
                    }
                ]
            });

            if (!patient) {
                throw new Error('Paciente no encontrado');
            }

            return patient;
        } catch (error) {
            throw new Error(`Error al obtener el paciente: ${error.message}`);
        }
    },


    // Crear un nuevo paciente (y su usuario asociado)
    createPatient: async (patientData) => {
        const transaction = await sequelize.transaction();

        try {
            const {
                username,
                email,
                password,
                doctorId,
                dateOfBirth,
                bloodType,
                allergies,
                medicalHistory,
                emergencyContact,
                insuranceInfo
            } = patientData;

            // Validar campos requeridos
            if (!username || !email || !password || !dateOfBirth) {
                await transaction.rollback();
                throw new Error('Faltan campos requeridos');
            }

            // Verificar si el email ya está registrado
            const userExists = await userService.checkUserExists(email);

            if (userExists) {
                await transaction.rollback();
                throw new Error('El correo ya está registrado');
            }

            // Verificar si el doctor existe (si se proporciona)
            if (doctorId) {
                const doctorExists = await patientService.checkDoctorExists(doctorId);
                if (!doctorExists) {
                    await transaction.rollback();
                    throw new Error('El médico asignado no existe');
                }
            }

            // Crear usuario
            const newUser = await User.create({
                username,
                email,
                password,
                role: 'patient'
            }, { transaction });

            // Crear paciente
            const newPatient = await Patient.create({
                userId: newUser.id,
                doctorId: doctorId || null,
                dateOfBirth,
                bloodType: bloodType || null,
                allergies: allergies || null,
                medicalHistory: medicalHistory || null,
                emergencyContact: emergencyContact || null,
                insuranceInfo: insuranceInfo || null
            }, { transaction });

            // Confirmar transacción
            await transaction.commit();

            // Obtener el paciente con su información de usuario
            return await Patient.findByPk(newPatient.id, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'role', 'active']
                    },
                    {
                        model: Doctor,
                        as: 'primaryDoctor',
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'username', 'email']
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            // Revertir transacción en caso de error
            await transaction.rollback();
            throw new Error(`Error al crear el paciente: ${error.message}`);
        }
    },

    // Actualizar información de un paciente
    updatePatient: async (id, patientData) => {
        const transaction = await sequelize.transaction();

        try {
            const {
                username,
                email,
                doctorId,
                dateOfBirth,
                bloodType,
                allergies,
                medicalHistory,
                emergencyContact,
                insuranceInfo,
                active
            } = patientData;

            // Buscar el paciente
            const patient = await Patient.findByPk(id, {
                include: [{ model: User }],
                transaction
            });

            if (!patient) {
                await transaction.rollback();
                throw new Error('Paciente no encontrado');
            }

            // Verificar si el doctor existe (si se proporciona)
            if (doctorId !== undefined) {
                const doctorExists = await patientService.checkDoctorExists(doctorId);
                if (!doctorExists) {
                    await transaction.rollback();
                    throw new Error('El médico asignado no existe');
                }
                patient.doctorId = doctorId;
            }

            // Actualizar información del paciente
            if (dateOfBirth) patient.dateOfBirth = dateOfBirth;
            if (bloodType !== undefined) patient.bloodType = bloodType;
            if (allergies !== undefined) patient.allergies = allergies;
            if (medicalHistory !== undefined) patient.medicalHistory = medicalHistory;
            if (emergencyContact !== undefined) patient.emergencyContact = emergencyContact;
            if (insuranceInfo !== undefined) patient.insuranceInfo = insuranceInfo;

            await patient.save({ transaction });

            // Actualizar información del usuario asociado
            const user = patient.User;
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

            // Obtener el paciente actualizado con su información de usuario
            return await Patient.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'role', 'active']
                    },
                    {
                        model: Doctor,
                        as: 'primaryDoctor',
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'username', 'email']
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            // Revertir transacción en caso de error
            await transaction.rollback();
            throw new Error(`Error al actualizar el paciente: ${error.message}`);
        }
    },

    // Eliminar un paciente y su usuario asociado
    deletePatient: async (id) => {
        const transaction = await sequelize.transaction();

        try {
            // Buscar el paciente
            const patient = await Patient.findByPk(id, { transaction });

            if (!patient) {
                await transaction.rollback();
                throw new Error('Paciente no encontrado');
            }

            // Obtener el ID del usuario
            const userId = patient.userId;

            // Eliminar el paciente
            await patient.destroy({ transaction });

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
            throw new Error(`Error al eliminar el paciente: ${error.message}`);
        }
    },

    // Asignar un médico a un paciente
    // assignDoctor: async (patientId, doctorId) => {
    //     try {
    //         // Verificar si el paciente existe
    //         const patient = await Patient.findByPk(patientId);

    //         if (!patient) {
    //             throw new Error('Paciente no encontrado');
    //         }

    //         // Verificar si el doctor existe
    //         const doctorExists = await patientService.checkDoctorExists(doctorId);

    //         if (!doctorExists) {
    //             throw new Error('El médico asignado no existe');
    //         }

    //         // Asignar el médico al paciente
    //         patient.doctorId = doctorId;
    //         await patient.save();

    //         // Obtener el paciente actualizado con su información de usuario y médico
    //         return await Patient.findByPk(patientId, {
    //             include: [
    //                 {
    //                     model: User,
    //                     attributes: ['id', 'username', 'email', 'role', 'active']
    //                 },
    //                 {
    //                     model: Doctor,
    //                     as: 'primaryDoctor',
    //                     include: [
    //                         {
    //                             model: User,
    //                             attributes: ['id', 'username', 'email']
    //                         }
    //                     ]
    //                 }
    //             ]
    //         });
    //     } catch (error) {
    //         throw new Error(`Error al asignar médico al paciente: ${error.message}`);
    //     }
    // }
};

module.exports = patientService;