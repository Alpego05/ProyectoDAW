import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useMedicamentos from '../../../hooks/useMedicamentos'

const MedicamentoDetalle = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { obtenerMedicamentoPorId, isLoading, error } = useMedicamentos()
    const [medicamento, setMedicamento] = useState(null)

    useEffect(() => {
        const cargarMedicamento = async () => {
            try {
                const data = await obtenerMedicamentoPorId(id)
                setMedicamento(data)
            } catch (err) {
                console.error('Error al cargar medicamento:', err)
            }
        }

        if (id) {
            cargarMedicamento()
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

    if (!medicamento) {
        return (
            <div>
                <h2>Medicamento no encontrado</h2>
                <button onClick={handleVolver}>Volver</button>
            </div>
        )
    }

    return (
        <div>
            <button onClick={handleVolver}>← Volver</button>

            <h1>{medicamento.nombre}</h1>

            <div>
                <h2>Información básica</h2>
                <p><strong>Categoría:</strong> {medicamento.categoria || 'No especificada'}</p>
                <p><strong>Forma/Vía:</strong> {medicamento.forma_via || 'No especificada'}</p>
                <p><strong>Descripción:</strong> {medicamento.desc || 'Sin descripción'}</p>
            </div>
            {medicamento.dosis && (
                <div>
                    <h2>Dosis</h2>
                    <p>{medicamento.dosis}</p>
                </div>
            )}
            {medicamento.efectos_secundarios && (
                <div>
                    <h2>Efectos secundarios</h2>
                    <p>{medicamento.efectos_secundarios}</p>
                </div>
            )}

        </div>
    )
}

export default MedicamentoDetalle
