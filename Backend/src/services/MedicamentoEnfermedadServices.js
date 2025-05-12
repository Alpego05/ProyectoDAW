const { Medicamento, Enfermedad, MedicamentoEnfermedad } = require("../database/models/associations")

// Obtener medicamentos que pueden ayudar a una enfermedad específica
const getMedicamentosByEnfermedad = async (enfermedadId) => {
  try {
    const enfermedad = await Enfermedad.findByPk(enfermedadId, {
      include: {
        model: Medicamento,
        as: "medicamentos",
        through: {
          attributes: ["dosis_recomendada", "eficacia"],
        },
      },
    })

    if (!enfermedad) {
      throw new Error("Enfermedad no encontrada")
    }

    return enfermedad.medicamentos
  } catch (error) {
    throw new Error(`Error al obtener medicamentos para la enfermedad: ${error.message}`)
  }
}

// Obtener enfermedades que pueden ser tratadas por un medicamento específico
const getEnfermedadesByMedicamento = async (medicamentoId) => {
  try {
    const medicamento = await Medicamento.findByPk(medicamentoId, {
      include: {
        model: Enfermedad,
        as: "enfermedades",
        through: {
          attributes: ["dosis_recomendada", "eficacia"],
        },
      },
    })

    if (!medicamento) {
      throw new Error("Medicamento no encontrado")
    }

    return medicamento.enfermedades
  } catch (error) {
    throw new Error(`Error al obtener enfermedades para el medicamento: ${error.message}`)
  }
}

// Asignar un medicamento a una enfermedad
const asignarMedicamentoAEnfermedad = async (medicamentoId, enfermedadId, datos = {}) => {
  try {
    const { dosis_recomendada, eficacia } = datos

    // Verificar que el medicamento existe
    const medicamento = await Medicamento.findByPk(medicamentoId)
    if (!medicamento) {
      throw new Error("Medicamento no encontrado")
    }

    // Verificar que la enfermedad existe
    const enfermedad = await Enfermedad.findByPk(enfermedadId)
    if (!enfermedad) {
      throw new Error("Enfermedad no encontrada")
    }

    // Crear o actualizar la relación
    const [relacion, created] = await MedicamentoEnfermedad.findOrCreate({
      where: {
        id_medicamento: medicamentoId,
        id_enfermedad: enfermedadId,
      },
      defaults: {
        dosis_recomendada,
        eficacia,
      },
    })

    // Si la relación ya existía, actualizar los datos
    if (!created && (dosis_recomendada || eficacia)) {
      if (dosis_recomendada) relacion.dosis_recomendada = dosis_recomendada
      if (eficacia) relacion.eficacia = eficacia
      await relacion.save()
    }

    return relacion
  } catch (error) {
    throw new Error(`Error al asignar medicamento a enfermedad: ${error.message}`)
  }
}

// Eliminar la asignación de un medicamento a una enfermedad
const eliminarAsignacion = async (medicamentoId, enfermedadId) => {
  try {
    const deleted = await MedicamentoEnfermedad.destroy({
      where: {
        id_medicamento: medicamentoId,
        id_enfermedad: enfermedadId,
      },
    })

    if (deleted === 0) {
      throw new Error("Asignación no encontrada")
    }

    return true
  } catch (error) {
    throw new Error(`Error al eliminar asignación: ${error.message}`)
  }
}

module.exports = {
  getMedicamentosByEnfermedad,
  getEnfermedadesByMedicamento,
  asignarMedicamentoAEnfermedad,
  eliminarAsignacion,
}
