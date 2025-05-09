const patientService = require('../services/patientservices');

// Obtener todos los pacientes
const getAllPatients = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        return res.status(200).json({
            data: patients
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener un paciente por ID
const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await patientService.getPatientById(id);

        return res.status(200).json({
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
};

// Crear un nuevo paciente
/* const createPatient = async (req, res) => {
    try {
        const patientData = {
            id_paciente: req.body.id_paciente,
            genero: req.body.genero,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            tipo_sangre: req.body.tipo_sangre,
            alergias: req.body.alergias
        };

        const createdPatient = await patientService.createPatient(patientData);

        res.status(201).json({
            success: true,
            message: 'Paciente creado exitosamente',
            data: createdPatient
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Error al crear el paciente'
        });
    }
}; */

// Actualizar un paciente
const updatePatient = async (req, res) => {
    try {
        const updatedPatient = await patientService.updatePatient(
            req.params.id,
            req.body
        );
        
        res.status(200).json({
            message: 'Paciente actualizado exitosamente',
            data: updatedPatient
        });
    } catch (error) {
        if (error.message === 'Paciente no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar un paciente
const deletePatient = async (req, res) => {
    try {
        const deleted = await patientService.deletePatient(req.params.id);
        
        if (deleted) {
            res.status(204).json({
                message: 'Paciente eliminado exitosamente'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Paciente no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
};