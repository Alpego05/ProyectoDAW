const enfermedadService = require('../services/enfermedadServices');

// Obtener todas las enfermedades
const getAllEnfermedades = async (req, res) => {
    try {
        const enfermedades = await enfermedadService.getAllEnfermedades();
        return res.status(200).json({
            data: enfermedades
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener enfermedad por ID
const getEnfermedadById = async (req, res) => {
    try {
        const { id } = req.params;
        const enfermedad = await enfermedadService.getEnfermedadById(id);

        return res.status(200).json({
            data: enfermedad
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Crear una nueva enfermedad
const createEnfermedad = async (req, res) => {
    try {
        const newEnfermedad = await enfermedadService.createEnfermedad(req.body);
        return res.status(201).json({
            message: 'Enfermedad creada exitosamente',
            data: newEnfermedad
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar una enfermedad
const updateEnfermedad = async (req, res) => {
    try {
        const updatedEnfermedad = await enfermedadService.updateEnfermedad(req.params.id, req.body);
        if (updatedEnfermedad) {
            return res.status(200).json({
                message: 'Enfermedad actualizada exitosamente',
                data: updatedEnfermedad
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Enfermedad no encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar una enfermedad
const deleteEnfermedad = async (req, res) => {
    try {
        const deleted = await enfermedadService.deleteEnfermedad(req.params.id);
        if (deleted) {
            return res.status(204).json({ message: 'Enfermedad eliminada' });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Enfermedad no encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllEnfermedades,
    getEnfermedadById,
    createEnfermedad,
    updateEnfermedad,
    deleteEnfermedad
};
