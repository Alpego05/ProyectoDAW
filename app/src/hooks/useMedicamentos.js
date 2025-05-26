import { useState } from "react"
import {
    getAllMedicamentos,
    getAllEnfermedades,
    getMedicamentoById,
    getEnfermedadesByMedicamento,
    getMedicamentosByEnfermedad,
    getEnfermedadById,
} from "../services/apiEnfMed"

export const useMedicamentos = () => {
    const [medicamentos, setMedicamentos] = useState([])
    const [enfermedades, setEnfermedades] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedMedicamento, setSelectedMedicamento] = useState(null)
    const [medicamentoEnfermedades, setMedicamentoEnfermedades] = useState([])
    const [enfermedadMedicamentos, setEnfermedadMedicamentos] = useState([])

    // Cargar todos los medicamentos
    const cargarMedicamentos = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await getAllMedicamentos()
            setMedicamentos(data || [])
            return data
        } catch (err) {
            console.error("Error al obtener medicamentos:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener medicamentos")
            return []
        } finally {
            setIsLoading(false)
        }
    }

    // Cargar todas las enfermedades
    const cargarEnfermedades = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await getAllEnfermedades()
            setEnfermedades(data || [])
            return data
        } catch (err) {
            console.error("Error al obtener enfermedades:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener enfermedades")
            return []
        } finally {
            setIsLoading(false)
        }
    }

    const cargarDetalleMedicamento = async (medicamentoId) => {
        setIsLoading(true)
        setError(null)

        try {
            const medicamento = await getMedicamentoById(medicamentoId)
            setSelectedMedicamento(medicamento)
            return medicamento
        } catch (err) {
            console.error("Error al obtener detalles del medicamento:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener detalles del medicamento")
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const obtenerMedicamentoPorId = async (medicamentoId) => {
        setIsLoading(true)
        setError(null)

        try {
            const medicamento = await getMedicamentoById(medicamentoId)
            return medicamento
        } catch (err) {
            console.error("Error al obtener medicamento:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener medicamento")
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const obtenerEnfermedadPorId = async (enfermedadId) => {
        setIsLoading(true)
        setError(null)

        try {
            const enfermedad = await getEnfermedadById(enfermedadId)
            return enfermedad
        } catch (err) {
            console.error("Error al obtener enfermedad:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener enfermedad")
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const cargarEnfermedadesPorMedicamento = async (medicamentoId) => {
        setIsLoading(true)
        setError(null)
        try {
            const enfermedadesData = await getEnfermedadesByMedicamento(medicamentoId)
            setMedicamentoEnfermedades(enfermedadesData || [])
            return enfermedadesData
        } catch (err) {
            console.error("Error al obtener enfermedades por medicamento:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener enfermedades por medicamento")
            return []
        } finally {
            setIsLoading(false)
        }
    }

    const cargarMedicamentosPorEnfermedad = async (enfermedadId) => {
        setIsLoading(true)
        setError(null)
        try {
            const medicamentosData = await getMedicamentosByEnfermedad(enfermedadId)
            setEnfermedadMedicamentos(medicamentosData || [])
            return medicamentosData
        } catch (err) {
            console.error("Error al obtener medicamentos por enfermedad:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener medicamentos por enfermedad")
            return []
        } finally {
            setIsLoading(false)
        }
    }

    const cargarDatosIniciales = async () => {
        setIsLoading(true)
        setError(null)

        try {
            await Promise.all([cargarMedicamentos(), cargarEnfermedades()])
        } catch (err) {
            console.error("Error al cargar datos iniciales:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al cargar datos iniciales")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        medicamentos,
        enfermedades,
        medicamentoEnfermedades,
        selectedMedicamento,
        isLoading,
        error,
        cargarMedicamentos,
        cargarEnfermedades,
        cargarDetalleMedicamento,
        cargarEnfermedadesPorMedicamento,
        cargarMedicamentosPorEnfermedad,
        obtenerMedicamentoPorId,
        obtenerEnfermedadPorId,
        setSelectedMedicamento,
        cargarDatosIniciales,
    }
}

export default useMedicamentos