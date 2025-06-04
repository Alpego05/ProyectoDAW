import { useState } from 'react'
import apiRegister from '../../services/apiRegister'

const useDoctorRegister = () => {
    const [formData, setFormData] = useState({
        user: {
            nombre: '',
            apellido1: '',
            apellido2: '',
            email: '',
            dni: ''
        },
        doctor: {
            especialidad: '',
            sala_asignada: '',
            numero_licencia: ''
        }
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleUserChange = (e) => {
        setFormData(prev => ({
            ...prev,
            user: {
                ...prev.user,
                [e.target.name]: e.target.value
            }
        }))
    }

    const handleDoctorChange = (e) => {
        setFormData(prev => ({
            ...prev,
            doctor: {
                ...prev.doctor,
                [e.target.name]: e.target.value
            }
        }))
    }

    const resetForm = () => {
        setFormData({
            user: {
                nombre: '',
                apellido1: '',
                apellido2: '',
                email: '',
                dni: ''
            },
            doctor: {
                especialidad: '',
                sala_asignada: '',
                numero_licencia: ''
            }
        })
        setError(null)
        setSuccess(false)
    }

    const submitDoctor = async () => {
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const result = await apiRegister.createDoctor(formData)
            setSuccess(true)
            resetForm()
            return result
        } catch (err) {
            setError(err.message || 'Error al registrar doctor')
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
        resetForm
    }
}

export default useDoctorRegister