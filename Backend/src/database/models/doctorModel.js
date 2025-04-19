const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Doctor extends Model {
        static associate(models) {
            Doctor.belongsTo(models.User, { foreignKey: 'userId' });
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
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Doctor'
    });

    return Doctor;
};