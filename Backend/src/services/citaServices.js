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
const getCitasByPatient = async (patientId) => {
    try {
        const citas = await Cita.findAll({where: { patientId },});

        if (!citas || citas.length === 0) {
            throw new Error('No se encontraron citas para este paciente');
        }

        return citas;
    } catch (error) {
        throw new Error(`Error al obtener las citas del paciente: ${error.message}`);
    }
};

// Obtener citas de un doctor por ID
const getCitasByDoctor = async (doctorId) => {
    try {
        const citas = await Cita.findAll({ where: { doctorId }});

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
        const { id_paciente, id_doctor, fecha, hora_inicio, hora_fin, estado } = citaData;

        // Validar que los campos obligatorios estén presentes
        if (!id_paciente || !id_doctor || !fecha || !hora_inicio || !hora_fin || !estado) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }

        // Verificar que el paciente y el doctor existan
        const patient = await db.Patient.findByPk(id_paciente);
        const doctor = await db.Doctor.findByPk(id_doctor);

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
            id_paciente,
            id_doctor,
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
        const { id_paciente, id_doctor, fecha, hora_inicio, hora_fin, estado } = citaData;

        const cita = await Cita.findByPk(id);

        if (!cita) {
            throw new Error('Cita no encontrada');
        }

        // Actualizar los campos si están presentes
        if (id_paciente) cita.id_paciente = id_paciente;
        if (id_doctor) cita.id_doctor = id_doctor;
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
const deleteCita = async (id) => {
    try {
        const cita = await Cita.findByPk(id);

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
