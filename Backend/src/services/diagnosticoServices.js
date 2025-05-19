const Diagnostico = require('../database/models/DiagnosticoModel');

// Obtener todos los diagnósticos
const getAllDiagnosticos = async () => {
    try {
        return await Diagnostico.findAll();
    } catch (error) {
        throw new Error(`Error al obtener los diagnósticos: ${error.message}`);
    }
};

// Obtener un diagnóstico por ID
const getDiagnosticoById = async (id_diagnostico) => {
    try {
        const diagnostico = await Diagnostico.findByPk(id_diagnostico);
        if (!diagnostico) {
            throw new Error('Diagnóstico no encontrado');
        }
        return diagnostico;
    } catch (error) {
        throw new Error(`Error al obtener el diagnóstico: ${error.message}`);
    }
};

// Crear un nuevo diagnóstico
const createDiagnostico = async (diagnosticoData) => {
    try {
        const { cita_id, paciente_id, doctor_id, enfermedad_id, nombre, sintomas, observaciones } = diagnosticoData;

        // Validar que los campos obligatorios estén presentes
        if (!cita_id || !paciente_id || !doctor_id || !enfermedad_id || !nombre) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }

        //comprobación de que existe el paciente, la cita el doctor y la enfermedad
        const paciente = await paciente.findByPk(paciente_id);
        const cita = await cita.findByPk(cita_id);
        const doctor = await doctor.findByPk(doctor_id);
        const enfermedad = await enfermedad.findByPk(enfermedad_id);

        if (!paciente || !cita || !doctor || !enfermedad) {
            const error = new Error('No se encontraron los datos del paciente, la cita, el doctor o la enfermedad');
            error.statusCode = 404;
            throw error;
        }


        //crear el diagnóstico
        const newDiagnostico = await Diagnostico.create({
            //cita_id, paciente_id, doctor_id, enfermedad_id, nombre, sintomas, observaciones
            cita_id,
            paciente_id,
            doctor_id,
            enfermedad_id,
            nombre,
            sintomas,
            observaciones
        });

        return newDiagnostico;
    } catch (error) {
        throw new Error(`Error al crear el diagnóstico: ${error.message}`);
    }
};

// Actualizar un diagnóstico
const updateDiagnostico = async (id_diagnostico, diagnosticoData) => {
    try {
        const diagnostico = await Diagnostico.findByPk(id_diagnostico);

        if (!diagnostico) {
            throw new Error('Diagnóstico no encontrado');
        }

        // Actualizar los campos si están presentes
        const { cita_id, paciente_id, doctor_id, enfermedad_id, nombre, sintomas, observaciones } = diagnosticoData;
        
        if (cita_id) diagnostico.cita_id = cita_id;
        if (paciente_id) diagnostico.paciente_id = paciente_id;
        if (doctor_id) diagnostico.doctor_id = doctor_id;
        if (enfermedad_id) diagnostico.enfermedad_id = enfermedad_id;
        if (nombre) diagnostico.nombre = nombre;
        if (sintomas) diagnostico.sintomas = sintomas;
        if (observaciones) diagnostico.observaciones = observaciones;

        await diagnostico.save();

        return diagnostico;
    } catch (error) {
        throw new Error(`Error al actualizar el diagnóstico: ${error.message}`);
    }
};

// Eliminar un diagnóstico
const deleteDiagnostico = async (id_diagnostico) => {
    try {
        const diagnostico = await Diagnostico.findByPk(id_diagnostico);

        if (!diagnostico) {
            throw new Error('Diagnóstico no encontrado');
        }

        await diagnostico.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar el diagnóstico: ${error.message}`);
    }
};

// Obtener diagnósticos por ID de paciente
const getDiagnosticosByPacienteId = async (paciente_id) => {
    if (!paciente_id) {
        throw new Error('El ID del paciente es requerido y no puede ser undefined o null.');
    }

    try {
        const diagnosticos = await Diagnostico.findAll({
            where: { paciente_id }
        });
        return diagnosticos;
    } catch (error) {
        throw new Error(`Error al obtener los diagnósticos del paciente: ${error.message}`);
    }
};


// Obtener diagnóstico por ID de cita
const getDiagnosticoByCitaId = async (cita_id) => {
    try {
        const diagnostico = await Diagnostico.findOne({
            where: { cita_id }
        });

        if (!diagnostico) {
            throw new Error('No se encontró diagnóstico para esta cita');
        }

        return diagnostico;
    } catch (error) {
        throw new Error(`Error al obtener el diagnóstico de la cita: ${error.message}`);
    }
};

// Actualizar la receta de un diagnóstico
const updateRecetaDiagnostico = async (id_diagnostico, receta_id) => {
    try {
        const diagnostico = await Diagnostico.findByPk(id_diagnostico);

        if (!diagnostico) {
            throw new Error('Diagnóstico no encontrado');
        }

        diagnostico.id_receta = receta_id;
        await diagnostico.save();

        return diagnostico;
    } catch (error) {
        throw new Error(`Error al actualizar la receta del diagnóstico: ${error.message}`);
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