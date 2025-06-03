import { useState, useEffect } from "react"
import { getAllUsers } from "../../services/apiUser"
import { getAllCitas } from "../../services/apiCitas"
import { getAllDiagnosticos } from "../../services/apiDiagnosticos"
import { getAllRecetas } from "../../services/apiRecetas"

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
            const [todosUsuarios, todasCitas, todosDiagnosticos, todasRecetas] = await Promise.allSettled([
                getAllUsers(),
                getAllCitas(),
                getAllDiagnosticos(),
                getAllRecetas(),
            ])

            // Procesar usuarios
            const usuariosData = todosUsuarios.status === 'fulfilled' 
                ? (Array.isArray(todosUsuarios.value) ? todosUsuarios.value : [])
                : []
            setUsuarios(usuariosData)

            // Filtrar usuarios por tipo con validación
            const doctoresData = usuariosData.filter((user) => 
                user && user.tipo_usuario === "doctor"
            )
            const pacientesData = usuariosData.filter((user) => 
                user && user.tipo_usuario === "paciente"
            )

            setDoctores(doctoresData)
            setPacientes(pacientesData)

            // Procesar citas
            const citasData = todasCitas.status === 'fulfilled'
                ? (Array.isArray(todasCitas.value) ? todasCitas.value : [])
                : []
            setCitas(citasData)

            // Procesar diagnósticos
            const diagnosticosData = todosDiagnosticos.status === 'fulfilled'
                ? (Array.isArray(todosDiagnosticos.value) ? todosDiagnosticos.value : [])
                : []
            setDiagnosticos(diagnosticosData)

            // Procesar recetas
            const recetasData = todasRecetas.status === 'fulfilled'
                ? (Array.isArray(todasRecetas.value) ? todasRecetas.value : [])
                : []
            setRecetas(recetasData)

            // Verificar si hubo errores en alguna de las llamadas
            const errors = [todosUsuarios, todasCitas, todosDiagnosticos, todasRecetas]
                .filter(result => result.status === 'rejected')
                .map(result => result.reason)

            if (errors.length > 0) {
                console.warn("Algunos datos no se pudieron cargar:", errors)
                setError(`Advertencia: Algunos datos no se pudieron cargar completamente`)
            }

        } catch (err) {
            console.error("Error al obtener datos de administrador:", err)
            setError(err instanceof Error ? err.message : "Error desconocido al obtener datos")
            
            setUsuarios([])
            setDoctores([])
            setPacientes([])
            setCitas([])
            setDiagnosticos([])
            setRecetas([])
        } finally {
            setIsLoading(false)
        }
    }

    const resetDatos = () => {
        setUsuarios([])
        setDoctores([])
        setPacientes([])
        setCitas([])
        setDiagnosticos([])
        setRecetas([])
        setError(null)
        setIsLoading(false)
    }

    const getEstadisticas = () => {
        return {
            totalUsuarios: usuarios.length,
            totalDoctores: doctores.length,
            totalPacientes: pacientes.length,
            totalCitas: citas.length,
            citasPendientes: citas.filter(cita => cita?.estado === "Pendiente").length,
            citasCompletadas: citas.filter(cita => cita?.estado === "Completada").length,
            totalDiagnosticos: diagnosticos.length,
            totalRecetas: recetas.length,
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
        resetDatos,
        getEstadisticas,
    }
}