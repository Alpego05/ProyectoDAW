const User = require("./userModel");
const Patient = require("./patientModel");
const Doctor = require("./doctorModel");
const HorarioAtencion = require("./HorarioAtencionModel");
const Cita = require("./CitaModel");
const Diagnostico = require("./DiagnosticoModel");
const Receta = require("./RecetaModel");
const Enfermedad = require("./EnfermedadModel");
const Medicamento = require("./MedicamentoModel");
const MedicamentoEnfermedad = require("./MedicamentoEnfermedadModel");

// Definir asociaciones de herencia
User.hasOne(Doctor, {
  foreignKey: "usuario_id",
  as: "doctor",
  onDelete: "CASCADE",
  hooks: true,
});

Doctor.belongsTo(User, {
  foreignKey: "usuario_id",
  as: "usuario",
  onDelete: "CASCADE",
  hooks: true,
});

User.hasOne(Patient, {
  foreignKey: "usuario_id",
  as: "paciente",
  onDelete: "CASCADE",
  hooks: true,
});

Patient.belongsTo(User, {
  foreignKey: "usuario_id",
  as: "usuario",
  onDelete: "CASCADE",
  hooks: true,
});

// Asociaciones Doctor-Patient
Doctor.hasMany(Patient, {
  foreignKey: "doctor_id",
  as: "pacientes",
  onDelete: "SET NULL",
});

Patient.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  as: "doctorGeneral",
  onDelete: "SET NULL",
});

// Asociaciones Doctor-HorarioAtencion
Doctor.hasMany(HorarioAtencion, {
  foreignKey: "doctor_id",
  as: "horarios",
  onDelete: "CASCADE",
});

HorarioAtencion.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});

// Asociaciones Patient-Cita
Patient.hasMany(Cita, {
  foreignKey: "paciente_id",
  as: "citas",
  onDelete: "CASCADE",
});

Cita.belongsTo(Patient, {
  foreignKey: "paciente_id",
  onDelete: "CASCADE",
});

// Asociaciones Doctor-Cita
Doctor.hasMany(Cita, {
  foreignKey: "doctor_id",
  as: "citas",
  onDelete: "CASCADE",
});

Cita.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});

// Asociaciones HorarioAtencion-Cita
HorarioAtencion.belongsToMany(Cita, {
  through: "horario_cita",
  foreignKey: "horario_id",
  otherKey: "cita_id",
  as: "citas",
  onDelete: "CASCADE",
});

Cita.belongsToMany(HorarioAtencion, {
  through: "horario_cita",
  foreignKey: "cita_id",
  otherKey: "horario_id",
  as: "horarios",
  onDelete: "CASCADE",
});

// Asociaciones Cita-Diagnostico
Cita.hasOne(Diagnostico, {
  foreignKey: "cita_id",
  as: "diagnostico",
  onDelete: "CASCADE",
});

Diagnostico.belongsTo(Cita, {
  foreignKey: "cita_id",
  onDelete: "CASCADE",
});

// Asociaciones Doctor-Diagnostico
Doctor.hasMany(Diagnostico, {
  foreignKey: "doctor_id",
  as: "diagnosticos",
  onDelete: "CASCADE",
});

Diagnostico.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});

// Asociaciones Diagnostico-Enfermedad
Diagnostico.belongsToMany(Enfermedad, {
  through: "diagnostico_enfermedad",
  foreignKey: "diagnostico_id",
  otherKey: "enfermedad_id",
  as: "enfermedades",
  onDelete: "CASCADE",
});

Enfermedad.belongsToMany(Diagnostico, {
  through: "diagnostico_enfermedad",
  foreignKey: "enfermedad_id",
  otherKey: "diagnostico_id",
  as: "diagnosticos",
  onDelete: "CASCADE",
});

// Asociaciones Enfermedad-Medicamento
// Asociaciones Enfermedad-Medicamento
Medicamento.belongsToMany(Enfermedad, {
  through: MedicamentoEnfermedad,
  foreignKey: "id_medicamento",
  otherKey: "id_enfermedad",
  as: "enfermedades",
  onDelete: "CASCADE"
});

Enfermedad.belongsToMany(Medicamento, {
  through: MedicamentoEnfermedad,
  foreignKey: "id_enfermedad",
  otherKey: "id_medicamento",
  as: "medicamentos",
  onDelete: "CASCADE"
});


// Asociaciones Diagnostico-Receta
Diagnostico.hasMany(Receta, {
  foreignKey: "diagnostico_id",
  as: "recetas",
  onDelete: "CASCADE",
});

Receta.belongsTo(Diagnostico, {
  foreignKey: "diagnostico_id",
  onDelete: "CASCADE",
});

// Asociaciones Medicamento-Receta
Medicamento.hasMany(Receta, {
  foreignKey: "medicamento_id",
  as: "recetas",
  onDelete: "CASCADE",
});

Receta.belongsTo(Medicamento, {
  foreignKey: "medicamento_id",
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
  MedicamentoEnfermedad
};
