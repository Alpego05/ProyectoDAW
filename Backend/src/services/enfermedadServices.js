const Enfermedad = require('../database/models/EnfermedadModel');

// Obtener todas las enfermedades
const getAllEnfermedades = async () => {
    try {
        return await Enfermedad.findAll();
    } catch (error) {
        throw new Error(`Error al obtener las enfermedades: ${error.message}`);
    }
};

// Obtener una enfermedad por ID
const getEnfermedadById = async (id) => {
    try {
        const enfermedad = await Enfermedad.findByPk(id);
        if (!enfermedad) {
            throw new Error('Enfermedad no encontrada');
        }
        return enfermedad;
    } catch (error) {
        throw new Error(`Error al obtener la enfermedad: ${error.message}`);
    }
};

// Crear una nueva enfermedad
const createEnfermedad = async (enfermedadData) => {
    try {
        const { nombre, sintomas, codigo_cie } = enfermedadData;

        // Validar que los campos obligatorios estén presentes
        if (!nombre || !codigo_cie) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }

        // Crear la enfermedad
        const newEnfermedad = await Enfermedad.create({
            nombre,
            sintomas,
            codigo_cie
        });

        return newEnfermedad;
    } catch (error) {
        throw new Error(`Error al crear la enfermedad: ${error.message}`);
    }
};

// Actualizar una enfermedad
const updateEnfermedad = async (id, enfermedadData) => {
    try {
        const enfermedad = await Enfermedad.findByPk(id);

        if (!enfermedad) {
            throw new Error('Enfermedad no encontrada');
        }

        // Actualizar los campos si están presentes
        const { nombre, sintomas, codigo_cie } = enfermedadData;

        if (nombre) enfermedad.nombre = nombre;
        if (sintomas) enfermedad.sintomas = sintomas;
        if (codigo_cie) enfermedad.codigo_cie = codigo_cie;

        await enfermedad.save();

        return enfermedad;
    } catch (error) {
        throw new Error(`Error al actualizar la enfermedad: ${error.message}`);
    }
};

// Eliminar una enfermedad
const deleteEnfermedad = async (id) => {
    try {
        const enfermedad = await Enfermedad.findByPk(id);

        if (!enfermedad) {
            throw new Error('Enfermedad no encontrada');
        }

        await enfermedad.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar la enfermedad: ${error.message}`);
    }
};

module.exports = {
    getAllEnfermedades,
    getEnfermedadById,
    createEnfermedad,
    updateEnfermedad,
    deleteEnfermedad
};
