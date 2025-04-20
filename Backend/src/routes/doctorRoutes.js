const doctorRouter = require("express").Router();
const doctorController = require("./../controllers/doctorController");

// Get all doctors
doctorRouter.get("/", doctorController.getAllDoctors);
// Get a specific doctor by ID
doctorRouter.get("/:id", doctorController.getDoctorById);
// Create a new doctor
doctorRouter.post("/create", doctorController.createDoctor);
// Update a doctor
doctorRouter.patch("/edit/:id", doctorController.updateDoctor);
// Delete a doctor
doctorRouter.delete("/delete/:id", doctorController.deleteDoctor);

module.exports = doctorRouter;