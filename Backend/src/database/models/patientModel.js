const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbConfig');

class Patient extends Model {
  static associate(models) {
    Patient.belongsTo(models.User, { foreignKey: 'userId' });
    Patient.hasMany(models.Appointment, { foreignKey: 'patientId' });
    Patient.hasOne(models.MedicalHistory, { foreignKey: 'patientId' });
  }
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_paciente'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_usuario',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'fecha_nacimiento',
      validate: {
        isDate: {
          msg: 'La fecha de nacimiento debe ser una fecha válida'
        },
        isBefore: {
          args: new Date().toISOString().split('T')[0],
          msg: 'La fecha de nacimiento no puede ser posterior a hoy'
        }
      }
    },
    gender: {
      type: DataTypes.ENUM('M', 'F', 'Otro'),
      allowNull: false,
      field: 'genero',
      validate: {
        isIn: {
          args: [['M', 'F', 'Otro']],
          msg: "El género debe ser 'M', 'F' u 'Otro'"
        }
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'direccion'
    },
    bloodType: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'grupo_sanguineo',
      validate: {
        isIn: {
          args: [['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']],
          msg: 'El grupo sanguíneo no es válido'
        }
      }
    },
    medicalInsurance: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'seguro_medico'
    }
  },
  {
    sequelize,
    modelName: 'Patient',
    tableName: 'pacientes',
    timestamps: false
  }
);

module.exports = Patient;