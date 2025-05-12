const registerService = require("../services/registerService")
const sequelize = require("../database/dbConfig")

const registerPatient = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const user = req.body.user
    const patient = req.body.patient

    if (!user || !patient) {
      await t.rollback()
      return res.status(400).json({
        success: false,
        message: "Datos incompletos para el registro del paciente",
      })
    }

    const { email, dni } = user
    const existing = await registerService.checkUserExistence(email, dni)
    if (existing) {
      await t.rollback()
      return res.status(400).json({
        success: false,
        message: "El email o DNI ya están registrados",
      })
    }

    // Pasar la transacción a la función de registro en el servicio
    const result = await registerService.registerPatient(user, patient, t)

    await t.commit() // Confirmar la transacción

    return res.status(201).json({
      success: true,
      message: "Paciente registrado exitosamente. Se ha enviado un correo para establecer la contraseña.",
      data: result,
    })
  } catch (error) {
    await t.rollback() // Revertir en caso de error
    return res.status(500).json({
      success: false,
      message: "Error al registrar paciente",
      error: error.message,
    })
  }
}

const registerDoctor = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const { user, doctor } = req.body

    if (!user || !doctor) {
      await t.rollback()
      return res.status(400).json({
        success: false,
        message: "Datos incompletos para el registro del doctor",
      })
    }

    const { email, dni } = user
    const existing = await registerService.checkUserExistence(email, dni)
    if (existing) {
      await t.rollback()
      return res.status(400).json({
        success: false,
        message: "El email o DNI ya están registrados",
      })
    }

    const result = await registerService.registerDoctor(user, doctor, t)
    await t.commit()

    return res.status(201).json({
      success: true,
      message: "Doctor registrado exitosamente. Se ha enviado un correo para establecer la contraseña.",
      data: result,
    })
  } catch (error) {
    await t.rollback()
    return res.status(500).json({
      success: false,
      message: "Error al registrar doctor",
      error: error.message,
    })
  }
}

module.exports = {
  registerPatient,
  registerDoctor,
}
