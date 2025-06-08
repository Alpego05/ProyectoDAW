import { useState } from "react"
import apiRegister from "../../services/apiRegister"

const usePatientRegister = () => {
    const [formData, setFormData] = useState({
        user: {
            nombre: "",
            apellido1: "",
            apellido2: "",
            email: "",
            dni: "",
        },
        patient: {
            genero: "",
            fecha_nacimiento: "",
            direccion: "",
            telefono: "",
            tipo_sangre: "",
            alergias: "",
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

    const handlePatientChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            patient: {
                ...prev.patient,
                [name]: value,
            },
        }))
        if (error) setError(null)
    }

    const validateForm = () => {
        const { user, patient } = formData

        if (!user.nombre.trim()) return "El nombre es requerido"
        if (!user.apellido1.trim()) return "El primer apellido es requerido"
        if (!user.apellido2.trim()) return "El segundo apellido es requerido"
        if (!user.email.trim()) return "El email es requerido"
        if (!user.dni.trim()) return "El DNI es requerido"
        if (!patient.genero) return "El género es requerido"
        if (!patient.fecha_nacimiento) return "La fecha de nacimiento es requerida"
        if (!patient.direccion.trim()) return "La dirección es requerida"
        if (!patient.telefono.trim()) return "El teléfono es requerido"
        if (!patient.tipo_sangre) return "El tipo de sangre es requerido"

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(user.email)) return "El formato del email no es válido"

        const dniRegex = /^[0-8]{8}[A-Za-z]$/
        if (!dniRegex.test(user.dni)) return "El formato del DNI no es válido (ej: 12345678A)"

        const phoneRegex = /^[6-9][0-9]{8}$/
        if (!phoneRegex.test(patient.telefono)) return "El formato del teléfono no es válido (ej: 612345678)"

        const birthDate = new Date(patient.fecha_nacimiento)
        const today = new Date()
        if (birthDate > today) return "La fecha de nacimiento no puede ser futura"

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
            patient: {
                genero: "",
                fecha_nacimiento: "",
                direccion: "",
                telefono: "",
                tipo_sangre: "",
                alergias: "",
            },
        })
        setError(null)
        setSuccess(false)
    }

    const submitPatient = async () => {
        const validationError = validateForm()
        if (validationError) {
            setError(validationError)
            return
        }

        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const result = await apiRegister.createPatient(formData)
            setSuccess(true)

            setTimeout(() => {
                resetForm()
            }, 3000)

            return result
        } catch (err) {
            setError("Error al registrar paciente")
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
        handlePatientChange,
        submitPatient,
        resetForm,
    }
}

export default usePatientRegister
