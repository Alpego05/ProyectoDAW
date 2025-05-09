const apiRouter = require("express").Router();

const userRouter = require("./userRoutes");
const doctorRouter = require("./doctorRoutes");
const patientRouter = require("./patientRoutes");
const registerRoutes = require('./registerRoutes');
const citaRoutes = require('./citaRoutes');
const horarioRoutes = require('./horarioRoutes');
const medRoutes= require('./medicamentoRoutes');
const EnfRoutes = require('./enfermedadRoutes');

apiRouter.use("/users", userRouter);
apiRouter.use("/doctors", doctorRouter);
apiRouter.use("/patients", patientRouter);
apiRouter.use('/register', registerRoutes);
apiRouter.use("/citas", citaRoutes);
apiRouter.use("/horarios", horarioRoutes);
apiRouter.use("/med", medRoutes);
apiRouter.use("/enf", EnfRoutes);

module.exports = apiRouter;

