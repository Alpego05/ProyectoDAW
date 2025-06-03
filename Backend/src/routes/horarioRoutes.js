const horarioRoutes = require("express").Router();
const horarioController = require("./../controllers/horarioController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");


horarioRoutes.get("/", verifyToken, horarioController.getAllHorarios);
horarioRoutes.get("/:id",  horarioController.getHorarioByDoctor);
horarioRoutes.post("/create" , verifyToken, horarioController.createHorario);
horarioRoutes.patch("/edit/:id", verifyToken, horarioController.updateHorario);
horarioRoutes.delete("/delete/:id", verifyToken, horarioController.deleteHorario);
horarioRoutes.delete("/deletebyD/:id", verifyToken, horarioController.deleteHorarioByDoctor);

module.exports = horarioRoutes;