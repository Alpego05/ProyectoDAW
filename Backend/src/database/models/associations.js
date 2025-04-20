const User = require('./UserModel');
const Doctor = require('./DoctorModel');
const Patient = require('./PatientModel');
const MedicalHistory = require('./MedicalHistoryModel');
const Schedule = require('./ScheduleModel');
const Appointment = require('./AppointmentModel');
const Diagnosis = require('./DiagnosisModel');
const Disease = require('./DiseaseModel');
const Medication = require('./MedicationModel');
const Test = require('./TestModel');
const Prescription = require('./PrescriptionModel');

// Definir asociaciones
User.hasOne(Doctor, { foreignKey: 'userId' });
Doctor.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Patient, { foreignKey: 'userId' });
Patient.belongsTo(User, { foreignKey: 'userId' });

Patient.hasOne(MedicalHistory, { foreignKey: 'patientId' });
MedicalHistory.belongsTo(Patient, { foreignKey: 'patientId' });

Doctor.hasMany(Schedule, { foreignKey: 'doctorId' });
Schedule.belongsTo(Doctor, { foreignKey: 'doctorId' });

Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

Schedule.belongsToMany(Appointment, {
  through: 'agenda_cita',
  foreignKey: 'id_agenda',
  otherKey: 'id_cita'
});
Appointment.belongsToMany(Schedule, {
  through: 'agenda_cita',
  foreignKey: 'id_cita',
  otherKey: 'id_agenda'
});

Appointment.hasOne(Diagnosis, { foreignKey: 'appointmentId' });
Diagnosis.belongsTo(Appointment, { foreignKey: 'appointmentId' });

Doctor.hasMany(Diagnosis, { foreignKey: 'doctorId' });
Diagnosis.belongsTo(Doctor, { foreignKey: 'doctorId' });

Diagnosis.belongsToMany(Disease, {
  through: 'diagnostico_enfermedad',
  foreignKey: 'id_diagnostico',
  otherKey: 'id_enfermedad'
});
Disease.belongsToMany(Diagnosis, {
  through: 'diagnostico_enfermedad',
  foreignKey: 'id_enfermedad',
  otherKey: 'id_diagnostico'
});

Disease.belongsToMany(Medication, {
  through: 'enfermedad_medicamento',
  foreignKey: 'id_enfermedad',
  otherKey: 'id_medicamento'
});
Medication.belongsToMany(Disease, {
  through: 'enfermedad_medicamento',
  foreignKey: 'id_medicamento',
  otherKey: 'id_enfermedad'
});

Diagnosis.belongsToMany(Test, {
  through: 'diagnostico_prueba',
  foreignKey: 'id_diagnostico',
  otherKey: 'id_prueba'
});
Test.belongsToMany(Diagnosis, {
  through: 'diagnostico_prueba',
  foreignKey: 'id_prueba',
  otherKey: 'id_diagnostico'
});

MedicalHistory.belongsToMany(Diagnosis, {
  through: 'historial_diagnostico',
  foreignKey: 'id_historial',
  otherKey: 'id_diagnostico'
});
Diagnosis.belongsToMany(MedicalHistory, {
  through: 'historial_diagnostico',
  foreignKey: 'id_diagnostico',
  otherKey: 'id_historial'
});

Diagnosis.hasMany(Prescription, { foreignKey: 'diagnosisId' });
Prescription.belongsTo(Diagnosis, { foreignKey: 'diagnosisId' });

Medication.hasMany(Prescription, { foreignKey: 'medicationId' });
Prescription.belongsTo(Medication, { foreignKey: 'medicationId' });

module.exports = {
  User,
  Doctor,
  Patient,
  MedicalHistory,
  Schedule,
  Appointment,
  Diagnosis,
  Disease,
  Medication,
  Test,
  Prescription
};
