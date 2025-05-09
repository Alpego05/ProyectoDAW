const Medicamento = require('../database/models/MedicamentoModel');
const db = require('../database/models/associations');

// Obtener todos los medicamentos
const getAllMedicamentos = async () => {
    try {
        return await Medicamento.findAll();
    } catch (error) {
        throw new Error(`Error al obtener los medicamentos: ${error.message}`);
    }
};

// Obtener un medicamento por ID
const getMedicamentoById = async (id) => {
    try {
        const medicamento = await Medicamento.findByPk(id);
        
        if (!medicamento) {
            throw new Error('Medicamento no encontrado');
        }
        
        return medicamento;
    } catch (error) {
        throw new Error(`Error al obtener el medicamento: ${error.message}`);
    }
};

// Crear un nuevo medicamento
const createMedicamento = async (medicamentoData) => {
    try {
        const { nombre, efectos_secundarios, forma_via } = medicamentoData;

        // Validar que los campos obligatorios estén presentes
        if (!nombre || !forma_via) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }

        // Crear el medicamento
        const newMedicamento = await Medicamento.create({
            nombre,
            efectos_secundarios,
            forma_via
        });

        return newMedicamento;
    } catch (error) {
        throw new Error(`Error al crear el medicamento: ${error.message}`);
    }
};

// Actualizar un medicamento
const updateMedicamento = async (id, medicamentoData) => {
    try {
        const medicamento = await Medicamento.findByPk(id);
        
        if (!medicamento) {
            throw new Error('Medicamento no encontrado');
        }
        
        const { nombre, efectos_secundarios, forma_via } = medicamentoData;
        
        // Actualizar los campos si están presentes
        if (nombre) medicamento.nombre = nombre;
        if (efectos_secundarios) medicamento.efectos_secundarios = efectos_secundarios;
        if (forma_via) medicamento.forma_via = forma_via;

        await medicamento.save();

        return medicamento;
    } catch (error) {
        throw new Error(`Error al actualizar el medicamento: ${error.message}`);
    }
};

// Eliminar un medicamento
const deleteMedicamento = async (id) => {
    try {
        const medicamento = await Medicamento.findByPk(id);

        if (!medicamento) {
            throw new Error('Medicamento no encontrado');
        }

        await medicamento.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar el medicamento: ${error.message}`);
    }
};



module.exports = {
    getAllMedicamentos,
    getMedicamentoById,
    createMedicamento,
    updateMedicamento,
    deleteMedicamento
};
