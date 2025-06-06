import { useState, useEffect } from "react"
import { getDoctorById } from "../../services/apiDoctor"
import useFormat from "../useFormat"
import { getUserById } from "../../services/apiUser"
import { getCitasByDoctor } from "../../services/apiCitas"
import { getPatientById } from "../../services/apiPatient"

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
            if (!datosDoctor) {
                throw new Error("Doctor no encontrado")
            }
            setDoctor(datosDoctor)
        } catch (err) {
            console.error("Error al obtener doctor:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener doctor")
            setDoctor(null)
        } finally {
            setIsLoading(false)
        }
    }

    const resetDoctor = () => {
        setDoctor(null)
        setError(null)
        setIsLoading(false)
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
        resetDoctor,
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
                // Obtener datos del usuario y doctor
                const datosUsuario = await getUserById(doctorId)
                const datosDoctor = await getDoctorById(doctorId)

                const citasDoctor = await getCitasByDoctor(doctorId)

                const pacientesMap = new Map()
                const pacientesPromises = []

                citasDoctor.forEach((cita) => {
                    if (cita.paciente_id && !pacientesMap.has(cita.paciente_id)) {
                        pacientesMap.set(cita.paciente_id, null)
                        pacientesPromises.push(
                            getPatientById(cita.paciente_id)
                                .then((pacienteData) => {
                                    pacientesMap.set(cita.paciente_id, pacienteData)
                                    // Añadir la referencia del paciente a la cita
                                    cita.paciente = pacienteData
                                    return pacienteData
                                })
                                .catch((error) => {
                                    console.error(`Error al obtener paciente ${cita.paciente_id}:`, error)
                                    return null
                                }),
                        )
                    }
                })

                await Promise.all(pacientesPromises)
                const pacientesData = Array.from(pacientesMap.values()).filter(Boolean)

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

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        return [...estado.citas]
            .filter((cita) => {
                const fechaCita = new Date(cita.fecha)
                fechaCita.setHours(0, 0, 0, 0)
                return fechaCita > hoy && cita.estado === "Pendiente"
            })
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
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