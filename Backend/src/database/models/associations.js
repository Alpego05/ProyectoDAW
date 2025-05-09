const User = require("./userModel");
const Patient = require("./patientModel");
const Doctor = require("./doctorModel");
const HorarioAtencion = require("./HorarioAtencionModel");
const Cita = require("./CitaModel");
const Diagnostico = require("./DiagnosticoModel");
const Receta = require("./RecetaModel");
const Enfermedad = require("./EnfermedadModel");
const Medicamento = require("./MedicamentoModel");

// Definir asociaciones

User.hasOne(Doctor, {
  foreignKey: "id_doctor",
  sourceKey: "dni",
  as: "doctor",
  onDelete: "CASCADE",
});
Doctor.belongsTo(User, {
  foreignKey: "id_doctor",
  targetKey: "dni",
  as: "usuario",
  onDelete: "CASCADE",
});

User.hasOne(Patient, {
  foreignKey: "id_paciente",
  sourceKey: "dni",
  as: "paciente",
  onDelete: "CASCADE",
});
Patient.belongsTo(User, {
  foreignKey: "id_paciente",
  targetKey: "dni",
  as: "usuario",
  onDelete: "CASCADE",
});

// Asociaciones Doctor-Patient
Doctor.hasMany(Patient, {
  foreignKey: "id_doctor_general",
  as: "pacientes",
  onDelete: "SET NULL",
});
Patient.belongsTo(Doctor, {
  foreignKey: "id_doctor_general",
  as: "doctorGeneral",
  onDelete: "SET NULL",
});

// Asociaciones Doctor-HorarioAtencion
Doctor.hasMany(HorarioAtencion, {
  foreignKey: "id_doctor",
  as: "horarios",
  onDelete: "CASCADE",
});
HorarioAtencion.belongsTo(Doctor, {
  foreignKey: "id_doctor",
  onDelete: "CASCADE",
});

// Asociaciones Patient-Cita
Patient.hasMany(Cita, {
  foreignKey: "id_paciente",
  as: "citas",
  onDelete: "CASCADE",
});
Cita.belongsTo(Patient, {
  foreignKey: "id_paciente",
  onDelete: "CASCADE",
});

// Asociaciones Doctor-Cita
Doctor.hasMany(Cita, {
  foreignKey: "id_doctor",
  as: "citas",
  onDelete: "CASCADE", // Si un doctor es eliminado, sus citas también
});
Cita.belongsTo(Doctor, {
  foreignKey: "id_doctor",
  onDelete: "CASCADE",
});

// Asociaciones HorarioAtencion-Cita
HorarioAtencion.belongsToMany(Cita, {
  through: "horario_cita",
  foreignKey: "id_horario",
  otherKey: "id_cita",
  as: "citas",
  onDelete: "CASCADE",
});
Cita.belongsToMany(HorarioAtencion, {
  through: "horario_cita",
  foreignKey: "id_cita",
  otherKey: "id_horario",
  as: "horarios",
  onDelete: "CASCADE",
});

// Asociaciones Cita-Diagnostico
Cita.hasOne(Diagnostico, {
  foreignKey: "id_cita",
  as: "diagnostico",
  onDelete: "CASCADE", // Si una cita es eliminada, su diagnóstico también
});
Diagnostico.belongsTo(Cita, {
  foreignKey: "id_cita",
  onDelete: "CASCADE",
});

// Asociaciones Doctor-Diagnostico
Doctor.hasMany(Diagnostico, {
  foreignKey: "id_doctor",
  as: "diagnosticos",
});
Diagnostico.belongsTo(Doctor, {
  foreignKey: "id_doctor",
  onDelete: "CASCADE",
});

// Asociaciones Diagnostico-Enfermedad
Diagnostico.belongsToMany(Enfermedad, {
  through: "diagnostico_enfermedad",
  foreignKey: "id_diagnostico",
  otherKey: "id_enfermedad",
  as: "enfermedades",
  onDelete: "CASCADE",
});
Enfermedad.belongsToMany(Diagnostico, {
  through: "diagnostico_enfermedad",
  foreignKey: "id_enfermedad",
  otherKey: "id_diagnostico",
  as: "diagnosticos",
  onDelete: "CASCADE",
});

// Asociaciones Enfermedad-Medicamento
Enfermedad.belongsToMany(Medicamento, {
  through: "enfermedad_medicamento",
  foreignKey: "id_enfermedad",
  otherKey: "id_medicamento",
  as: "medicamentos",
  onDelete: "CASCADE",
});
Medicamento.belongsToMany(Enfermedad, {
  through: "enfermedad_medicamento",
  foreignKey: "id_medicamento",
  otherKey: "id_enfermedad",
  as: "enfermedades",
  onDelete: "CASCADE",
});

// Asociaciones Diagnostico-Receta
Diagnostico.hasMany(Receta, {
  foreignKey: "id_diagnostico",
  as: "recetas",
  onDelete: "CASCADE",
});
Receta.belongsTo(Diagnostico, {
  foreignKey: "id_diagnostico",
  onDelete: "CASCADE",
});

// Asociaciones Medicamento-Receta
Medicamento.hasMany(Receta, {
  foreignKey: "id_medicamento",
  as: "recetas",
  onDelete: "CASCADE",
});
Receta.belongsTo(Medicamento, {
  foreignKey: "id_medicamento",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Doctor,
  Patient,
  HorarioAtencion,
  Cita,
  Diagnostico,
  Enfermedad,
  Medicamento,
  Receta,
};
