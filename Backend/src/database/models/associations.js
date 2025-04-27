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
User.hasOne(Doctor, { foreignKey: 'userId', as: 'doctor' });
Doctor.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Patient, { foreignKey: 'userId', as: 'patient' });
Patient.belongsTo(User, { foreignKey: 'userId' });

Doctor.hasMany(Patient, { foreignKey: 'generalDoctorId', as: 'patients' });
Patient.belongsTo(Doctor, { foreignKey: 'generalDoctorId', as: 'generalDoctor' });

Patient.hasOne(MedicalHistory, { foreignKey: 'patientId', as: 'medicalHistory' });
MedicalHistory.belongsTo(Patient, { foreignKey: 'patientId' });

Doctor.hasMany(Schedule, { foreignKey: 'doctorId', as: 'schedules' });
Schedule.belongsTo(Doctor, { foreignKey: 'doctorId' });

Patient.hasMany(Appointment, { foreignKey: 'patientId', as: 'appointments' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

Schedule.belongsToMany(Appointment, {
  through: 'agenda_cita',
  foreignKey: 'id_agenda',
  otherKey: 'id_cita',
  as: 'appointments'
});
Appointment.belongsToMany(Schedule, {
  through: 'agenda_cita',
  foreignKey: 'id_cita',
  otherKey: 'id_agenda',
  as: 'schedules'
});

Appointment.hasOne(Diagnosis, { foreignKey: 'appointmentId', as: 'diagnosis' });
Diagnosis.belongsTo(Appointment, { foreignKey: 'appointmentId' });

Doctor.hasMany(Diagnosis, { foreignKey: 'doctorId', as: 'diagnoses' });
Diagnosis.belongsTo(Doctor, { foreignKey: 'doctorId' });

Diagnosis.belongsToMany(Disease, {
  through: 'diagnostico_enfermedad',
  foreignKey: 'id_diagnostico',
  otherKey: 'id_enfermedad',
  as: 'diseases'
});
Disease.belongsToMany(Diagnosis, {
  through: 'diagnostico_enfermedad',
  foreignKey: 'id_enfermedad',
  otherKey: 'id_diagnostico',
  as: 'diagnoses'
});

Disease.belongsToMany(Medication, {
  through: 'enfermedad_medicamento',
  foreignKey: 'id_enfermedad',
  otherKey: 'id_medicamento',
  as: 'medications'
});
Medication.belongsToMany(Disease, {
  through: 'enfermedad_medicamento',
  foreignKey: 'id_medicamento',
  otherKey: 'id_enfermedad',
  as: 'diseases'
});

Diagnosis.belongsToMany(Test, {
  through: 'diagnostico_prueba',
  foreignKey: 'id_diagnostico',
  otherKey: 'id_prueba',
  as: 'tests'
});
Test.belongsToMany(Diagnosis, {
  through: 'diagnostico_prueba',
  foreignKey: 'id_prueba',
  otherKey: 'id_diagnostico',
  as: 'diagnoses'
});

MedicalHistory.belongsToMany(Diagnosis, {
  through: 'historial_diagnostico',
  foreignKey: 'id_historial',
  otherKey: 'id_diagnostico',
  as: 'diagnoses'
});
Diagnosis.belongsToMany(MedicalHistory, {
  through: 'historial_diagnostico',
  foreignKey: 'id_diagnostico',
  otherKey: 'id_historial',
  as: 'medicalHistories'
});

Diagnosis.hasMany(Prescription, { foreignKey: 'diagnosisId', as: 'prescriptions' });
Prescription.belongsTo(Diagnosis, { foreignKey: 'diagnosisId' });

Medication.hasMany(Prescription, { foreignKey: 'medicationId', as: 'prescriptions' });
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