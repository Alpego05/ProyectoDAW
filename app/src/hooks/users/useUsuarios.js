import { useState, useEffect } from "react"
import { getUserById, getAllUsers } from "../../services/apiUser"
import { getPatientById, getPatients } from "../../services/apiPatient"
import useFormat from "../useFormat"


import { getCitasByPatient, getCitasByDoctor, getAllCitas } from "../../services/apiCitas"
import { getDiagnosticosByPacienteId, getAllDiagnosticos } from "../../services/apiDiagnosticos"
import { getRecetasByPacienteId, getAllRecetas } from "../../services/apiRecetas"


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
            if (!datosUsuario) {
                throw new Error("Usuario no encontrado")
            }
            setUsuario(datosUsuario)
        } catch (err) {
            console.error("Error al obtener usuario:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener usuario")
        } finally {
            setIsLoading(false)
        }
    }

    const resetUsuario = () => {
        setUsuario(null)
        setError(null)
        setIsLoading(false)
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
        resetUsuario,
    }
}

export const useTodosUsuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const cargarUsuarios = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await getAllUsers()
            setUsuarios(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Error al cargar usuarios:", err)
            setError(err instanceof Error ? err.message : "Error al cargar usuarios")
            setUsuarios([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        cargarUsuarios()
    }, [])

    return {
        usuarios,
        isLoading,
        error,
        cargarUsuarios,
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

