const EnfRoutes = require("express").Router();
const  EnfController = require("./../controllers/EnfermedadController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");

EnfRoutes.get("/", verifyToken,  EnfController.getAllEnfermedades);
EnfRoutes.get("/:id", verifyToken, EnfController.getEnfermedadById);
EnfRoutes.post("/create" , verifyToken, EnfController.createEnfermedad);
EnfRoutes.patch("/edit/:id", verifyToken, EnfController.updateEnfermedad);
EnfRoutes.delete("/delete/:id", verifyToken, EnfController.deleteEnfermedad);

module.exports = EnfRoutes;