const horarioService = require('./../services/horarioServices');

// Obtener todos los horarios
const getAllHorarios = async (req, res) => {
    try {
        const horarios = await horarioService.getAllHorarios();
        return res.status(200).json({
            data: horarios
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener horarios por doctor
const getHorarioByDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const horarios = await horarioService.getHorarioByDoctor(id);
        
        return res.status(200).json({
            data: horarios
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Crear un horario
const createHorario = async (req, res) => {
    try {
        const newHorario = await horarioService.createHorario(req.body);
        return res.status(201).json({
            message: 'Horario creado exitosamente',
            data: newHorario
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar un horario
const updateHorario = async (req, res) => {
    try {
        const updatedHorario = await horarioService.updateHorario(req.params.id, req.body);
        if (updatedHorario) {
            return res.status(200).json({
                message: 'Horario actualizado exitosamente',
                data: updatedHorario
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Horario no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar un horario
const deleteHorario = async (req, res) => {
    try {
        const deleted = await horarioService.deleteHorario(req.params.id);
        if (deleted) {
            return res.status(204).json({ message: 'Horario eliminado' });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Horario no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar horarios por doctor
const deleteHorarioByDoctor = async (req, res) => {
    try {
        const { id_doctor } = req.params;
        const result = await horarioService.deleteHorarioByDoctor(id_doctor);
        
        return res.status(200).json({
            message: `Se eliminaron ${result.eliminados} horarios del doctor`,
            data: result
        });
    } catch (error) {
        // Si es error de "no encontrado", devolver 404
        if (error.message.includes('No se encontraron horarios') || error.message.includes('Doctor no encontrado')) {
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

module.exports = {
    getAllHorarios,
    getHorarioByDoctor,
    createHorario,
    updateHorario,
    deleteHorario,
    deleteHorarioByDoctor
};