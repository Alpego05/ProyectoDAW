import { useState, useEffect } from "react"
import { getDiagnosticosByPacienteId, getAllDiagnosticos } from "../../services/apiDiagnosticos"

// Hook mejorado basado en el existente pero con protecciones adicionales
export const useDiagnosticos = (pacienteIdProp = null) => {
    const [diagnosticos, setDiagnosticos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedDiagnostico, setSelectedDiagnostico] = useState(null)

    const cargarDiagnosticos = async (pacienteId = null) => {
        setIsLoading(true)
        setError(null)

        try {
            const id = pacienteId || pacienteIdProp || localStorage.getItem("userId")
            
            if (!id) {
                throw new Error("No se encontró el ID del paciente. Por favor, inicia sesión nuevamente.")
            }

            const data = await getDiagnosticosByPacienteId(id)
            setDiagnosticos(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Error al obtener diagnósticos:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener los diagnósticos")
            setDiagnosticos([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        cargarDiagnosticos()
    }, [pacienteIdProp])

    const handleDiagnosticoClick = (diagnostico) => {
        if (!diagnostico) return
        setSelectedDiagnostico(diagnostico)
    }

    const closeDetails = () => {
        setSelectedDiagnostico(null)
    }

    const recargarDiagnosticos = () => {
        cargarDiagnosticos()
    }

    const buscarDiagnosticoPorCita = (citaId) => {
        if (!citaId || !Array.isArray(diagnosticos)) return null
        return diagnosticos.find(d => d?.cita_id === citaId) || null
    }

    const filtrarDiagnosticosPorFecha = (fechaInicio, fechaFin) => {
        if (!fechaInicio || !fechaFin || !Array.isArray(diagnosticos)) return diagnosticos
        
        return diagnosticos.filter(diagnostico => {
            if (!diagnostico?.fecha) return false
            try {
                const fechaDiagnostico = new Date(diagnostico.fecha)
                const inicio = new Date(fechaInicio)
                const fin = new Date(fechaFin)
                return fechaDiagnostico >= inicio && fechaDiagnostico <= fin
            } catch (e) {
                console.error("Error al procesar fechas de diagnóstico:", e)
                return false
            }
        })
    }

    const getDiagnosticosRecientes = (limite = 5) => {
        if (!Array.isArray(diagnosticos) || diagnosticos.length === 0) return []

        return [...diagnosticos]
            .sort((a, b) => {
                try {
                    return new Date(b?.fecha_diagnostico || b?.created_at || b?.fecha || 0) - 
                           new Date(a?.fecha_diagnostico || a?.created_at || a?.fecha || 0)
                } catch (e) {
                    console.error("Error al ordenar diagnósticos:", e)
                    return 0
                }
            })
            .slice(0, limite)
    }

    return {
        diagnosticos,
        isLoading,
        error,
        selectedDiagnostico,
        cargarDiagnosticos,
        handleDiagnosticoClick,
        closeDetails,
        recargarDiagnosticos,
        buscarDiagnosticoPorCita,
        filtrarDiagnosticosPorFecha,
        getDiagnosticosRecientes,
    }
}

export const useTodosDiagnosticos = () => {
    const [diagnosticos, setDiagnosticos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const cargarDiagnosticos = async () => {
        setLoading(true)
        setError(null)

        try {
            const diagnosticosData = await getAllDiagnosticos()
            setDiagnosticos(Array.isArray(diagnosticosData) ? diagnosticosData : [])
        } catch (err) {
            console.error("Error al cargar todos los diagnósticos:", err)
            setError(err instanceof Error ? err.message : "Error al cargar diagnósticos")
            setDiagnosticos([])
        } finally {
            setLoading(false)
        }
    }

    const resetDiagnosticos = () => {
        setDiagnosticos([])
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
        cargarDiagnosticos()
    }, [])

    return {
        diagnosticos,
        loading,
        error,
        cargarDiagnosticos,
        resetDiagnosticos,
    }
}