const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre_db', 'usuario', 'contraseña', {
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
