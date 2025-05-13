const express = require("express")
const EnfMEdRouter = express.Router()
const medicamentoEnfermedadController = require("../controllers/MedicamentoEnfermedadController")
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");

// medicamentos que pueden ayudar a una enfermedad específica
EnfMEdRouter.get("/enf/:id/med",  medicamentoEnfermedadController.getMedicamentosByEnfermedad)
// enfermedades tratadas por un medicamento específico
EnfMEdRouter.get("/med/:id/enf", verifyToken, medicamentoEnfermedadController.getEnfermedadesByMedicamento)
// asignar un medicamento a una enfermedad
EnfMEdRouter.post("/med/:medicamentoId/enf/:enfermedadId", verifyToken, medicamentoEnfermedadController.asignarMedicamentoAEnfermedad,)
// eliminar la asignación
EnfMEdRouter.delete("/med/:medicamentoId/enf/:enfermedadId", verifyToken,medicamentoEnfermedadController.eliminarAsignacion,)

module.exports = EnfMEdRouter