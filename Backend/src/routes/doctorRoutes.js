const doctorRouter = require("express").Router();
const doctorController = require("./../controllers/doctorController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");

doctorRouter.get("/", verifyToken, verifyToken, doctorController.getAllDoctors);
doctorRouter.get("/:id", verifyToken, doctorController.getDoctorById);
doctorRouter.patch("/edit/:id", verifyToken, doctorController.updateDoctor);
doctorRouter.delete("/delete/:id", verifyToken, doctorController.deleteDoctor);

module.exports = doctorRouter;