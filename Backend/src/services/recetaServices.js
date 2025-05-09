const Receta = require('../database/models/RecetaModel');

// Obtener todas las recetas
const getAllRecetas = async () => {
    try {
        return await Receta.findAll();
    } catch (error) {
        throw new Error(`Error al obtener las recetas: ${error.message}`);
    }
};

// Obtener una receta por ID
const getRecetaById = async (id) => {
    try {
        const receta = await Receta.findByPk(id);
        if (!receta) {
            throw new Error('Receta no encontrada');
        }
        return receta;
    } catch (error) {
        throw new Error(`Error al obtener la receta: ${error.message}`);
    }
};

// Crear una nueva receta
const createReceta = async (recetaData) => {
    try {
        const { id_diagnostico, id_paciente, id_medicamento, id_enfermedad, dosis, duracion } = recetaData;

        // Validar que los campos obligatorios estén presentes
        if (!id_diagnostico || !id_paciente || !id_medicamento || !id_enfermedad || !dosis || !duracion) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }

        // Crear la receta
        const newReceta = await Receta.create({
            id_diagnostico,
            id_paciente,
            id_medicamento,
            id_enfermedad,
            dosis,
            duracion
        });

        return newReceta;
    } catch (error) {
        throw new Error(`Error al crear la receta: ${error.message}`);
    }
};

// Actualizar una receta
const updateReceta = async (id, recetaData) => {
    try {
        const receta = await Receta.findByPk(id);

        if (!receta) {
            throw new Error('Receta no encontrada');
        }

        // Actualizar los campos si están presentes
        const { id_diagnostico, id_paciente, id_medicamento, id_enfermedad, dosis, duracion } = recetaData;

        if (id_diagnostico) receta.id_diagnostico = id_diagnostico;
        if (id_paciente) receta.id_paciente = id_paciente;
        if (id_medicamento) receta.id_medicamento = id_medicamento;
        if (id_enfermedad) receta.id_enfermedad = id_enfermedad;
        if (dosis) receta.dosis = dosis;
        if (duracion) receta.duracion = duracion;

        await receta.save();

        return receta;
    } catch (error) {
        throw new Error(`Error al actualizar la receta: ${error.message}`);
    }
};

// Eliminar una receta
const deleteReceta = async (id) => {
    try {
        const receta = await Receta.findByPk(id);

        if (!receta) {
            throw new Error('Receta no encontrada');
        }

        await receta.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar la receta: ${error.message}`);
    }
};

// Obtener recetas por ID de paciente
const getRecetasByPacienteId = async (id_paciente) => {
    try {
        const recetas = await Receta.findAll({
            where: { id_paciente }
        });
        return recetas;
    } catch (error) {
        throw new Error(`Error al obtener las recetas del paciente: ${error.message}`);
    }
};

// Obtener recetas por ID de diagnóstico
const getRecetasByDiagnosticoId = async (id_diagnostico) => {
    try {
        const recetas = await Receta.findAll({
            where: { id_diagnostico }
        });
        return recetas;
    } catch (error) {
        throw new Error(`Error al obtener las recetas del diagnóstico: ${error.message}`);
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