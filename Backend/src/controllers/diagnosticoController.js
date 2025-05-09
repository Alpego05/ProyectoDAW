const diagnosticoService = require('../services/diagnosticoServices');

// Obtener todos los diagnósticos
const getAllDiagnosticos = async (req, res) => {
    try {
        const diagnosticos = await diagnosticoService.getAllDiagnosticos();
        return res.status(200).json({
            data: diagnosticos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener diagnóstico por ID
const getDiagnosticoById = async (req, res) => {
    try {
        const { id } = req.params;
        const diagnostico = await diagnosticoService.getDiagnosticoById(id);

        return res.status(200).json({
            data: diagnostico
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Crear un nuevo diagnóstico
const createDiagnostico = async (req, res) => {
    try {
        const newDiagnostico = await diagnosticoService.createDiagnostico(req.body);
        return res.status(201).json({
            message: 'Diagnóstico creado exitosamente',
            data: newDiagnostico
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar un diagnóstico
const updateDiagnostico = async (req, res) => {
    try {
        const updatedDiagnostico = await diagnosticoService.updateDiagnostico(req.params.id, req.body);
        if (updatedDiagnostico) {
            return res.status(200).json({
                message: 'Diagnóstico actualizado exitosamente',
                data: updatedDiagnostico
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Diagnóstico no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar un diagnóstico
const deleteDiagnostico = async (req, res) => {
    try {
        const deleted = await diagnosticoService.deleteDiagnostico(req.params.id);
        if (deleted) {
            return res.status(204).json({ message: 'Diagnóstico eliminado' });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Diagnóstico no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener diagnósticos por ID de paciente
const getDiagnosticosByPacienteId = async (req, res) => {
    try {
        const { id_paciente } = req.params;
        const diagnosticos = await diagnosticoService.getDiagnosticosByPacienteId(id_paciente);
        
        return res.status(200).json({
            data: diagnosticos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener diagnóstico por ID de cita
const getDiagnosticoByCitaId = async (req, res) => {
    try {
        const { id_cita } = req.params;
        const diagnostico = await diagnosticoService.getDiagnosticoByCitaId(id_cita);
        
        return res.status(200).json({
            data: diagnostico
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar la receta de un diagnóstico
const updateRecetaDiagnostico = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_receta } = req.body;
        
        if (!id_receta) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere el id_receta'
            });
        }
        
        const updatedDiagnostico = await diagnosticoService.updateRecetaDiagnostico(id, id_receta);
        
        return res.status(200).json({
            message: 'Receta asignada al diagnóstico exitosamente',
            data: updatedDiagnostico
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllDiagnosticos,
    getDiagnosticoById,
    createDiagnostico,
    updateDiagnostico,
    deleteDiagnostico,
    getDiagnosticosByPacienteId,
    getDiagnosticoByCitaId,
    updateRecetaDiagnostico
};