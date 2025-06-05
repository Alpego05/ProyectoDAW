import { useState, useEffect } from "react"
import { getAllUsers } from "../../services/apiUser"
import { getAllDoctors } from "../../services/apiDoctor"
import { getPatients } from "../../services/apiPatient"


export const useAdmin = () => {
    const [usuarios, setUsuarios] = useState([])
    const [doctores, setDoctores] = useState([])
    const [pacientes, setPacientes] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const cargarDatos = async () => {
        setIsLoading(true)
        setError(null)

        try {
   
            const [
                todosUsuarios,
                todosDoctores,
                todosPacientes

            ] = await Promise.allSettled([
                getAllUsers(),
                getAllDoctors(),
                getPatients(),
            ])

            // Procesar usuarios
            const usuariosData = todosUsuarios.status === 'fulfilled'
                ? (Array.isArray(todosUsuarios.value) ? todosUsuarios.value : [])
                : []
            setUsuarios(usuariosData)
              console.log(usuarios)

            const doctoresData = todosDoctores.status === 'fulfilled'
                ? (Array.isArray(todosDoctores.value) ? todosDoctores.value : [])
                : []
            setDoctores(doctoresData)
            console.log(doctores)

            const pacientesData = todosPacientes.status === 'fulfilled'
                ? (Array.isArray(todosPacientes.value) ? todosPacientes.value : [])
                : []
            setPacientes(pacientesData)
              console.log(pacientes)

          

            // Verificar si hubo errores en alguna de las llamadas
            const errors = [
                todosUsuarios,
                todosDoctores,
                todosPacientes
            ]
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
        } finally {
            setIsLoading(false)
        }
    }

    const resetDatos = () => {
        setUsuarios([])
        setDoctores([])
        setPacientes([])
        setError(null)
        setIsLoading(false)
    }

    const getEstadisticas = () => {
        return {
            totalUsuarios: usuarios.length,
            totalDoctores: doctores.length,
            totalPacientes: pacientes.length,
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
        isLoading,
        error,
        cargarDatos,
        resetDatos,
        getEstadisticas,
    }
}