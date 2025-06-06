import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { usePacienteHistorial } from "../../../../hooks/medical/usePacienteHistorial"
import { useCitaPDF } from "../../../../hooks/medical/useCitaPDF"
import {
    ClipboardList,
    Calendar,
    AlertCircle,
    X,
    CheckCircle,
    ClockIcon as ClockPending,
    XCircle
} from "lucide-react"
import { generateCitaPDF } from "../../../Common/pdfcreator"
import useFormat from "../../../../hooks/useFormat"
import ModalEditarCita from "./ModalEditarCita"
import ModalCancelarCita from "./ModalCancelarCita"
import LoadingScreen from "../../../Common/LoadingScreen"
import CitaCard from "./CitaCard"
import { deleteCita } from "../../../../services/apiCitas"

const HistorialPaciente = () => {
    const { pacienteId: urlPacienteId } = useParams()
    const [pacienteId, setPacienteId] = useState(null)
    const [isLoadingUserId, setIsLoadingUserId] = useState(true)
    const [modalEditarCita, setModalEditarCita] = useState(null)
    const [modalCancelarCita, setModalCancelarCita] = useState(null)
    const [loadingDelete, setLoadingDelete] = useState(false)

    // Estados para notificaciones
    const [error, setError] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)

    const { formatDate, formatHour } = useFormat()

    // Función para mostrar mensajes temporales
    const showSuccessMessage = () => {
        setError("")
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const showErrorMessage = (message) => {
        setShowSuccess(false)
        setError(message)
        setTimeout(() => setError(""), 3000)
    }

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId")
        setPacienteId(storedUserId || urlPacienteId)
        setIsLoadingUserId(false)
    }, [urlPacienteId])

    const { citas, diagnosticos, citasPorEstado, loading, error: historialError, cargarHistorial } =
        usePacienteHistorial(pacienteId)

    const { obtenerDatosPDF, loading: pdfLoading, error: pdfError } = useCitaPDF()

    const handleGenerarPDF = async (cita) => {
        try {
            const datosPDF = await obtenerDatosPDF(cita)
            await generateCitaPDF(datosPDF, formatHour)
            showSuccessMessage()
        } catch (error) {
            console.error("Error al generar PDF:", error)
            showErrorMessage("Error al generar el PDF: " + error.message)
        }
    }

    const confirmarCancelacion = async () => {
        if (!modalCancelarCita) return

        try {
            setLoadingDelete(true)
            await deleteCita(modalCancelarCita.id_cita)
            showSuccessMessage()
            setModalCancelarCita(null)
            await cargarHistorial()
        } catch (error) {
            console.error("Error al cancelar cita:", error)
            showErrorMessage("Error al cancelar la cita: " + error.message)
        } finally {
            setLoadingDelete(false)
        }
    }

    const confirmarCambioHorario = async (nuevaFecha, nuevaHoraInicio, nuevaHoraFin) => {
        try {
            showSuccessMessage()
            setModalEditarCita(null)
            await cargarHistorial()
        } catch (error) {
            console.error("Error al cambiar horario:", error)
            showErrorMessage("Error al cambiar el horario: " + error.message)
        }
    }

    const getDiagnosticoPorCita = (citaId) => {
        return diagnosticos.find((diag) => diag.cita_id === citaId)
    }

    const estadosAMostrar = ["Pendiente", "Completada", "No asistida"]

    if (isLoadingUserId || loading) {
        return <LoadingScreen />
    }

    if (!pacienteId) {
        return (
            <div className="min-h-screen bg-[#f9fafb] pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-2xl mx-auto">
                        <div className="flex">
                            <XCircle className="h-5 w-5 text-red-400" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">Sesión no encontrada</p>
                                <p className="text-sm text-red-700">
                                    No se encontró información de usuario. Por favor, inicia sesión nuevamente.
                                </p>
                                <button
                                    onClick={() => (window.location.href = "/login")}
                                    className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                                >
                                    Ir a Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Error de carga
    if (historialError) {
        return (
            <div className="min-h-screen bg-[#f9fafb] pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-2xl mx-auto">
                        <div className="flex">
                            <XCircle className="h-5 w-5 text-red-400" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">Error al cargar el historial</p>
                                <p className="text-sm text-red-700">{historialError}</p>
                                <button
                                    onClick={cargarHistorial}
                                    className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                                >
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f9fafb] pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Alert Messages */}
                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <XCircle className="h-5 w-5 text-red-400" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">Error al procesar</p>
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {showSuccess && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
                        <div className="flex">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">¡Operación exitosa!</p>
                                <p className="text-sm text-green-700">La acción se ha completado correctamente.</p>
                            </div>
                        </div>
                    </div>
                )}

                {pdfError && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <XCircle className="h-5 w-5 text-red-400" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">Error al generar PDF</p>
                                <p className="text-sm text-red-700">{pdfError}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="bg-white border border-[#e5e7eb] shadow-sm mb-6">
                    <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-[#00629B]" />
                                <h2 className="text-lg font-semibold text-[#1f2937]">Historial Médico</h2>
                            </div>
                            <p className="text-[#6b7280] text-sm mt-1">Visualiza y gestiona tus citas médicas</p>
                        </div>
                    </div>
                </div>

                {/* Grid de citas por estado */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {estadosAMostrar.map((estado) => {
                        const citasDelEstado = citasPorEstado[estado] || []
                        const iconos = {
                            Pendiente: <ClockPending className="h-5 w-5 text-yellow-500" />,
                            Completada: <CheckCircle className="h-5 w-5 text-green-500" />,
                            "No asistida": <X className="h-5 w-5 text-red-500" />,
                        }

                        return (
                            <div key={estado} className="bg-white border border-[#e5e7eb] shadow-sm">
                                <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
                                    <h3 className="text-lg font-semibold text-[#1f2937] flex items-center gap-2">
                                        {iconos[estado]}
                                        {`Citas ${estado.toLowerCase()}s`}
                                    </h3>
                                </div>

                                <div className="p-6">
                                    {citasDelEstado.length > 0 ? (
                                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                            {citasDelEstado.map((cita) => {
                                                const diagnosticoAsociado = getDiagnosticoPorCita(cita.id_cita)
                                                const esPendiente = estado === "Pendiente"

                                                return (
                                                    <CitaCard
                                                        key={cita.id_cita}
                                                        cita={cita}
                                                        tipo={estado}
                                                        diagnosticoAsociado={diagnosticoAsociado}
                                                        esPendiente={esPendiente}
                                                        formatDate={formatDate}
                                                        formatHour={formatHour}
                                                        handleEditarCita={setModalEditarCita}
                                                        handleCancelarCita={setModalCancelarCita}
                                                        handleGenerarPDF={handleGenerarPDF}
                                                        pdfLoading={pdfLoading}
                                                    />
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="bg-[#f9fafb] rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                                {iconos[estado] ? (
                                                    React.cloneElement(iconos[estado], {
                                                        className: "h-8 w-8 text-[#6b7280]"
                                                    })
                                                ) : (
                                                    <ClipboardList className="h-8 w-8 text-[#6b7280]" />
                                                )}
                                            </div>
                                            <p className="text-[#6b7280]">
                                                {`No hay citas ${estado.toLowerCase()}s`}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Modales */}
                {modalEditarCita && (
                    <ModalEditarCita
                        cita={modalEditarCita}
                        onClose={() => setModalEditarCita(null)}
                        onSubmit={confirmarCambioHorario}
                        formatDate={formatDate}
                    />
                )}

                {modalCancelarCita && (
                    <ModalCancelarCita
                        cita={modalCancelarCita}
                        onClose={() => setModalCancelarCita(null)}
                        onConfirm={confirmarCancelacion}
                        formatDate={formatDate}
                        formatHour={formatHour}
                        loading={loadingDelete}
                    />
                )}
            </div>
        </div>
    )
}

export default HistorialPaciente