const Cita = require('../database/models/CitaModel');
const db = require('../database/models/associations');


// Obtener todas las citas
const getAllCitas = async () => {
    try {
        return await Cita.findAll();
    } catch (error) {
        throw new Error(`Error al obtener las citas: ${error.message}`);
    }
};

// Obtener citas de un paciente por ID
const getCitasByPatient = async (paciente_id) => {
    try {
        const citas = await Cita.findAll({
            where: { paciente_id },
        });
        if (!citas || citas.length === 0) {
            throw new Error('No se encontraron citas para este paciente');
        }
        return citas;
    } catch (error) {
        throw new Error(`Error al obtener las citas del paciente: ${error.message}`);
    }
};

// Obtener citas de un doctor por ID
const getCitasByDoctor = async (doctor_id) => {
    try {
        const citas = await Cita.findAll({ where: { doctor_id } });
        if (!citas || citas.length === 0) {
            throw new Error('No se encontraron citas para este doctor');
        }
        return citas;
    } catch (error) {
        throw new Error(`Error al obtener las citas del doctor: ${error.message}`);
    }
};

// Crear una nueva cita
const createCita = async (citaData) => {
    try {
        const { paciente_id, doctor_id, fecha, hora_inicio, hora_fin, estado } = citaData;
        // Validar que los campos obligatorios estén presentes
        if (!paciente_id || !doctor_id || !fecha || !hora_inicio || !hora_fin || !estado) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }
        // Verificar que el paciente y el doctor existan
        const patient = await db.Patient.findByPk(paciente_id);
        const doctor = await db.Doctor.findByPk(doctor_id);
        if (!patient) {
            const error = new Error('Paciente no encontrado');
            error.statusCode = 404;
            throw error;
        }
        if (!doctor) {
            const error = new Error('Doctor no encontrado');
            error.statusCode = 404;
            throw error;
        }
        // Crear la cita
        const newCita = await Cita.create({
            paciente_id,
            doctor_id,
            fecha,
            hora_inicio,
            hora_fin,
            estado
        });

        return newCita;
    } catch (error) {
        throw new Error(`Error al crear la cita: ${error.message}`);
    }
};

// Actualizar una cita
const updateCita = async (id, citaData) => {
    try {
        const { paciente_id, doctor_id, fecha, hora_inicio, hora_fin, estado } = citaData;
        const cita = await Cita.findByPk(id);
        if (!cita) {
            throw new Error('Cita no encontrada');
        }
        // Actualizar los campos si están presentes
        if (paciente_id) cita.paciente_id = paciente_id;
        if (doctor_id) cita.doctor_id = doctor_id;
        if (fecha) cita.fecha = fecha;
        if (hora_inicio) cita.hora = hora_inicio;
        if (hora_fin) cita.hora_fin = hora_fin;
        if (estado) cita.estado = estado;
        await cita.save();

        return cita;
    } catch (error) {
        throw new Error(`Error al actualizar la cita: ${error.message}`);
    }
};

// Eliminar una cita
const deleteCita = async (id_cita) => {
    try {
        const cita = await Cita.findByPk(id_cita);
        if (!cita) {
            throw new Error('Cita no encontrada');
        }
        await cita.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar la cita: ${error.message}`);
    }
};

module.exports = {
    getAllCitas,
    getCitasByPatient,
    getCitasByDoctor,
    createCita,
    updateCita,
    deleteCita
};
