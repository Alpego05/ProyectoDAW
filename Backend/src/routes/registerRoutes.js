const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// registrar un paciente
router.post('/patient', registerController.registerPatient);

// registrar un doctor
router.post('/doctor', registerController.registerDoctor);

module.exports = router;