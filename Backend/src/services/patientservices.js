const Patient = require("./../database/models/PatientModel");
const User = require("./../database/models/UserModel")

const patientService = {
    // Obtener todos los pacientes
    getAllPatients: async () => {
        try {
            const patients = await Patient.findAll({
                include: [
                    { model: User }
                ]
            });
            return patients;
        } catch (error) {
            throw new Error(`Error al obtener pacientes: ${error.message}`);
        }
    },

    // Obtener un paciente por ID
    getPatientById: async (id) => {
        try {
            const patient = await Patient.findByPk(id, {
                include: [
                    { model: User }
                ]
            });

            if (!patient) {
                throw new Error('Paciente no encontrado');
            }

            return patient;
        } catch (error) {
            throw error;
        }
    },

    // Crear un nuevo paciente
    createPatient: async (patientData) => {
        try {
            // Verificar campos requeridos
            if (!patientData.userId || !patientData.birthDate || !patientData.identificationNumber) {
                throw new Error('Faltan campos requeridos');
            }

            // Verificar si ya existe un paciente 
            const existingPatient = await Patient.findOne({
                where: { identificationNumber: patientData.identificationNumber }
            });

            if (existingPatient) {
                throw new Error('El número de identificación ya está registrado');
            }

            // Crear el paciente
            const newPatient = await Patient.create(patientData);
            return await Patient.findByPk(newPatient.id, {
                include: [
                    { model: User }
                ]
            });
        } catch (error) {
            throw error;
        }
    },

    // Actualizar un paciente
    updatePatient: async (id, patientData) => {
        try {
            const patient = await Patient.findByPk(id);

            if (!patient) {
                throw new Error('Paciente no encontrado');
            }

            // Verificar si ya existe otro paciente
            if (patientData.identificationNumber) {
                const existingPatient = await Patient.findOne({
                    where: { identificationNumber: patientData.identificationNumber }
                });

                if (existingPatient && existingPatient.id !== id) {
                    throw new Error('El número de identificación ya está registrado');
                }
            }

            // Actualizar el paciente
            await patient.update(patientData);

            return await Patient.findByPk(id, {
                include: [
                    { model: User }
                ]
            });
        } catch (error) {
            throw error;
        }
    },

    // Eliminar un paciente
    deletePatient: async (id) => {
        try {
            const patient = await Patient.findByPk(id);

            if (!patient) {
                throw new Error('Paciente no encontrado');
            }

            await patient.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = patientService;