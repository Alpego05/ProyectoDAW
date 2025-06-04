const CitaRouter = require("express").Router();
const CitaController = require("../controllers/citaController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");

CitaRouter.get("/", verifyToken,CitaController.getAllCitas);
CitaRouter.get("/bypatient/:id", CitaController.getCitaByPatient);
CitaRouter.get("/bydoctor/:id",   CitaController.getCitaByDoctor);
CitaRouter.delete("/delete/:id",  CitaController.deleteCita);
CitaRouter.post("/create", CitaController.createCita);  
CitaRouter.patch("/edit/:id", CitaController.updateCita);  

module.exports = CitaRouter;