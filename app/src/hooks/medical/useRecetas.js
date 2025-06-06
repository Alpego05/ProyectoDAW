import { useState, useEffect } from "react"
import { getRecetasByPacienteId, getAllRecetas, getRecetasByDiagnosticoId } from "../../services/apiRecetas"

export const useRecetas = (pacienteIdProp = null, diagnosticoIdProp = null) => {
    const [recetas, setRecetas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedReceta, setSelectedReceta] = useState(null)

    const cargarRecetasPorPaciente = async (pacienteId = null) => {
        setIsLoading(true)
        setError(null)

        try {
            const id = localStorage.getItem("userId")
            
            if (!id) {
                throw new Error("No se encontró el ID del paciente")
            }

            const data = await getRecetasByPacienteId(id)
            setRecetas(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Error al obtener recetas:", err)
            setError(err instanceof Error ? err.message : "Error al obtener las recetas")
            setRecetas([])
        } finally {
            setIsLoading(false)
        }
    }

    const cargarRecetasPorDiagnostico = async (diagnosticoId = null) => {
        const id = diagnosticoId || diagnosticoIdProp
        
        if (!id) {
            setError('No se proporcionó ID de diagnóstico')
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const data = await getRecetasByDiagnosticoId(id)
            setRecetas(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Error al obtener recetas por diagnóstico:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener las recetas")
            setRecetas([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (diagnosticoIdProp) {
            cargarRecetasPorDiagnostico()
        } else {
            cargarRecetasPorPaciente()
        }
    }, [pacienteIdProp, diagnosticoIdProp])

    const handleRecetaClick = (receta) => {
        if (!receta) return
        setSelectedReceta(receta)
    }

    const closeDetails = () => {
        setSelectedReceta(null)
    }

    const recargarRecetas = () => {
        if (diagnosticoIdProp) {
            cargarRecetasPorDiagnostico()
        } else {
            cargarRecetasPorPaciente()
        }
    }

    const filtrarRecetasPorEstado = (estado) => {
        if (!estado || !Array.isArray(recetas)) return recetas
        return recetas.filter(receta => 
            receta?.estado?.toLowerCase() === estado.toLowerCase()
        )
    }

    const filtrarRecetasActivas = () => {
        if (!Array.isArray(recetas)) return []
        
        const hoy = new Date()
        return recetas.filter(receta => {
            if (!receta?.fecha_fin && !receta?.fecha_vencimiento) return true
            
            try {
                const fechaFin = new Date(receta.fecha_fin || receta.fecha_vencimiento)
                return fechaFin >= hoy
            } catch (e) {
                console.error("Error al procesar fecha de receta:", e)
                return true // En caso de error, se asume activa
            }
        })
    }

    const filtrarRecetasVencidas = () => {
        if (!Array.isArray(recetas)) return []
        
        const hoy = new Date()
        return recetas.filter(receta => {
            if (!receta?.fecha_fin && !receta?.fecha_vencimiento) return false
            
            try {
                const fechaFin = new Date(receta.fecha_fin || receta.fecha_vencimiento)
                return fechaFin < hoy
            } catch (e) {
                console.error("Error al procesar fecha de receta:", e)
                return false
            }
        })
    }

    const buscarRecetasPorMedicamento = (nombreMedicamento) => {
        if (!nombreMedicamento || !Array.isArray(recetas)) return recetas
        
        const busqueda = nombreMedicamento.toLowerCase()
        return recetas.filter(receta =>  receta.medicamento.toLowerCase().includes(busqueda) )
    }

    const getRecetasRecientes = (limite = 5) => {
        if (!Array.isArray(recetas) || recetas.length === 0) return []

        return [...recetas]
            .sort((a, b) => {
                try {
                    return new Date( b.created_at || 0) - new Date(a.created_at || 0)
                } catch (e) {
                    console.error("Error al ordenar recetas:", e)
                    return 0
                }
            })
            .slice(0, limite)
    }

    return {
        recetas,
        isLoading,
        error,
        selectedReceta,
        cargarRecetasPorPaciente,
        cargarRecetasPorDiagnostico,
        handleRecetaClick,
        closeDetails,
        recargarRecetas,
        filtrarRecetasPorEstado,
        filtrarRecetasActivas,
        filtrarRecetasVencidas,
        buscarRecetasPorMedicamento,
        getRecetasRecientes,
    }
}

export const useTodasRecetas = () => {
    const [recetas, setRecetas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const cargarRecetas = async () => {
        setLoading(true)
        setError(null)

        try {
            const recetasData = await getAllRecetas()
            setRecetas(Array.isArray(recetasData) ? recetasData : [])
        } catch (err) {
            // console.error("Error al cargar las recetas:", err)
            setError("Error al cargar recetas")
            setRecetas([])
        } finally {
            setLoading(false)
        }
    }

    const resetRecetas = () => {
        setRecetas([])
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
        cargarRecetas()
    }, [])

    return {
        recetas,
        loading,
        error,
        cargarRecetas,
        resetRecetas,
    }
}