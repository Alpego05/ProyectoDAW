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
const getDiagnosticoById = async (id) => {
    try {
        const diagnostico = await Diagnostico.findByPk(id);
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
        const { id_cita, id_paciente, sintomas, id_receta } = diagnosticoData;

        // Validar que los campos obligatorios estén presentes
        if (!id_cita || !id_paciente || !sintomas) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }

        // Crear el diagnóstico
        const newDiagnostico = await Diagnostico.create({
            id_cita,
            id_paciente,
            sintomas,
            id_receta // Este puede ser null
        });

        return newDiagnostico;
    } catch (error) {
        throw new Error(`Error al crear el diagnóstico: ${error.message}`);
    }
};

// Actualizar un diagnóstico
const updateDiagnostico = async (id, diagnosticoData) => {
    try {
        const diagnostico = await Diagnostico.findByPk(id);

        if (!diagnostico) {
            throw new Error('Diagnóstico no encontrado');
        }

        // Actualizar los campos si están presentes
        const { id_cita, id_paciente, sintomas, id_receta } = diagnosticoData;

        if (id_cita) diagnostico.id_cita = id_cita;
        if (id_paciente) diagnostico.id_paciente = id_paciente;
        if (sintomas) diagnostico.sintomas = sintomas;
        // id_receta puede ser null, así que verificamos si está definido
        if (diagnosticoData.hasOwnProperty('id_receta')) {
            diagnostico.id_receta = id_receta;
        }

        await diagnostico.save();

        return diagnostico;
    } catch (error) {
        throw new Error(`Error al actualizar el diagnóstico: ${error.message}`);
    }
};

// Eliminar un diagnóstico
const deleteDiagnostico = async (id) => {
    try {
        const diagnostico = await Diagnostico.findByPk(id);

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
const getDiagnosticosByPacienteId = async (id_paciente) => {
    try {
        const diagnosticos = await Diagnostico.findAll({
            where: { id_paciente }
        });
        return diagnosticos;
    } catch (error) {
        throw new Error(`Error al obtener los diagnósticos del paciente: ${error.message}`);
    }
};

// Obtener diagnóstico por ID de cita
const getDiagnosticoByCitaId = async (id_cita) => {
    try {
        const diagnostico = await Diagnostico.findOne({
            where: { id_cita }
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
const updateRecetaDiagnostico = async (id, id_receta) => {
    try {
        const diagnostico = await Diagnostico.findByPk(id);

        if (!diagnostico) {
            throw new Error('Diagnóstico no encontrado');
        }

        diagnostico.id_receta = id_receta;
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