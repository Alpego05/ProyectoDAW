const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Patient extends Model {
        static associate(models) {
            Patient.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }

    Patient.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        medicalHistory: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Patient'
    });

    return Patient;
};