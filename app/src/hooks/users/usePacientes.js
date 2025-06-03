import { useState, useEffect } from "react"
import { getPatientById, getPatients } from "../../services/apiPatient"
import { getUserById } from "../../services/apiUser"

import { getDoctorById } from "../../services/apiDoctor"
import { getCitasByPatient, getCitasByDoctor, getAllCitas } from "../../services/apiCitas"
import { getDiagnosticosByPacienteId, getAllDiagnosticos } from "../../services/apiDiagnosticos"
import { getRecetasByPacienteId, getAllRecetas } from "../../services/apiRecetas"
import { getAllUsers } from "../../services/apiUser"

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
            if (!datosPaciente) {
                throw new Error("Paciente no encontrado")
            }
            setPaciente(datosPaciente)
        } catch (err) {
            console.error("Error al obtener paciente:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener paciente")
            setPaciente(null)
        } finally {
            setIsLoading(false)
        }
    }

    const resetPaciente = () => {
        setPaciente(null)
        setError(null)
        setIsLoading(false)
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
        resetPaciente,
    }
}

export const useTodosPacientes = () => {
    const [pacientes, setPacientes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const cargarPacientes = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await getPatients()
            setPacientes(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Error al cargar pacientes:", err)
            setError(err instanceof Error ? err.message : 'Error al cargar pacientes')
            setPacientes([])
        } finally {
            setLoading(false)
        }
    }

    const resetPacientes = () => {
        setPacientes([])
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
        cargarPacientes()
    }, [])

    return {
        pacientes,
        loading,
        error,
        cargarPacientes,
        resetPacientes
    }
}