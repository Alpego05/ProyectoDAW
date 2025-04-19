const { Sequelize } = require('sequelize');
const config = require('../dbConfig');

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  {
    host: config.host,
    dialect: config.dialect,
    logging: false 
  }
);

// Importar los modelos
const UserModel = require('./models/userModel')(sequelize);
const DoctorModel = require('./models/doctorModel')(sequelize);
const PatientModel = require('./models/patientModel')(sequelize);

// Definir las asociaciones entre modelos
const models = {
  User: UserModel,
  Doctor: DoctorModel,
  Patient: PatientModel
};

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};