const MedRoutes = require("express").Router();
const  MedController = require("./../controllers/medicamentoController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");


MedRoutes.get("/",  MedController.getAllMedicamentos);
MedRoutes.get("/:id", verifyToken, MedController.getMedicamentoById);
MedRoutes.post("/create" , verifyToken, MedController.createMedicamento);
MedRoutes.patch("/edit/:id", verifyToken, MedController.updateMedicamento);
MedRoutes.delete("/delete/:id", verifyToken, MedController.deleteMedicamento);

module.exports = MedRoutes;