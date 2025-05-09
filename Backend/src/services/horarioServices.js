const Horario = require('../database/models/HorarioAtencionModel');
const db = require('../database/models/associations');

// Obtener todos los horarios
const getAllHorarios = async () => {
    try {
        return await Horario.findAll();
    } catch (error) {
        throw new Error(`Error al obtener los horarios: ${error.message}`);
    }
};

// Obtener horarios de un doctor por ID
const getHorarioByDoctor = async (id_doctor) => {
    try {
        const horarios = await Horario.findAll({
            where: { id_doctor }
        });
        
        if (!horarios || horarios.length === 0) {
            throw new Error('No se encontraron horarios para este doctor');
        }
        
        return horarios;
    } catch (error) {
        throw new Error(`Error al obtener los horarios del doctor: ${error.message}`);
    }
};

// Crear un nuevo horario
const createHorario = async (horarioData) => {
    try {
        const { id_doctor, dia, hora_inicio, hora_fin, estado } = horarioData;
        
        // Validar que los campos obligatorios estén presentes
        if (!id_doctor || !dia || !hora_inicio || !hora_fin || !estado) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }
        
        // Verificar que el doctor exista
        const doctor = await db.Doctor.findByPk(id_doctor);
        
        if (!doctor) {
            const error = new Error('Doctor no encontrado');
            error.statusCode = 404;
            throw error;
        }
        
        // Crear el horario
        const newHorario = await Horario.create({
            id_doctor,
            dia,
            hora_inicio,
            hora_fin,
            estado
        });
        
        return newHorario;
    } catch (error) {
        throw new Error(`Error al crear el horario: ${error.message}`);
    }
};

// Actualizar un horario
const updateHorario = async (id, horarioData) => {
    try {
        const horario = await Horario.findByPk(id);
        
        if (!horario) {
            throw new Error('Horario no encontrado');
        }
        
        // Actualizar los campos si están presentes
        const { id_doctor, dia, hora_inicio, hora_fin, estado } = horarioData;
        
        if (id_doctor) {
            // Verificar que el doctor exista
            const doctor = await db.Doctor.findByPk(id_doctor);
            
            if (!doctor) {
                throw new Error('Doctor no encontrado');
            }
            
            horario.id_doctor = id_doctor;
        }
        if (dia) horario.dia = dia;
        if (hora_inicio) horario.hora_inicio = hora_inicio;
        if (hora_fin) horario.hora_fin = hora_fin;
        if (estado) horario.estado = estado;
        
        await horario.save();
        
        return horario;
    } catch (error) {
        throw new Error(`Error al actualizar el horario: ${error.message}`);
    }
};

// Eliminar un horario
const deleteHorario = async (id) => {
    try {
        const horario = await Horario.findByPk(id);
        
        if (!horario) {
            throw new Error('Horario no encontrado');
        }
        
        await horario.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar el horario: ${error.message}`);
    }
};

// Eliminar todos los horarios de un doctor
const deleteHorarioByDoctor = async (id_doctor) => {
    try {
        // Verificar que el doctor exista
        const doctor = await db.Doctor.findByPk(id_doctor);
        
        if (!doctor) {
            throw new Error('Doctor no encontrado');
        }
        
        // Buscar todos los horarios del doctor
        const horarios = await Horario.findAll({
            where: { id_doctor }
        });
        
        if (!horarios || horarios.length === 0) {
            throw new Error('No se encontraron horarios para este doctor');
        }
        
        // Eliminar todos los horarios encontrados
        const result = await Horario.destroy({
            where: { id_doctor }
        });
        
        return { eliminados: result };
    } catch (error) {
        throw new Error(`Error al eliminar los horarios del doctor: ${error.message}`);
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