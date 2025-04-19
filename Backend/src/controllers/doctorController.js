const doctorService = require('../services/doctorServices');

const doctorController = {
    // Obtener todos los médicos
    getAllDoctors: async (req, res) => {
        try {
            const doctors = await doctorService.getAllDoctors();
            res.status(200).json({
                success: true,
                data: doctors
            });
        } catch (error) {
            console.error('Error en getAllDoctors controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los médicos',
                error: error.message
            });
        }
    },

    // Obtener un médico por ID
    getDoctorById: async (req, res) => {
        try {
            const { id } = req.params;
            const doctor = await doctorService.getDoctorById(id);
            res.status(200).json({
                success: true,
                data: doctor
            });
        } catch (error) {
            console.error('Error en getDoctorById controller:', error);
            
            // Si el error es "Médico no encontrado", devuelve 404
            if (error.message === 'Médico no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            
            res.status(500).json({
                success: false,
                message: 'Error al obtener el médico',
                error: error.message
            });
        }
    },

    // Crear un nuevo médico
    createDoctor: async (req, res) => {
        try {
            const doctorData = req.body;
            const newDoctor = await doctorService.createDoctor(doctorData);
            res.status(201).json({
                success: true,
                message: 'Médico creado con éxito',
                data: newDoctor
            });
        } catch (error) {
            console.error('Error en createDoctor controller:', error);
            
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
                message: 'Error al crear el médico',
                error: error.message
            });
        }
    },

    // Actualizar un médico
    updateDoctor: async (req, res) => {
        try {
            const { id } = req.params;
            const doctorData = req.body;
            const updatedDoctor = await doctorService.updateDoctor(id, doctorData);
            res.status(200).json({
                success: true,
                message: 'Médico actualizado con éxito',
                data: updatedDoctor
            });
        } catch (error) {
            console.error('Error en updateDoctor controller:', error);
            
            // Manejar diferentes tipos de errores
            if (error.message === 'Médico no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            } else if (error.message.includes('ya está registrado')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el médico',
                error: error.message
            });
        }
    },

    // Eliminar un médico
    deleteDoctor: async (req, res) => {
        try {
            const { id } = req.params;
            await doctorService.deleteDoctor(id);
            res.status(200).json({
                success: true,
                message: 'Médico eliminado con éxito'
            });
        } catch (error) {
            console.error('Error en deleteDoctor controller:', error);
            
            if (error.message === 'Médico no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el médico',
                error: error.message
            });
        }
    },

    // Obtener pacientes de un médico
    getDoctorPatients: async (req, res) => {
        try {
            const { id } = req.params;
            const patients = await doctorService.getDoctorPatients(id);
            res.status(200).json({
                success: true,
                data: patients
            });
        } catch (error) {
            console.error('Error en getDoctorPatients controller:', error);
            
            if (error.message === 'Médico no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            
            res.status(500).json({
                success: false,
                message: 'Error al obtener los pacientes del médico',
                error: error.message
            });
        }
    }
};

module.exports = doctorController;