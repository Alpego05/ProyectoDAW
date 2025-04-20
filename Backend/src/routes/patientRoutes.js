const patientRouter = require("express").Router();
const patientController = require("./../controllers/patientController");

patientRouter.get("/", patientController.getAllPatients);
patientRouter.get("/:id", patientController.getPatientById);
patientRouter.delete("/delete/:id", patientController.deletePatient);
patientRouter.post("/create", patientController.createPatient);
patientRouter.patch("/edit/:id", patientController.updatePatient); 

module.exports = patientRouter;