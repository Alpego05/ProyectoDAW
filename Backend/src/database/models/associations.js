const User = require("./UserModel");
const Patient = require("./PatientModel");
const Doctor = require("./DoctorModel");
const HorarioAtencion = require("./HorarioAtencionModel");
const Cita = require("./CitaModel");
const Diagnostico = require("./DiagnosticoModel");
const Receta = require("./RecetaModel");
const Enfermedad = require("./EnfermedadModel");
const Medicamento = require("./MedicamentoModel");
const MedicamentoEnfermedad = require("./MedicamentoEnfermedadModel");

// Herencia
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

Receta.belongsTo(Medicamento, {
  foreignKey: "medicamento_id",
  as: "medicamento",
  onDelete: "SET NULL",
});

Receta.belongsTo(Enfermedad, {
  foreignKey: 'id_enfermedad',
  as: 'enfermedad'
});

Enfermedad.hasMany(Receta, {
  foreignKey: 'id_enfermedad',
  as: 'recetas'
});



Medicamento.hasMany(Receta, {
  foreignKey: "medicamento_id",
  as: "recetas",
  onDelete: "SET NULL",
});

// Doctor - Patient
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

// Doctor - HorarioAtencion
Doctor.hasMany(HorarioAtencion, {
  foreignKey: "doctor_id",
  as: "horarios",
  onDelete: "CASCADE",
});
HorarioAtencion.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});

// Patient - Cita
Patient.hasMany(Cita, {
  foreignKey: "paciente_id",
  as: "citas",
  onDelete: "CASCADE",
});
Cita.belongsTo(Patient, {
  foreignKey: "paciente_id",
  onDelete: "CASCADE",
});

// Doctor - Cita
Doctor.hasMany(Cita, {
  foreignKey: "doctor_id",
  as: "citas",
  onDelete: "CASCADE",
});
Cita.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});

// Doctor - Diagnostico
Doctor.hasMany(Diagnostico, {
  foreignKey: "doctor_id",
  as: "diagnosticos",
  onDelete: "CASCADE",
});
Diagnostico.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});

// Diagnostico - Enfermedad (1:1)
Diagnostico.belongsTo(Enfermedad, {
  foreignKey: "enfermedad_id",
  as: "enfermedad",
  onDelete: "CASCADE",
});
Enfermedad.hasMany(Diagnostico, {
  foreignKey: "enfermedad_id",
  as: "diagnosticos",
  onDelete: "CASCADE",
});

// Enfermedad - Medicamento (N:M)
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

