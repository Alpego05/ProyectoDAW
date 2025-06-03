import { useState, useEffect } from "react"
import { getCitasByPatient, getCitasByDoctor, getAllCitas } from "../../services/apiCitas"
import { getDoctorById } from "../../services/apiDoctor"
import { getDiagnosticosByPacienteId } from "../../services/apiDiagnosticos"
import { getRecetasByDiagnosticoId } from "../../services/apiRecetas"

export const useCitas = () => {
    const [citas, setCitas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCita, setSelectedCita] = useState(null)
    const [citaDetails, setCitaDetails] = useState({
        doctor: null,
        diagnostico: null,
        recetas: []
    })
    const [loadingDetails, setLoadingDetails] = useState(false)
    const [detailsError, setDetailsError] = useState(null)

    const cargarCitas = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const userId = localStorage.getItem("userId")
            if (!userId) {
                throw new Error("No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.")
            }

            const data = await getCitasByPatient(userId)
            setCitas(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Error al obtener citas:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener las citas")
            setCitas([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        cargarCitas()
    }, [])

    const cargarDetallesCita = async (cita) => {
        if (!cita || !cita.doctor_id || !cita.paciente_id || !cita.id_cita) {
            setDetailsError("Datos de cita incompletos")
            return
        }

        setLoadingDetails(true)
        setDetailsError(null)

        try {
            // Información del doctor
            const doctorData = await getDoctorById(cita.doctor_id)
            
            // Obtener diagnósticos del paciente
            const diagnosticosData = await getDiagnosticosByPacienteId(cita.paciente_id)
            const citaDiagnostico = Array.isArray(diagnosticosData) 
                ? diagnosticosData.find(d => d?.cita_id === cita.id_cita) || null
                : null


            let recetasData = []
            if (citaDiagnostico?.id_diagnostico) {
                try {
                    const recetasResponse = await getRecetasByDiagnosticoId(citaDiagnostico.id_diagnostico)
                    recetasData = Array.isArray(recetasResponse) ? recetasResponse : []
                } catch (recetaError) {
                    console.warn("Error al cargar recetas:", recetaError)
                }
            }

            setCitaDetails({
                doctor: doctorData,
                diagnostico: citaDiagnostico,
                recetas: recetasData
            })
        } catch (err) {
            console.error("Error al cargar detalles de la cita:", err)
            setDetailsError("No se pudieron cargar todos los detalles de la cita")
        } finally {
            setLoadingDetails(false)
        }
    }

    const handleCitaClick = (cita) => {
        setSelectedCita(cita)
        cargarDetallesCita(cita)
    }

    const closeDetails = () => {
        setSelectedCita(null)
        setCitaDetails({
            doctor: null,
            diagnostico: null,
            recetas: []
        })
        setDetailsError(null)
    }

    const getProximasCitas = () => {
        if (!Array.isArray(citas) || citas.length === 0) return []

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        return [...citas]
            .filter((cita) => {
                if (!cita?.fecha) return false
                try {
                    const fechaCita = new Date(cita.fecha)
                    fechaCita.setHours(0, 0, 0, 0)
                    return fechaCita >= hoy && cita.estado === "Pendiente"
                } catch (e) {
                    console.error("Error al procesar fecha de cita:", e)
                    return false
                }
            })
            .sort((a, b) => {
                try {
                    return new Date(a.fecha) - new Date(b.fecha)
                } catch (e) {
                    console.error("Error al ordenar citas:", e)
                    return 0
                }
            })
            .slice(0, 3)
    }

    const getCitasHoy = () => {
        if (!Array.isArray(citas) || citas.length === 0) return []

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        return [...citas]
            .filter((cita) => {
                if (!cita?.fecha) return false
                try {
                    const fechaCita = new Date(cita.fecha)
                    fechaCita.setHours(0, 0, 0, 0)
                    return fechaCita.getTime() === hoy.getTime() && cita.estado === "Pendiente"
                } catch (e) {
                    console.error("Error al procesar fecha de cita:", e)
                    return false
                }
            })
            .sort((a, b) => {
                try {
                    return (a.hora_inicio || "").localeCompare(b.hora_inicio || "")
                } catch (e) {
                    console.error("Error al ordenar citas por hora:", e)
                    return 0
                }
            })
    }

    return {
        citas,
        isLoading,
        error,
        selectedCita,
        citaDetails,
        loadingDetails,
        detailsError,
        cargarCitas,
        handleCitaClick,
        closeDetails,
        getProximasCitas,
        getCitasHoy,
    }
}

export const useCitasDoctor = (doctorId) => {
    const [citas, setCitas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const cargarCitas = async (id = doctorId) => {
        if (!id) {
            setError("No se proporcionó ID de doctor")
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const citasData = await getCitasByDoctor(id)
            setCitas(Array.isArray(citasData) ? citasData : [])
        } catch (err) {
            console.error("Error al cargar citas del doctor:", err)
            setError(err instanceof Error ? err.message : "Error al cargar citas")
            setCitas([])
        } finally {
            setLoading(false)
        }
    }

    const getProximasCitas = () => {
        if (!Array.isArray(citas) || citas.length === 0) return []

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        return [...citas]
            .filter((cita) => {
                if (!cita?.fecha) return false
                try {
                    const fechaCita = new Date(cita.fecha)
                    fechaCita.setHours(0, 0, 0, 0)
                    return fechaCita > hoy && cita.estado === "Pendiente"
                } catch (e) {
                    console.error("Error al procesar fecha de cita:", e)
                    return false
                }
            })
            .sort((a, b) => {
                try {
                    return new Date(a.fecha) - new Date(b.fecha)
                } catch (e) {
                    console.error("Error al ordenar citas:", e)
                    return 0
                }
            })
            .slice(0, 5)
    }

    const getCitasHoy = () => {
        if (!Array.isArray(citas) || citas.length === 0) return []

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        return [...citas]
            .filter((cita) => {
                if (!cita?.fecha) return false
                try {
                    const fechaCita = new Date(cita.fecha)
                    fechaCita.setHours(0, 0, 0, 0)
                    return fechaCita.getTime() === hoy.getTime() && cita.estado === "Pendiente"
                } catch (e) {
                    console.error("Error al procesar fecha de cita:", e)
                    return false
                }
            })
            .sort((a, b) => {
                try {
                    return (a.hora_inicio || "").localeCompare(b.hora_inicio || "")
                } catch (e) {
                    console.error("Error al ordenar citas por hora:", e)
                    return 0
                }
            })
    }

    useEffect(() => {
        if (doctorId) {
            cargarCitas(doctorId)
        } else {
            setLoading(false)
        }
    }, [doctorId])

    return {
        citas,
        loading,
        error,
        cargarCitas,
        getProximasCitas,
        getCitasHoy,
    }
}

export const useTodasCitas = () => {
    const [citas, setCitas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const cargarCitas = async () => {
        setLoading(true)
        setError(null)

        try {
            const citasData = await getAllCitas()
            setCitas(Array.isArray(citasData) ? citasData : [])
        } catch (err) {
            console.error("Error al cargar todas las citas:", err)
            setError(err instanceof Error ? err.message : "Error al cargar citas")
            setCitas([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        cargarCitas()
    }, [])

    return {
        citas,
        loading,
        error,
        cargarCitas,
    }
}