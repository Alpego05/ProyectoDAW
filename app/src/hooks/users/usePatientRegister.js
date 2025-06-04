import { useState } from 'react'
import apiRegister from '../../services/apiRegister'

const usePatientRegister = () => {
    const [formData, setFormData] = useState({
        user: {
            nombre: '',
            apellido1: '',
            apellido2: '',
            email: '',
            dni: ''
        },
        patient: {
            genero: '',
            fecha_nacimiento: '',
            direccion: '',
            telefono: '',
            tipo_sangre: '',
            alergias: ''
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

    const handlePatientChange = (e) => {
        setFormData(prev => ({
            ...prev,
            patient: {
                ...prev.patient,
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
            patient: {
                genero: '',
                fecha_nacimiento: '',
                direccion: '',
                telefono: '',
                tipo_sangre: '',
                alergias: ''
            }
        })
        setError(null)
        setSuccess(false)
    }

    const submitPatient = async () => {
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const result = await apiRegister.createPatient(formData)
            setSuccess(true)
            resetForm()
            return result
        } catch (err) {
            setError(err.message || 'Error al registrar paciente')
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
        resetForm
    }
}

export default usePatientRegister