const express = require("express")
const EnfMEdRouter = express.Router()
const medicamentoEnfermedadController = require("../controllers/MedicamentoEnfermedadController")

// medicamentos que pueden ayudar a una enfermedad específica
EnfMEdRouter.get("/enfermedades/:id/medicamentos", medicamentoEnfermedadController.getMedicamentosByEnfermedad)

// enfermedades tratadas por un medicamento específico
EnfMEdRouter.get("/medicamentos/:id/enfermedades", medicamentoEnfermedadController.getEnfermedadesByMedicamento)

// asignar un medicamento a una enfermedad
EnfMEdRouter.post("/medicamentos/:medicamentoId/enfermedades/:enfermedadId",medicamentoEnfermedadController.asignarMedicamentoAEnfermedad,)

// Eliminar asignación de medicamento a enfermedad
EnfMEdRouter.delete("/medicamentos/:medicamentoId/enfermedades/:enfermedadId",medicamentoEnfermedadController.eliminarAsignacion,)

module.exports = EnfMEdRouter