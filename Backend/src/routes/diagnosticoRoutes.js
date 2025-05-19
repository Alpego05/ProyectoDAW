const DiagnosticoRouter = require("express").Router();
const DiagnosticoController = require("../controllers/diagnosticoController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");

DiagnosticoRouter.get("/", DiagnosticoController.getAllDiagnosticos);
DiagnosticoRouter.get("/:id", verifyToken, DiagnosticoController.getDiagnosticoById);
DiagnosticoRouter.get("/byCita/:id", verifyToken,  DiagnosticoController.getDiagnosticoByCitaId);
DiagnosticoRouter.get("/byPatient/:id", verifyToken, DiagnosticoController.getDiagnosticosByPacienteId);
DiagnosticoRouter.delete("/delete/:id", verifyToken, DiagnosticoController.deleteDiagnostico);
DiagnosticoRouter.post("/create", verifyToken, DiagnosticoController.createDiagnostico);  
DiagnosticoRouter.patch("/edit/:id", verifyToken, DiagnosticoController.updateDiagnostico);  

module.exports = DiagnosticoRouter;