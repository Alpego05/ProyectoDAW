const EnfRoutes = require("express").Router();
const  EnfController = require("./../controllers/EnfermedadController");

EnfRoutes.get("/", EnfController.getAllEnfermedades);
EnfRoutes.get("/:id", EnfController.getEnfermedadById);
EnfRoutes.post("/create" , EnfController.createEnfermedad);
EnfRoutes.patch("/edit/:id", EnfController.updateEnfermedad);
EnfRoutes.delete("/delete/:id", EnfController.deleteEnfermedad);

module.exports = EnfRoutes;