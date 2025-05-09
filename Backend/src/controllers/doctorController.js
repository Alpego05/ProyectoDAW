const doctorService = require('../services/doctorServices');

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json(doctors);  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const doctor = await doctorService.getDoctorById(req.params.id);
        res.status(200).json(doctor);  
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const getDoctorsBySpecialty = async (req, res) => {
    try {
        const doctors = await doctorService.getDoctorsBySpecialty(req.params.especialidad);
        res.status(200).json(doctors);  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await doctorService.updateDoctor(req.params.id, req.body);
        res.status(200).json(updatedDoctor);  
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        await doctorService.deleteDoctor(req.params.id);
        res.status(204).send();  
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllDoctors,
    getDoctorById,
    getDoctorsBySpecialty,
    updateDoctor,
    deleteDoctor
};
