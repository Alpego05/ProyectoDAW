const User = require('./UserModel');
const Patient = require('./patientModel');
const Doctor = require('./doctorModel');
const HorarioAtencion = require('./HorarioAtencionModel');
const Cita = require('./CitaModel');
const Diagnostico = require('./DiagnosticoModel');
const Receta = require('./RecetaModel');
const Enfermedad = require('./EnfermedadModel');
const Medicamento = require('./MedicamentoModel');

// Definir asociaciones

// Asociaciones User-Doctor
User.hasOne(Doctor, { foreignKey: 'id_usuario', as: 'doctor' });
Doctor.belongsTo(User, { foreignKey: 'id_usuario' });

// Asociaciones User-Patient
User.hasOne(Patient, { foreignKey: 'id_usuario', as: 'paciente' });
Patient.belongsTo(User, { foreignKey: 'id_usuario' });

// Asociaciones Doctor-Patient
Doctor.hasMany(Patient, { foreignKey: 'id_doctor_general', as: 'pacientes' });
Patient.belongsTo(Doctor, { foreignKey: 'id_doctor_general', as: 'doctorGeneral' });

// Asociaciones Doctor-HorarioAtencion
Doctor.hasMany(HorarioAtencion, { foreignKey: 'id_doctor', as: 'horarios' });
HorarioAtencion.belongsTo(Doctor, { foreignKey: 'id_doctor' });

// Asociaciones Patient-Cita
Patient.hasMany(Cita, { foreignKey: 'id_paciente', as: 'citas' });
Cita.belongsTo(Patient, { foreignKey: 'id_paciente' });

// Asociaciones Doctor-Cita
Doctor.hasMany(Cita, { foreignKey: 'id_doctor', as: 'citas' });
Cita.belongsTo(Doctor, { foreignKey: 'id_doctor' });

// Asociaciones HorarioAtencion-Cita
HorarioAtencion.belongsToMany(Cita, {
  through: 'horario_cita',
  foreignKey: 'id_horario',
  otherKey: 'id_cita',
  as: 'citas'
});
Cita.belongsToMany(HorarioAtencion, {
  through: 'horario_cita',
  foreignKey: 'id_cita',
  otherKey: 'id_horario',
  as: 'horarios'
});

// Asociaciones Cita-Diagnostico
Cita.hasOne(Diagnostico, { foreignKey: 'id_cita', as: 'diagnostico' });
Diagnostico.belongsTo(Cita, { foreignKey: 'id_cita' });

// Asociaciones Doctor-Diagnostico
Doctor.hasMany(Diagnostico, { foreignKey: 'id_doctor', as: 'diagnosticos' });
Diagnostico.belongsTo(Doctor, { foreignKey: 'id_doctor' });

// Asociaciones Diagnostico-Enfermedad
Diagnostico.belongsToMany(Enfermedad, {
  through: 'diagnostico_enfermedad',
  foreignKey: 'id_diagnostico',
  otherKey: 'id_enfermedad',
  as: 'enfermedades'
});
Enfermedad.belongsToMany(Diagnostico, {
  through: 'diagnostico_enfermedad',
  foreignKey: 'id_enfermedad',
  otherKey: 'id_diagnostico',
  as: 'diagnosticos'
});

// Asociaciones Enfermedad-Medicamento
Enfermedad.belongsToMany(Medicamento, {
  through: 'enfermedad_medicamento',
  foreignKey: 'id_enfermedad',
  otherKey: 'id_medicamento',
  as: 'medicamentos'
});
Medicamento.belongsToMany(Enfermedad, {
  through: 'enfermedad_medicamento',
  foreignKey: 'id_medicamento',
  otherKey: 'id_enfermedad',
  as: 'enfermedades'
});

// Asociaciones Diagnostico-Receta
Diagnostico.hasMany(Receta, { foreignKey: 'id_diagnostico', as: 'recetas' });
Receta.belongsTo(Diagnostico, { foreignKey: 'id_diagnostico' });

// Asociaciones Medicamento-Receta
Medicamento.hasMany(Receta, { foreignKey: 'id_medicamento', as: 'recetas' });
Receta.belongsTo(Medicamento, { foreignKey: 'id_medicamento' });

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