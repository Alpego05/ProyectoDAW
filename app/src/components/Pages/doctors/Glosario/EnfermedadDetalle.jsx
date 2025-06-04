import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft, Heart, AlertTriangle, Info, Activity,
    Pill,
    Worm
} from 'lucide-react'
import useMedicamentos from '../../../../hooks/medical/useMedicamentos'
import MedicamentoAsociado from './MedicamentoAsociado'
import LoadingScreen from '../../../Common/LoadingScreen'

const EnfermedadDetalle = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { obtenerEnfermedadPorId, cargarMedicamentosPorEnfermedad, isLoading, error } = useMedicamentos()
    const [enfermedad, setEnfermedad] = useState(null)
    const [medicamentos, setMedicamentos] = useState([])
    const [loadingMedicamentos, setLoadingMedicamentos] = useState(false)

    useEffect(() => {
        const cargarEnfermedad = async () => {
            try {
                const data = await obtenerEnfermedadPorId(id)
                setEnfermedad(data)

                if (data) {
                    setLoadingMedicamentos(true)
                    try {
                        const medicamentosData = await cargarMedicamentosPorEnfermedad(id)
                        setMedicamentos(medicamentosData || [])
                    } catch (err) {
                        console.error('Error al cargar medicamentos:', err)
                    } finally {
                        setLoadingMedicamentos(false)
                    }
                }
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
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <LoadingScreen></LoadingScreen>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4 text-center space-y-6">
                    <div className="bg-red-100 rounded-full p-4 w-fit mx-auto">
                        <AlertTriangle className="h-12 w-12 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Error</h2>
                    <p className="text-red-600 font-medium">{error}</p>
                    <button
                        onClick={handleVolver}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center space-x-2 font-medium shadow-md"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Volver</span>
                    </button>
                </div>
            </div>
        )
    }

    if (!enfermedad) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4 text-center space-y-6">
                    <div className="bg-gray-100 rounded-full p-4 w-fit mx-auto">
                        <Heart className="h-12 w-12 text-gray-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Enfermedad no encontrada</h2>
                    <p className="text-gray-600">No se pudo encontrar la información de la enfermedad solicitada.</p>
                    <button
                        onClick={handleVolver}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center space-x-2 font-medium shadow-md"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Volver</span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Enfermedad principal */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-start">
                            <div className="p-3 rounded-full bg-red-100 mr-4" style={{ color: "var(--danger-color)" }}>
                                <Worm className="h-7 w-7 text-red-500" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">{enfermedad.nombre}</h1>
                                <p className="text-red-600 font-semibold text-lg mb-4" style={{ color: "var(--danger-color)" }}>
                                    {enfermedad.categoria || 'Sin categoría'}
                                </p>
                                {enfermedad.desc && <p className="text-gray-700 mb-4 leading-relaxed">{enfermedad.desc}</p>}
                                {enfermedad.codigo_cie && (
                                    <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                                        style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "var(--danger-color" }}>
                                        CIE: {enfermedad.codigo_cie}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Síntomas */}
                    {enfermedad.sintomas && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-start">
                                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-800">Síntomas</h4>
                                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <p className="text-gray-700 font-medium leading-relaxed">{enfermedad.sintomas}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Medicamentos */}
                    {medicamentos.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-start">
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                                    <Pill className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-800">Medicamentos asociados</h4>
                                    {loadingMedicamentos ? (
                                        <div className="flex items-center space-x-3 text-green-600 mt-4 bg-green-50 rounded-lg p-4">
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-200 border-t-green-600"></div>
                                            <span className="font-medium">Cargando medicamentos...</span>
                                        </div>
                                    ) : (
                                        <div className="mt-4 space-y-4">
                                            {medicamentos.map((medicamento) => (
                                                <MedicamentoAsociado
                                                    key={medicamento.id_medicamento}
                                                    medicamento={medicamento}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Btn volver */}
                    <div className="pt-4">
                        <button
                            onClick={handleVolver}
                            className="cursor-pointer bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-3 border border-gray-200 font-medium"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Volver</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnfermedadDetalle