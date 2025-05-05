const patientService = require('./../services/patientservices');

const patientController = {
    // Obtener todos los pacientes
    getAllPatients: async (req, res) => {
        try {
            const patients = await patientService.getAllPatients();
            return res.status(200).json({
                success: true,
                data: patients
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Obtener un paciente por ID
    getPatientById: async (req, res) => {
        try {
            const { id } = req.params;
            const patient = await patientService.getPatientById(id);

            return res.status(200).json({
                success: true,
                data: patient
            });
        } catch (error) {
            if (error.message === 'Paciente no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Crear un nuevo paciente
    createPatient: async (req, res) => {
        try {
            const patientData = req.body;
            const newPatient = await patientService.createPatient(patientData);

            return res.status(201).json({
                success: true,
                message: 'Paciente creado correctamente',
                data: newPatient
            });
        } catch (error) {
            if (error.message === 'Faltan campos requeridos' ||
                error.message === 'El número de identificación ya está registrado') {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Actualizar un paciente
    updatePatient: async (req, res) => {
        try {
            const { id } = req.params;
            const patientData = req.body;

            const updatedPatient = await patientService.updatePatient(id, patientData);

            return res.status(200).json({
                success: true,
                message: 'Paciente actualizado correctamente',
                data: updatedPatient
            });
        } catch (error) {
            if (error.message === 'Paciente no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Eliminar un paciente
    deletePatient: async (req, res) => {
        try {
            const { id } = req.params;
            await patientService.deletePatient(id);

            return res.status(200).json({
                success: true,
                message: 'Paciente eliminado correctamente'
            });
        } catch (error) {
            if (error.message === 'Paciente no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = patientController;