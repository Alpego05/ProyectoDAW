const Patient = require('../database/models/patientModel');
const User = require('../database/models/UserModel');

// Obtener todos los pacientes
const getAllPatients = async () => {
    try {
        return await Patient.findAll( );


    } catch (error) {
        throw new Error(`Error al obtener pacientes: ${error.message}`);
    }
};

// Obtener un paciente por ID
const getPatientById = async (id) => {
    try {
        const patient = await Patient.findByPk(id);

        if (!patient) {
            throw new Error('Paciente no encontrado');
        }

        return patient;
    } catch (error) {
        throw new Error(`Error al obtener el paciente: ${error.message}`);
    }
};

/*
// Crear un nuevo paciente
const createPatient = async (patientData) => {
    try {
        const { id_paciente, genero, direccion, telefono, tipo_sangre, alergias } = patientData;

        // Validar campos requeridos
        if (!id_paciente || !genero || !direccion || !telefono) {
            const error = new Error('Faltan campos requeridos para el paciente');
            error.statusCode = 400;
            throw error;
        }

        // Verificar que el usuario existe
        const userExists = await User.findByPk(id_paciente);
        if (!userExists) {
            const error = new Error('El usuario asociado no existe');
            error.statusCode = 404;
            throw error;
        }

        // Verificar que el paciente no existe ya
        const existingPatient = await Patient.findByPk(id_paciente);
        if (existingPatient) {
            const error = new Error('El paciente ya está registrado');
            error.statusCode = 409; // Conflict
            throw error;
        }

        // Crear nuevo paciente
        const newPatient = await Patient.create({
            id_paciente,
            genero,
            direccion,
            telefono,
            tipo_sangre: tipo_sangre || null,
            alergias: alergias || null
        });

        return newPatient;
    } catch (error) {
        // Add status code if not already present
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};
*/

// Actualizar un paciente
const updatePatient = async (id, patientData) => {
    try {
        const patient = await Patient.findByPk(id);

        if (!patient) {
            throw new Error('Paciente no encontrado');
        }

        const { genero, direccion, telefono, tipo_sangre, alergias } = patientData;

        // Actualizar campos si existen en la solicitud
        if (genero) patient.genero = genero;
        if (direccion) patient.direccion = direccion;
        if (telefono) patient.telefono = telefono;
        if (tipo_sangre !== undefined) patient.tipo_sangre = tipo_sangre;
        if (alergias !== undefined) patient.alergias = alergias;

        await patient.save();

        return patient;
    } catch (error) {
        throw new Error(`Error al actualizar el paciente: ${error.message}`);
    }
};

// Eliminar un paciente
const deletePatient = async (id) => {
    try {
        const patient = await Patient.findByPk(id);

        if (!patient) {
            throw new Error('Paciente no encontrado');
        }

        await patient.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar el paciente: ${error.message}`);
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
};