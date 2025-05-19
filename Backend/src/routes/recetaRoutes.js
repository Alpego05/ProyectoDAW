const RecetaRouter = require("express").Router();
const RecetaController = require("../controllers/recetaController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");


RecetaRouter.get("/", verifyToken, RecetaController.getAllRecetas);
RecetaRouter.get("/:id", verifyToken, RecetaController.getRecetaById);
RecetaRouter.get("/bydiagnostico/:id", verifyToken, RecetaController.getRecetasByDiagnosticoId);
RecetaRouter.get("/bypatient/:id", RecetaController.getRecetasByPacienteId);
RecetaRouter.delete("/delete/:id", verifyToken, RecetaController.deleteReceta);
RecetaRouter.post("/create", verifyToken, RecetaController.createReceta);
RecetaRouter.patch("/edit/:id", verifyToken, RecetaController.deleteReceta);  

module.exports = RecetaRouter;