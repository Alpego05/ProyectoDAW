const patientService = require('../services/patientservices');

const patientController = {
    // Obtener todos los pacientes
    getAllPatients: async (req, res) => {
        try {
            const patients = await patientService.getAllPatients();
            res.status(200).json({
                success: true,
                data: patients
            });
        } catch (error) {
            console.error('Error en getAllPatients controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los pacientes',
                error: error.message
            });
        }
    },

    // Obtener un paciente por ID
    getPatientById: async (req, res) => {
        try {
            const { id } = req.params;
            const patient = await patientService.getPatientById(id);
            res.status(200).json({
                success: true,
                data: patient
            });
        } catch (error) {
            console.error('Error en getPatientById controller:', error);

            // Si el error es "Paciente no encontrado", devuelve 404
            if (error.message === 'Paciente no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al obtener el paciente',
                error: error.message
            });
        }
    },

    // Crear un nuevo paciente
    createPatient: async (req, res) => {
        try {
            const patientData = req.body;
            const newPatient = await patientService.createPatient(patientData);
            res.status(201).json({
                success: true,
                message: 'Paciente creado con éxito',
                data: newPatient
            });
        } catch (error) {
            console.error('Error en createPatient controller:', error);

            // Si el error es por datos duplicados o faltantes, devuelve 400
            if (error.message.includes('Faltan campos requeridos') ||
                error.message.includes('ya está registrado')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al crear el paciente',
                error: error.message
            });
        }
    },

    // Actualizar un paciente
    updatePatient: async (req, res) => {
        try {
            const { id } = req.params;
            const patientData = req.body;
            const updatedPatient = await patientService.updatePatient(id, patientData);
            res.status(200).json({
                success: true,
                message: 'Paciente actualizado con éxito',
                data: updatedPatient
            });
        } catch (error) {
            console.error('Error en updatePatient controller:', error);

            // Manejar diferentes tipos de errores
            if (error.message === 'Paciente no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            } else if (error.message.includes('ya está registrado') ||
                error.message.includes('El médico asignado no existe')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al actualizar el paciente',
                error: error.message
            });
        }
    },

    // Eliminar un paciente
    deletePatient: async (req, res) => {
        try {
            const { id } = req.params;
            await patientService.deletePatient(id);
            res.status(200).json({
                success: true,
                message: 'Paciente eliminado con éxito'
            });
        } catch (error) {
            console.error('Error en deletePatient controller:', error);

            if (error.message === 'Paciente no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al eliminar el paciente',
                error: error.message
            });
        }
    }
};

module.exports = patientController;