const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Patient extends Model {
        static associate(models) {
            Patient.belongsTo(models.User, { foreignKey: 'userId' });
            Patient.belongsTo(models.Doctor, { foreignKey: 'doctorId', as: 'primaryDoctor' });
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
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Doctors',
                key: 'id'
            }
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        bloodType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        allergies: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        medicalHistory: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        emergencyContact: {
            type: DataTypes.STRING,
            allowNull: true
        },
        insuranceInfo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Patient'
    });

    return Patient;
};