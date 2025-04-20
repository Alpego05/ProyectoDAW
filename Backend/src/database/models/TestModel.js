const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../dbConfig');

class Test extends Model {
  static associate(models) {
    Test.belongsToMany(models.Diagnosis, { 
      through: 'diagnostico_prueba', 
      foreignKey: 'id_prueba',
      otherKey: 'id_diagnostico'
    });
  }
}

Test.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_prueba'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nombre',
      validate: {
        notEmpty: {
          msg: 'El nombre de la prueba no puede estar vacío'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'descripcion'
    },
    requiresFasting: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'requiere_ayuno'
    },
    resultTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'tiempo_resultados',
      comment: 'Tiempo estimado en días'
    }
  },
  {
    sequelize,
    modelName: 'Test',
    tableName: 'pruebas',
    timestamps: false
  }
);

module.exports = Test;