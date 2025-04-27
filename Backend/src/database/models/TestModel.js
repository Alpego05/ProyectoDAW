const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Test extends Model {
  static associate(models) {
    Test.belongsToMany(models.Diagnosis, {
      through: 'diagnostico_prueba',
      foreignKey: 'id_prueba',
      otherKey: 'id_diagnostico',
      as: 'diagnoses'
    });
  }
}

Test.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    result: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    labNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Test',
    tableName: 'tests',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Test;
