const MedRoutes = require("express").Router();
const  MedController = require("./../controllers/medicamentoController");

MedRoutes.get("/", MedController.getAllMedicamentos);
MedRoutes.get("/:id", MedController.getMedicamentoById);
MedRoutes.post("/create" , MedController.createMedicamento);
MedRoutes.patch("/edit/:id", MedController.updateMedicamento);
MedRoutes.delete("/delete/:id", MedController.deleteMedicamento);

module.exports = MedRoutes;