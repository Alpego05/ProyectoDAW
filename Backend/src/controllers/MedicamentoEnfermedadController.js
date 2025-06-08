const medicamentoEnfermedadService = require("../services/MedicamentoEnfermedadServices")

// Obtener medicamentos para una enfermedad específica
const getMedicamentosByEnfermedad = async (req, res) => {
  try {
    const { id } = req.params
    const medicamentos = await medicamentoEnfermedadService.getMedicamentosByEnfermedad(id)

    return res.status(200).json({
      data: medicamentos,
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener enfermedades tratadas por un medicamento específico
const getEnfermedadesByMedicamento = async (req, res) => {
  try {
    const { id } = req.params
    const enfermedades = await medicamentoEnfermedadService.getEnfermedadesByMedicamento(id)

    return res.status(200).json({
      data: enfermedades,
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    })
  }
}

// Asignar un medicamento a una enfermedad
const asignarMedicamentoAEnfermedad = async (req, res) => {
  try {
    const { medicamentoId, enfermedadId } = req.params
    const { dosis_recomendada, eficacia } = req.body

    const asignacion = await medicamentoEnfermedadService.asignarMedicamentoAEnfermedad(medicamentoId, enfermedadId, {
      dosis_recomendada,
      eficacia,
    })

    return res.status(201).json({
      message: "Medicamento asignado a enfermedad",
      data: asignacion,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Eliminar asignación
const eliminarAsignacion = async (req, res) => {
  try {
    const { medicamentoId, enfermedadId } = req.params

    await medicamentoEnfermedadService.eliminarAsignacion(medicamentoId, enfermedadId)

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  getMedicamentosByEnfermedad,
  getEnfermedadesByMedicamento,
  asignarMedicamentoAEnfermedad,
  eliminarAsignacion,
}
