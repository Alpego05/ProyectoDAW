const doctorRouter = require("express").Router();
const doctorController = require("./../controllers/doctorController");

doctorRouter.get("/", doctorController.getAllDoctors);
doctorRouter.get("/:id", doctorController.getDoctorById);
doctorRouter.patch("/edit/:id", doctorController.updateDoctor);
doctorRouter.delete("/delete/:id", doctorController.deleteDoctor);

module.exports = doctorRouter;