const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");


// registrar un paciente
router.post('/patient', registerController.registerPatient);

// registrar un doctor
router.post('/doctor', verifyToken,  registerController.registerDoctor);

module.exports = router;