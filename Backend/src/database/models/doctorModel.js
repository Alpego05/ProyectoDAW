const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Doctor extends Model {
        static associate(models) {
            Doctor.belongsTo(models.User, { foreignKey: 'userId' });
            Doctor.hasMany(models.Patient, { foreignKey: 'doctorId' });
        }
    }

    Doctor.init({
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
        specialty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        licenseNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        consultationFee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        education: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        experience: {
            type: DataTypes.INTEGER, 
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
        modelName: 'Doctor'
    });

    return Doctor;
};