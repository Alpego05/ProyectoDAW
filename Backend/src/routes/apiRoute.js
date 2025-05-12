const apiRouter = require("express").Router();

const userRouter = require("./userRoutes");
const doctorRouter = require("./doctorRoutes");
const patientRouter = require("./patientRoutes");
const registerRoutes = require('./registerRoutes');
const citaRoutes = require('./citaRoutes');
const horarioRoutes = require('./horarioRoutes');
const medRoutes= require('./medicamentoRoutes');
const EnfRoutes = require('./enfermedadRoutes');
const EnfMEdRouter = require("./EnfMEdRoutes");

apiRouter.use("/users", userRouter);
apiRouter.use("/doctors", doctorRouter);
apiRouter.use("/patients", patientRouter);
apiRouter.use('/register', registerRoutes);
apiRouter.use("/citas", citaRoutes);
apiRouter.use("/horarios", horarioRoutes);
apiRouter.use("/med", medRoutes);
apiRouter.use("/enf", EnfRoutes);
apiRouter.use("/enfmed", EnfMEdRouter);

module.exports = apiRouter;

