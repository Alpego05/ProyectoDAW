"use client"

import { useState, useEffect } from "react"
import useFormat from "./useFormat"

import { getUserById } from "./../services/apiUser"
import { getPatientById } from "./../services/apiPatient"
import { getDoctorById } from "./../services/apiDoctor"
import { getCitasByPatient, getCitasByDoctor, getAllCitas } from "./../services/apiCitas"
import { getDiagnosticosByPacienteId, getAllDiagnosticos } from "./../services/apiDiagnosticos"
import { getRecetasByPacienteId, getAllRecetas } from "./../services/apiRecetas"
import { getAllUsers } from "./../services/apiUser"

export const useUsuarios = () => {
  const [usuario, setUsuario] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarUsuario = async (userId) => {
    if (!userId) {
      setError("No se encontró ID de usuario")
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const datosUsuario = await getUserById(userId)
      setUsuario(datosUsuario)
    } catch (err) {
      console.error("Error al obtener usuario:", err)
      setError(err instanceof Error ? err.message : "Error desconocido al obtener usuario")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      cargarUsuario(userId)
    } else {
      setError("No se encontró el ID del usuario en localStorage")
      setIsLoading(false)
    }
  }, [])

  return {
    usuario,
    isLoading,
    error,
    cargarUsuario,
  }
}

export const usePacientes = () => {
  const [paciente, setPaciente] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarPaciente = async (pacienteId) => {
    if (!pacienteId) {
      setError("No se proporcionó ID de paciente")
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const datosPaciente = await getPatientById(pacienteId)
      setPaciente(datosPaciente)
    } catch (err) {
      console.error("Error al obtener paciente:", err)
      setError(err instanceof Error ? err.message : "Error desconocido al obtener paciente")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const userRole = localStorage.getItem("rol")

    if (userId && userRole === "paciente") {
      cargarPaciente(userId)
    } else {
      setIsLoading(false)
    }
  }, [])

  return {
    paciente,
    isLoading,
    error,
    cargarPaciente,
  }
}

export const useDoctores = () => {
  const [doctor, setDoctor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarDoctor = async (doctorId) => {
    if (!doctorId) {
      setError("No se proporcionó ID de doctor")
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const datosDoctor = await getDoctorById(doctorId)
      setDoctor(datosDoctor)
    } catch (err) {
      console.error("Error al obtener doctor:", err)
      setError(err instanceof Error ? err.message : "Error desconocido al obtener doctor")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const userRole = localStorage.getItem("rol")

    if (userId && userRole === "doctor") {
      cargarDoctor(userId)
    } else {
      setIsLoading(false)
    }
  }, [])

  return {
    doctor,
    isLoading,
    error,
    cargarDoctor,
  }
}

export const useAdmin = () => {
  const [usuarios, setUsuarios] = useState([])
  const [doctores, setDoctores] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [citas, setCitas] = useState([])
  const [diagnosticos, setDiagnosticos] = useState([])
  const [recetas, setRecetas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarDatos = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Cargar todos los datos necesarios para el administrador
      const [todosUsuarios, todasCitas, todosDiagnosticos, todasRecetas] = await Promise.all([
        getAllUsers(),
        getAllCitas(),
        getAllDiagnosticos(),
        getAllRecetas(),
      ])

      setUsuarios(todosUsuarios)

      // Filtrar usuarios por tipo
      const doctoresData = todosUsuarios.filter((user) => user.tipo_usuario === "doctor")
      const pacientesData = todosUsuarios.filter((user) => user.tipo_usuario === "paciente")

      setDoctores(doctoresData)
      setPacientes(pacientesData)
      setCitas(todasCitas)
      setDiagnosticos(todosDiagnosticos)
      setRecetas(todasRecetas)
    } catch (err) {
      console.error("Error al obtener datos de administrador:", err)
      setError(err instanceof Error ? err.message : "Error desconocido al obtener datos")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const userRole = localStorage.getItem("rol")

    if (userRole === "admin") {
      cargarDatos()
    } else {
      setIsLoading(false)
    }
  }, [])

  return {
    usuarios,
    doctores,
    pacientes,
    citas,
    diagnosticos,
    recetas,
    isLoading,
    error,
    cargarDatos,
  }
}

export const useDoctorData = (doctorId) => {
  const { formatDate, formatDay, formatDateTime } = useFormat()

  const [estado, setEstado] = useState({
    usuario: null,
    doctor: null,
    citas: [],
    pacientes: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId) {
        setEstado((prev) => ({ ...prev, loading: false, error: "No se encontró ID de doctor" }))
        return
      }

      try {
        const datosUsuario = await getUserById(doctorId)
        const datosDoctor = await getDoctorById(doctorId)
        const citasDoctor = await getCitasByDoctor(doctorId)

        // Obtener lista única de pacientes de las citas
        const pacientesIds = [...new Set(citasDoctor.map((cita) => cita.paciente_id))]
        const pacientesPromises = pacientesIds.map((id) => getPatientById(id))
        const pacientesData = await Promise.all(pacientesPromises)

        setEstado({
          usuario: datosUsuario,
          doctor: datosDoctor,
          citas: citasDoctor,
          pacientes: pacientesData,
          loading: false,
          error: null,
        })
      } catch (error) {
        console.error("Error al cargar datos del doctor:", error)
        setEstado((prev) => ({
          ...prev,
          loading: false,
          error: "Error al cargar los datos. Por favor, intente nuevamente.",
        }))
      }
    }

    fetchData()
  }, [doctorId])

  const getProximasCitas = () => {
    if (!estado.citas.length) return []

    return [...estado.citas]
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      .filter((cita) => cita.estado === "Pendiente")
      .slice(0, 5)
  }

  const getCitasHoy = () => {
    if (!estado.citas.length) return []

    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)

    return [...estado.citas]
      .filter((cita) => {
        const fechaCita = new Date(cita.fecha)
        fechaCita.setHours(0, 0, 0, 0)
        return fechaCita.getTime() === hoy.getTime() && cita.estado === "Pendiente"
      })
      .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))
  }

  return {
    ...estado,
    formatDate,
    formatDay,
    formatDateTime,
    getProximasCitas,
    getCitasHoy,
  }
}

export const getData = (userId, userRole) => {
  const { formatDate, formatDay, formatDateTime } = useFormat()

  const [estado, setEstado] = useState({
    usuario: null,
    paciente: null,
    citas: [],
    recetas: [],
    diagnosticos: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setEstado((prev) => ({ ...prev, loading: false, error: "No se encontró ID de usuario" }))
        return
      }

      try {
        const datosUsuario = await getUserById(userId)

        const resultado = {
          usuario: datosUsuario,
          paciente: null,
          citas: [],
          recetas: [],
          diagnosticos: [],
          loading: false,
          error: null,
        }

        if (userRole === "paciente") {
          //paralelo para mejor rendimiento
          const [datosPaciente, citasPaciente, diagnosticosPaciente, recetasPaciente] = await Promise.all([
            getPatientById(userId),
            getCitasByPatient(userId),
            getDiagnosticosByPacienteId(userId),
            getRecetasByPacienteId(userId),
          ])

          resultado.paciente = datosPaciente
          resultado.citas = citasPaciente
          resultado.diagnosticos = diagnosticosPaciente
          resultado.recetas = recetasPaciente
        }

        setEstado(resultado)
      } catch (error) {
        console.error("Error al cargar datos:", error)
        setEstado((prev) => ({
          ...prev,
          loading: false,
          error: "Error al cargar los datos. Por favor, intente nuevamente.",
        }))
      }
    }

    fetchData()
  }, [userId, userRole])

  const getProximasCitas = () => {
    if (!estado.citas.length) return []

    return [...estado.citas]
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      .filter((cita) => cita.estado === "Pendiente")
      .slice(0, 3)
  }

  return {
    ...estado,
    formatDate,
    formatDay,
    formatDateTime,
    getProximasCitas,
  }
}
