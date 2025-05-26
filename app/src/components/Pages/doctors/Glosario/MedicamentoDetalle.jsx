import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft, Pill, AlertTriangle, Info, Activity,
    Stethoscope,
    Worm
} from 'lucide-react'
import useMedicamentos from '../../../../hooks/useMedicamentos'

const MedicamentoDetalle = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { obtenerMedicamentoPorId, cargarEnfermedadesPorMedicamento, isLoading, error } = useMedicamentos()
    const [medicamento, setMedicamento] = useState(null)
    const [enfermedades, setEnfermedades] = useState([])
    const [loadingEnfermedades, setLoadingEnfermedades] = useState(false)

    useEffect(() => {
        const cargarMedicamento = async () => {
            try {
                const data = await obtenerMedicamentoPorId(id)
                setMedicamento(data)

                if (data) {
                    setLoadingEnfermedades(true)
                    try {
                        const enfermedadesData = await cargarEnfermedadesPorMedicamento(id)
                        setEnfermedades(enfermedadesData || [])
                    } catch (err) {
                        console.error('Error al cargar enfermedades:', err)
                    } finally {
                        setLoadingEnfermedades(false)
                    }
                }
            } catch (err) {
                console.error('Error al cargar medicamento:', err)
            }
        }

        if (id) cargarMedicamento()
    }, [id])

    const handleVolver = () => navigate('/Home/glosario')

    if (isLoading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4 text-center space-y-6">
                    <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-blue-600 mx-auto" 
                         style={{ borderTopColor: "var(--primary-color)" }}></div>
                    <p className="text-gray-700 text-lg font-medium">Cargando medicamento...</p>
                </div>
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

    if (!medicamento) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4 text-center space-y-6">
                    <div className="bg-gray-100 rounded-full p-4 w-fit mx-auto">
                        <Pill className="h-12 w-12 text-gray-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Medicamento no encontrado</h2>
                    <p className="text-gray-600">No se pudo encontrar la información del medicamento solicitado.</p>
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
            <div className=" mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Medicamento principal */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-start">
                            <div className="p-3 rounded-full bg-blue-100 mr-4" style={{ color: "var(--primary-color)" }}>
                                <Pill className="h-7 w-7" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">{medicamento.nombre}</h1>
                                <p className="text-blue-600 font-semibold text-lg mb-4" style={{ color: "var(--primary-color)" }}>
                                    {medicamento.categoria || 'Sin categoría'}
                                </p>
                                {medicamento.desc && <p className="text-gray-700 mb-4 leading-relaxed">{medicamento.desc}</p>}
                                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                      style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "var(--primary-color)" }}>
                                    {medicamento.forma_via || 'No especificada'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Dosis */}
                    {medicamento.dosis && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-start">
                                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-800">Dosis</h4>
                                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 font-medium leading-relaxed">{medicamento.dosis}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enfermedades */}
                    {enfermedades.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-start">
                                <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                                    <Worm className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-800">Enfermedades asociadas</h4>
                                    {loadingEnfermedades ? (
                                        <div className="flex items-center space-x-3 text-purple-600 mt-4 bg-purple-50 rounded-lg p-4">
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-200 border-t-purple-600"></div>
                                            <span className="font-medium">Cargando enfermedades...</span>
                                        </div>
                                    ) : (
                                        <div className="mt-4 space-y-4">
                                            {enfermedades.map((enf) => (
                                                <div key={enf.id_enfermedad} className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <h5 className="font-bold text-gray-800 text-lg mb-2">{enf.nombre}</h5>
                                                            <p className="text-blue-600 font-semibold mb-3" style={{ color: "var(--primary-color)" }}>
                                                                {enf.categoria}
                                                            </p>
                                                            {enf.desc && (
                                                                <p className="text-gray-700 mb-3 leading-relaxed">{enf.desc}</p>
                                                            )}
                                                            {enf.sintomas && (
                                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                                                                    <p className="text-gray-700">
                                                                        <span className="font-semibold text-yellow-600">Síntomas:</span> {enf.sintomas}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {enf.codigo_cie && (
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-500">
                                                                    CIE: {enf.codigo_cie}
                                                                </span>
                                                            )}
                                                            {enf.MedicamentoEnfermedad?.eficacia && (
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    Eficacia: {enf.MedicamentoEnfermedad.eficacia}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {enf.MedicamentoEnfermedad?.dosis_recomendada && (
                                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                                <p className=" font-medium" style={{ color: "var(--primary-color)" }}>
                                                                    <span className="font-semibold">Dosis recomendada:</span> {enf.MedicamentoEnfermedad.dosis_recomendada}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Efectos secundarios */}
                    {medicamento.efectos_secundarios && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-start">
                                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-800">Efectos secundarios del medicamento</h4>
                                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <p className="text-gray-700 font-medium leading-relaxed">{medicamento.efectos_secundarios}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botón volver */}
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

export default MedicamentoDetalle