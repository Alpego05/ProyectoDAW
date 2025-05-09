const { User, Patient, Doctor } = require('../database/models/associations');
const bcrypt = require('bcrypt');
const sequelize = require('../database/dbConfig');
const { Op } = require('sequelize'); 

// email o dni
const checkUserExistence = async (email, dni) => {
  return await User.findOne({
    where: {
      [Op.or]: [{ email }, { dni }]  
    }
  });
};


// Registrar paciente
const registerPatient = async (userData, patientData) => {
    const t = await sequelize.transaction();
    
    try {
      const { nombre, apellido1, apellido2, email, password, dni } = userData;
      const { genero, direccion, telefono, tipo_sangre, alergias } = patientData;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        nombre,
        apellido1,
        apellido2,
        email,
        clave: hashedPassword,
        dni,
        role: 'paciente'
      }, { transaction: t });
  
      const newPatient = await Patient.create({
        id_paciente: dni,
        genero,
        direccion,
        telefono,
        tipo_sangre,
        alergias
      }, { transaction: t });
  
      await t.commit();
      
      const userResponse = newUser.toJSON();
      delete userResponse.clave;
      
      return { user: userResponse, patient: newPatient };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };
  



// Registrar doctor
const registerDoctor = async (userData, doctorData, transaction) => {
  const { nombre, apellido1, apellido2, email, password, dni } = userData;
  const { especialidad, sala_asignada } = doctorData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    nombre,
    apellido1,
    apellido2,
    email,
    clave: hashedPassword,
    dni,
    role: 'doctor'
  }, { transaction });

  const newDoctor = await Doctor.create({
    id_doctor: dni,
    especialidad,
    sala_asignada
  }, { transaction });

  return { newUser, newDoctor };
};

module.exports = {
  checkUserExistence,
  registerPatient,
  registerDoctor
};
