const sequelize = require('./dbConfig');

// Importa los modelos
const User = require('./models/userModel')(sequelize);
const Doctor = require('./models/doctorModel')(sequelize);
const Patient = require('./models/patientModel')(sequelize);

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

