const apiRouter = require("express").Router();

const userRouter = require("./userRoutes");
const doctorRouter = require("./doctorRoutes");
const patientRouter = require("./patientRoutes");
// const appointmentRouter = require("./appointmentRoutes");
// const scheduleRouter = require("./scheduleRoutes");
// const diagnosisRouter = require("./diagnosisRoutes");
// const diseaseRouter = require("./diseaseRoutes");
// const medicalHistoryRouter = require("./medicalHistoryRoutes");
// const medicationRouter = require("./medicationRoutes");
// const testRouter = require("./testRoutes");
// const prescriptionRouter = require("./prescriptionRoutes");

apiRouter.use("/users", userRouter);
apiRouter.use("/doctors", doctorRouter);
apiRouter.use("/patients", patientRouter);
// apiRouter.use("/appointments", appointmentRouter);
// apiRouter.use("/schedules", scheduleRouter);
// apiRouter.use("/diagnoses", diagnosisRouter);
// apiRouter.use("/diseases", diseaseRouter);
// apiRouter.use("/medical-histories", medicalHistoryRouter);
// apiRouter.use("/medications", medicationRouter);
// apiRouter.use("/tests", testRouter);
// apiRouter.use("/prescriptions", prescriptionRouter);

module.exports = apiRouter;

