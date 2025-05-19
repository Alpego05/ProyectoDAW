const Receta = require('../database/models/RecetaModel');
const Medicamento = require('../database/models/MedicamentoModel');
const Enfermedad = require('../database/models/EnfermedadModel');

// Obtener todas las recetas
const getAllRecetas = async () => {
    try {
        return await Receta.findAll({
            include: [
                {
                    model: Medicamento,
                    as: "medicamento",
                    attributes: ["nombre"]
                },
                {
                    model: Enfermedad,
                    as: "enfermedad",
                    attributes: ["nombre"]
                }
            ]
        });
    } catch (error) {
        throw new Error(`Error al obtener las recetas: ${error.message}`);
    }
};


// Obtener una receta por ID
const getRecetaById = async (id_receta) => {
    try {
        const receta = await Receta.findByPk(id_receta, {
            include: [
                {
                    model: Medicamento,
                    as: "medicamento",
                    attributes: ["nombre"]
                },
                {
                    model: Enfermedad,
                    as: "enfermedad",
                    attributes: ["nombre"]
                }
            ]
        });

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
        const { diagnostico_id, id_paciente, medicamento_id, id_enfermedad, dosis, duracion } = recetaData;

        // Validar que los campos obligatorios estén presentes
        if (!diagnostico_id || !id_paciente || !medicamento_id || !id_enfermedad || !dosis || !duracion) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }

        // Crear la receta
        const newReceta = await Receta.create({
            diagnostico_id,
            id_paciente,
            medicamento_id,
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
const updateReceta = async (id_receta, recetaData) => {
    try {
        const receta = await Receta.findByPk(id_receta);

        if (!receta) {
            throw new Error('Receta no encontrada');
        }

        // Actualizar los campos si están presentes
        const { diagnostico_id, id_paciente, medicamento_id, id_enfermedad, dosis, duracion } = recetaData;

        if (diagnostico_id) receta.id_diagnostico = id_diagnostico;
        if (id_paciente) receta.id_paciente = id_paciente;
        if (medicamento_id) receta.id_medicamento = id_medicamento;
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
const deleteReceta = async (id_receta) => {
    try {
        const receta = await Receta.findByPk(id_receta);

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
      where: { id_paciente },
     include: [
    {
      model: Medicamento,
      as: "medicamento",
      attributes: ["nombre"]
    },
    {
      model: Enfermedad,
      as: "enfermedad",
      attributes: ["nombre"]
    }
  ]
    });
    return recetas;
  } catch (error) {
    throw new Error(`Error al obtener las recetas del paciente: ${error.message}`);
  }
};


// Obtener recetas por ID de diagnóstico
const getRecetasByDiagnosticoId = async (diagnostico_id) => {
    try {
        const recetas = await Receta.findAll({
            where: { diagnostico_id }
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