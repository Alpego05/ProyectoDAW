import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useMedicamentos from '../../../hooks/useMedicamentos'

const EnfermedadDetalle = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { obtenerEnfermedadPorId, isLoading, error } = useMedicamentos()
    const [enfermedad, setEnfermedad] = useState(null)

    useEffect(() => {
        const cargarEnfermedad = async () => {
            try {
                const data = await obtenerEnfermedadPorId(id)
                setEnfermedad(data)
            } catch (err) {
                console.error('Error al cargar enfermedad:', err)
            }
        }

        if (id) {
            cargarEnfermedad()
        }
    }, [id])

    const handleVolver = () => {
        navigate('/Home/glosario')
    }

    if (isLoading) {
        return <div>Cargando...</div>
    }

    if (error) {
        return (
            <div>
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={handleVolver}>Volver</button>
            </div>
        )
    }

    if (!enfermedad) {
        return (
            <div>
                <h2>Enfermedad no encontrada</h2>
                <button onClick={handleVolver}>Volver</button>
            </div>
        )
    }

    return (
        <div>
            <button onClick={handleVolver}>← Volver</button>
            <h1>{enfermedad.nombre}</h1>
            <div>
                <h2>Información básica</h2>
                <p><strong>Código CIE:</strong> {enfermedad.codigo_cie}</p>
                <p><strong>Categoría:</strong> {enfermedad.categoria || 'No especificada'}</p>
                <p><strong>Descripción:</strong> {enfermedad.desc || 'Sin descripción'}</p>
            </div>
        </div>
    )
}

export default EnfermedadDetalle