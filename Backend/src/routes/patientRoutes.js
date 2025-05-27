const PatientRouter = require("express").Router();
const PatientController = require("../controllers/patientController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");


// Rutas para pacientes
PatientRouter.get('/',  PatientController.getAllPatients);
PatientRouter.get('/:id', verifyToken, PatientController.getPatientById);
PatientRouter.patch('/edit/:id', verifyToken, PatientController.updatePatient);
PatientRouter.delete('/delete/:id', verifyToken, PatientController.deletePatient);

module.exports = PatientRouter;