const Doctor = require('../database/models/doctorModel');
const User = require('../database/models/userModel');

const getAllDoctors = async () => {
    return await Doctor.findAll();
};

const getDoctorById = async (id) => {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) throw new Error('Doctor no encontrado');
    return doctor;
};

const getDoctorsBySpecialty = async (especialidad) => {
    return await Doctor.findAll({ where: { especialidad } });
};

const updateDoctor = async (id, data) => {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) throw new Error('Doctor no encontrado');

    const { especialidad, sala_asignada } = data;
    if (especialidad) doctor.especialidad = especialidad;
    if (sala_asignada) doctor.sala_asignada = sala_asignada;

    await doctor.save();
    return doctor;
};

const deleteDoctor = async (id) => {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) throw new Error('Doctor no encontrado');
    await doctor.destroy();
};

module.exports = {
    getAllDoctors,
    getDoctorById,
    getDoctorsBySpecialty,
    updateDoctor,
    deleteDoctor
};
