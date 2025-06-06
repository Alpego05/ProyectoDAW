import { useState } from "react"
import apiRegister from "../../services/apiRegister"

const useDoctorRegister = () => {
    const [formData, setFormData] = useState({
        user: {
            nombre: "",
            apellido1: "",
            apellido2: "",
            email: "",
            dni: "",
        },
        doctor: {
            especialidad: "",
            sala_asignada: "",
            numero_licencia: "",
        },
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleUserChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                [name]: value,
            },
        }))
        if (error) setError(null)
    }

    const handleDoctorChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            doctor: {
                ...prev.doctor,
                [name]: value,
            },
        }))
        if (error) setError(null)
    }

    const validateForm = () => {
        const { user, doctor } = formData

        if (!user.nombre.trim()) return "El nombre es requerido"
        if (!user.apellido1.trim()) return "El primer apellido es requerido"
        if (!user.apellido2.trim()) return "El segundo apellido es requerido"
        if (!user.email.trim()) return "El email es requerido"
        if (!user.dni.trim()) return "El DNI es requerido"
        if (!doctor.especialidad.trim()) return "La especialidad es requerida"
        if (!doctor.sala_asignada.trim()) return "La sala asignada es requerida"
        if (!doctor.numero_licencia.trim()) return "El número de licencia es requerido"

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(user.email)) return "El formato del email no es válido"

        const dniRegex = /^[0-8]{8}[A-Za-z]$/
        if (!dniRegex.test(user.dni)) return "El formato del DNI no es válido (ej: 12345678A)"

        return null
    }

    const resetForm = () => {
        setFormData({
            user: {
                nombre: "",
                apellido1: "",
                apellido2: "",
                email: "",
                dni: "",
            },
            doctor: {
                especialidad: "",
                sala_asignada: "",
                numero_licencia: "",
            },
        })
        setError(null)
        setSuccess(false)
    }

    const submitDoctor = async () => {
        const validationError = validateForm()
        if (validationError) {
            setError(validationError)
            return
        }

        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const result = await apiRegister.createDoctor(formData)
            setSuccess(true)
            setTimeout(() => {
                resetForm()
            }, 3000)

            return result
        } catch (err) {
            setError(err.message || "Error al registrar doctor")
            throw err
        } finally {
            setLoading(false)
        }
    }

    return {
        formData,
        loading,
        error,
        success,
        handleUserChange,
        handleDoctorChange,
        submitDoctor,
        resetForm,
    }
}

export default useDoctorRegister
