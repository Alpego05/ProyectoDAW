const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(
    'MediNet',
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        
    host: 'localhost',
    dialect: 'mysql',


    define: {
        timestamps: true,
        underscored: false,
        freezeTableName: false
    },

    logging: false
});

module.exports = sequelize;
