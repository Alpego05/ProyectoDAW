const sequelize = require('./dbConfig');

// Importa los modelos
const User = require('./models/UserModel');
const Doctor = require('./models/DoctorModel');
const Patient = require('./models/PatientModel');

// Define las asociaciones
User.associate({ Doctor, Patient });
Doctor.associate({ User });
Patient.associate({ User });

// Exporta los modelos y Sequelize
module.exports = {
    sequelize,
    User,
    Doctor,
    Patient
};

