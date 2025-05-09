const recetaService = require('../services/recetaServices');

// Obtener todas las recetas
const getAllRecetas = async (req, res) => {
    try {
        const recetas = await recetaService.getAllRecetas();
        return res.status(200).json({
            data: recetas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener receta por ID
const getRecetaById = async (req, res) => {
    try {
        const { id } = req.params;
        const receta = await recetaService.getRecetaById(id);

        return res.status(200).json({
            data: receta
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Crear una nueva receta
const createReceta = async (req, res) => {
    try {
        const newReceta = await recetaService.createReceta(req.body);
        return res.status(201).json({
            message: 'Receta creada exitosamente',
            data: newReceta
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar una receta
const updateReceta = async (req, res) => {
    try {
        const updatedReceta = await recetaService.updateReceta(req.params.id, req.body);
        if (updatedReceta) {
            return res.status(200).json({
                message: 'Receta actualizada exitosamente',
                data: updatedReceta
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Receta no encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar una receta
const deleteReceta = async (req, res) => {
    try {
        const deleted = await recetaService.deleteReceta(req.params.id);
        if (deleted) {
            return res.status(204).json({ message: 'Receta eliminada' });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Receta no encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener recetas por ID de paciente
const getRecetasByPacienteId = async (req, res) => {
    try {
        const { id_paciente } = req.params;
        const recetas = await recetaService.getRecetasByPacienteId(id_paciente);
        
        return res.status(200).json({
            data: recetas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener recetas por ID de diagnóstico
const getRecetasByDiagnosticoId = async (req, res) => {
    try {
        const { id_diagnostico } = req.params;
        const recetas = await recetaService.getRecetasByDiagnosticoId(id_diagnostico);
        
        return res.status(200).json({
            data: recetas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllRecetas,
    getRecetaById,
    createReceta,
    updateReceta,
    deleteReceta,
    getRecetasByPacienteId,
    getRecetasByDiagnosticoId
};