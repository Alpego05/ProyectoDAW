const PatientRouter = require("express").Router();
const PatientController = require("../controllers/patientController");

// Rutas para pacientes
PatientRouter.get('/', PatientController.getAllPatients);
PatientRouter.get('/:id', PatientController.getPatientById);
PatientRouter.patch('/edit/:id', PatientController.updatePatient);
PatientRouter.delete('/delete/:id', PatientController.deletePatient);

module.exports = PatientRouter;