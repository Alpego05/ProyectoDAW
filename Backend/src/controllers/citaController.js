const citaService = require('./../services/citaServices');

// Obtener todas las citas
const getAllCitas = async (req, res) => {
    try {
        const citas = await citaService.getAllCitas();
        return res.status(200).json({
            data: citas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener citas por paciente
const getCitaByPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const citas = await citaService.getCitasByPatient(id);
        if (citas.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Citas no encontradas para este paciente'
            });
        }

        return res.status(200).json({
            data: citas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener citas por doctor
const getCitaByDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const citas = await citaService.getCitasByDoctor(id);
        if (citas.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Citas no encontradas para este doctor'
            });
        }

        return res.status(200).json({
            data: citas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Crear una cita
const createCita = async (req, res) => {
    try {
        const newCita = await citaService.createCita(req.body);
        return res.status(201).json({
            message: 'Cita creada exitosamente',
            data: newCita
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar una cita
const updateCita = async (req, res) => {
    try {
        const updatedCita = await citaService.updateCita(req.params.id, req.body);
        if (updatedCita) {
            return res.status(200).json({
                message: 'Cita actualizada exitosamente',
                data: updatedCita
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar una cita
const deleteCita = async (req, res) => {
    try {
        const deleted = await citaService.deleteCita(req.params.id);
        if (deleted) {
            return res.status(204).json({ message: 'Cita eliminada' });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
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
    getAllCitas,
    getCitaByPatient,
    getCitaByDoctor,
    createCita,
    updateCita,
    deleteCita
};
