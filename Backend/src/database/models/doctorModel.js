const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Doctor extends Model {
  static associate(models) {
    Doctor.belongsTo(models.User, { foreignKey: 'id_doctor', targetKey: 'dni', as: 'usuario' });
    Doctor.hasMany(models.HorarioAtencion, { foreignKey: 'id_doctor', as: 'horarios' });
    Doctor.hasMany(models.Cita, { foreignKey: 'id_doctor', as: 'citas' });
  }
}

Doctor.init(
  {
    id_doctor: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'dni'
      }
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sala_asignada: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'Doctor',
    tableName: 'doctores',
    timestamps: true,
    underscored: true
  }
);

module.exports = Doctor;
