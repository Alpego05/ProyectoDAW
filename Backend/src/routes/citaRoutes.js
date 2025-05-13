const CitaRouter = require("express").Router();
const CitaController = require("../controllers/citaController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");

CitaRouter.get("/", CitaController.getAllCitas);
CitaRouter.get("/bypatient/:id", verifyToken, CitaController.getCitaByPatient);
CitaRouter.get("/bypatient/:id", verifyToken, CitaController.getCitaByPatient);
CitaRouter.get("/bydoctor/:id", verifyToken,  CitaController.getCitaByDoctor);
CitaRouter.delete("/delete/:id", verifyToken, CitaController.deleteCita);
CitaRouter.post("/create", verifyToken, CitaController.createCita);  
CitaRouter.patch("/edit/:id", verifyToken, CitaController.updateCita);  

module.exports = CitaRouter;