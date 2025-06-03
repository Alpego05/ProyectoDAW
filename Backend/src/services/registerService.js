const { User, Patient, Doctor } = require("../database/models/associations");
const bcrypt = require("bcrypt");
const sequelize = require("../database/dbConfig");
const { Op } = require("sequelize");
const { sendWelcomeEmail } = require("./../utils/mailer");

// email o dni no se pueden repetir ninguno
const checkUserExistence = async (email, dni) => {
  return await User.findOne({
    where: {
      [Op.or]: [{ email }, { dni }],
    },
  });
};

// Registrar paciente
const registerPatient = async (userData, patientData, transaction) => {
  const t = transaction || (await sequelize.transaction());

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
        role: "paciente",
        tipo_usuario: "paciente", 
      },
      { transaction: t }
    );

    // Crear el paciente y asignar el ID del usuario
    const newPatient = await Patient.create(
      {
        id_paciente: dni,
        usuario_id: newUser.id,
        genero,
        fecha_nacimiento,
        direccion,
        telefono,
        tipo_sangre,
        alergias,
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
      throw new Error(`Error al enviar correo de bienvenida: ${emailError.message}`);
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

// Registrar doctor
const registerDoctor = async (userData, doctorData, transaction) => {
  const t = transaction || (await sequelize.transaction());
  
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
        role: "doctor",
        tipo_usuario: "doctor", 
      },
      { transaction: t }
    );

    const newDoctor = await Doctor.create(
      {
        id_doctor: dni,
        usuario_id: newUser.id,
        especialidad,
        sala_asignada,
        numero_licencia
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
      throw new Error(`Error al enviar correo de bienvenida: ${emailError.message}`);
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