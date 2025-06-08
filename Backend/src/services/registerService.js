const { User, Patient, Doctor } = require("../database/models/associations");
const bcrypt = require("bcrypt");
const sequelize = require("../database/dbConfig");
const { Op } = require("sequelize");
const { sendWelcomeEmail } = require("./../utils/mailer");
const Horario = require('../database/models/HorarioAtencionModel');


const checkUserExistence = async (email, dni) => {
  return await User.findOne({
    where: {
      [Op.or]: [{ email }, { dni }],
    },
  });
};


const createDefaultSchedule = async (doctorId, transaction) => {
  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  const horariosData = [];

  for (const dia_semana of diasSemana) {
    horariosData.push({
      doctor_id: doctorId,
      dia_semana,
      hora_inicio: '08:00:00',
      hora_fin: '14:00:00',
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  await Horario.bulkCreate(horariosData, { transaction });
};



const registerPatient = async (userData, patientData, transaction) => {
  const t = transaction || await sequelize.transaction();

  try {
    const { nombre, apellido1, apellido2, email, dni } = userData;
    const { genero, fecha_nacimiento, direccion, telefono, tipo_sangre, alergias } = patientData;

    // Generar una contraseña temporal aleatoria
    const tempPassword = Math.random().toString(36).slice(-10);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = await User.create(
      {
        nombre,
        apellido1,
        apellido2,
        email,
        clave: hashedPassword,
        dni,
        tipo_usuario: "paciente", 
      },
      { transaction: t }
    );

    // Crear el paciente y asignar el ID del usuario
    const newPatient = await Patient.create(
      {
        usuario_id: newUser.id,
        genero,
        fecha_nacimiento,
        direccion,
        telefono,
        tipo_sangre,
        alergias,
        created_at: new Date(),
        updated_at: new Date()
      },
      { transaction: t }
    );

    if (!transaction) {
      await t.commit();
    }

    try {
      // Pasar la contraseña temporal al correo
      await sendWelcomeEmail(newUser, tempPassword);
    } catch (emailError) {
      console.error("Error al enviar correo:", emailError.message);
      // No lanzamos error aquí para no revertir la transacción si el correo falla
    }

    const userResponse = newUser.toJSON();
    delete userResponse.clave;

    return { user: userResponse, patient: newPatient };
  } catch (error) {
    // Si no se proporcionó una transacción externa, revertir la transacción
    if (!transaction) {
      await t.rollback();
    }
    throw error;
  }
};


const registerDoctor = async (userData, doctorData, transaction) => {
  const t = transaction || await sequelize.transaction();
  
  try {
    const { nombre, apellido1, apellido2, email, dni } = userData;
    const { especialidad, sala_asignada, numero_licencia } = doctorData;

    // Generar una contraseña temporal aleatoria
    const tempPassword = Math.random().toString(36).slice(-10);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = await User.create(
      {
        nombre,
        apellido1,
        apellido2,
        email,
        clave: hashedPassword,
        dni,
        tipo_usuario: "doctor", 
      },
      { transaction: t }
    );

    const newDoctor = await Doctor.create(
      {
        usuario_id: newUser.id,
        especialidad,
        sala_asignada,
        numero_licencia,
        created_at: new Date(),
        updated_at: new Date()
      },
      { transaction: t }
    );

    // Crear horarios por defecto para el doctor
    try {
      await createDefaultSchedule(newUser.id, t);
    } catch (scheduleError) {
      console.error("Error al crear horarios por defecto:", scheduleError.message);
      throw new Error(`Error al crear horarios por defecto: ${scheduleError.message}`);
    }

    if (!transaction) {
      await t.commit();
    }

    try {
      // Pasar la contraseña temporal al correo
      await sendWelcomeEmail(newUser, tempPassword);
    } catch (emailError) {
      console.error("Error al enviar correo:", emailError.message);
    
    }

    const userResponse = newUser.toJSON();
    delete userResponse.clave;

    return { user: userResponse, doctor: newDoctor };
  } catch (error) {
    if (!transaction) {
      await t.rollback();
    }
    throw error;
  }
};

module.exports = {
  checkUserExistence,
  registerPatient,
  registerDoctor,
};