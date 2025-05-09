const medicamentoService = require('./../services/medicamentoServices');

// Obtener todos los medicamentos
const getAllMedicamentos = async (req, res) => {
    try {
        const medicamentos = await medicamentoService.getAllMedicamentos();
        return res.status(200).json({
            data: medicamentos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener medicamento por ID
const getMedicamentoById = async (req, res) => {
    try {
        const { id } = req.params;
        const medicamento = await medicamentoService.getMedicamentoById(id);
        
        return res.status(200).json({
            data: medicamento
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Crear un medicamento
const createMedicamento = async (req, res) => {
    try {
        const newMedicamento = await medicamentoService.createMedicamento(req.body);
        return res.status(201).json({
            message: 'Medicamento creado exitosamente',
            data: newMedicamento
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar un medicamento
const updateMedicamento = async (req, res) => {
    try {
        const updatedMedicamento = await medicamentoService.updateMedicamento(req.params.id, req.body);
        if (updatedMedicamento) {
            return res.status(200).json({
                message: 'Medicamento actualizado exitosamente',
                data: updatedMedicamento
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Medicamento no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar un medicamento
const deleteMedicamento = async (req, res) => {
    try {
        const deleted = await medicamentoService.deleteMedicamento(req.params.id);
        if (deleted) {
            return res.status(204).json({ message: 'Medicamento eliminado' });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Medicamento no encontrado'
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
    getAllMedicamentos,
    getMedicamentoById,
    createMedicamento,
    updateMedicamento,
    deleteMedicamento,
};
