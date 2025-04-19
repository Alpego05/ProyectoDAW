const patientRouter = require("express").Router();
const patientController = require("./../controllers/patientController");
const {verifyToken, checkRole} = require("./middlewares");

patientRouter.get("/", verifyToken, patientController.getAllPatients);
patientRouter.get("/:id", verifyToken, patientController.getPatientById);
patientRouter.delete("/delete/:id", verifyToken, patientController.deletePatient);
patientRouter.post("/create", verifyToken, patientController.createPatient);
patientRouter.patch("/edit/:id", verifyToken, patientController.editPatient);

module.exports = patientRouter;