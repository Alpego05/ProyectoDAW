const horarioRoutes = require("express").Router();
const horarioController = require("./../controllers/horarioController");

horarioRoutes.get("/", horarioController.getAllHorarios);
horarioRoutes.get("/:id", horarioController.getHorarioByDoctor);
horarioRoutes.post("/create" , horarioController.createHorario);
horarioRoutes.patch("/edit/:id", horarioController.updateHorario);
horarioRoutes.delete("/delete/:id", horarioController.deleteHorario);
horarioRoutes.delete("/deletebyD/:id", horarioController.deleteHorarioByDoctor);

module.exports = horarioRoutes;