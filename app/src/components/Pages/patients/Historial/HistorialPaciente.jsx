import React from "react"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { usePacienteHistorial } from "../../../../hooks/medical/usePacienteHistorial"
import { useCitaPDF } from "../../../../hooks/medical/useCitaPDF"
import { ClipboardList, Calendar, AlertCircle, X, CheckCircle, ClockIcon as ClockPending } from "lucide-react"
import { generateCitaPDF } from "../../../Common/pdfcreator"
import useFormat from "../../../../hooks/useFormat"
import ModalEditarCita from ".//ModalEditarCita"
import ModalCancelarCita from "./ModalCancelarCita"
import LoadingScreen from "./../../../Common/LoadingScreen"
import CitaCard from "./CitaCard"
import { deleteCita } from "../../../../services/apiCitas"

const HistorialPaciente = () => {
    const { pacienteId: urlPacienteId } = useParams()
    const [pacienteId, setPacienteId] = useState(null)
    const [isLoadingUserId, setIsLoadingUserId] = useState(true)
    const [modalEditarCita, setModalEditarCita] = useState(null)
    const [modalCancelarCita, setModalCancelarCita] = useState(null)
    const [loadingDelete, setLoadingDelete] = useState(false)

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId")
        setPacienteId(storedUserId || urlPacienteId)
        setIsLoadingUserId(false)
    }, [urlPacienteId])

    const { citas, diagnosticos, citasPorEstado, loading, error, cargarHistorial, generarPDFDiagnostico } =
        usePacienteHistorial(pacienteId)

    const { obtenerDatosPDF, loading: pdfLoading, error: pdfError } = useCitaPDF()

    const { formatDate, formatHour } = useFormat()

    const handleGenerarPDF = async (cita) => {
        try {
            console.log("Generando PDF para cita:", cita)
            const datosPDF = await obtenerDatosPDF(cita)
            console.log("Datos obtenidos para PDF:", datosPDF)

            await generateCitaPDF(datosPDF, formatHour)
            console.log("PDF generado exitosamente")
        } catch (error) {
            console.error("Error completo al generar PDF:", error)
            console.error("Stack trace:", error.stack)
            alert("Ocurrió un error al generar el PDF: " + error.message)
        }
    }

    const handleEditarCita = (cita) => setModalEditarCita(cita)
    const handleCancelarCita = (cita) => setModalCancelarCita(cita)

    const confirmarCancelacion = async () => {
        try {
            setLoadingDelete(true)
            console.log("Cancelando cita:", modalCancelarCita)
            await deleteCita(modalCancelarCita.id_cita)

            alert("Cita cancelada exitosamente")
            setModalCancelarCita(null)

            await cargarHistorial()
        } catch (error) {
            console.error("Error al cancelar cita:", error)
            alert("Error al cancelar la cita: " + error.message)
        } finally {
            setLoadingDelete(false)
        }
    }

    // FIXED: Función para confirmar cambio de horario
    const confirmarCambioHorario = async (nuevaFecha, nuevaHoraInicio, nuevaHoraFin) => {
        try {
            console.log("✅ Horario cambiado exitosamente:", {
                cita: modalEditarCita.id_cita,
                fecha: nuevaFecha,
                hora_inicio: nuevaHoraInicio,
                hora_fin: nuevaHoraFin,
            })

            // Mostrar mensaje de éxito
            alert("Horario cambiado exitosamente")

            // Cerrar modal
            setModalEditarCita(null)

            // Recargar historial para mostrar los cambios
            await cargarHistorial()
        } catch (error) {
            console.error("Error al cambiar horario:", error)
            alert("Error al cambiar el horario: " + error.message)
        }
    }

    const getDiagnosticoPorCita = (citaId) => {
        return diagnosticos.find((diag) => diag.cita_id === citaId)
    }

    const estadosAMostrar = ["Pendiente", "Completada", "No asistida"]

    if (isLoadingUserId) {
        return <LoadingScreen />
    }

    if (!pacienteId) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 mb-6 mt-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            <h2 className="text-xl font-semibold">Historial Medico</h2>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Visualiza y gestiona tus citas médicas</p>
                    </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <AlertCircle className="h-12 w-12 text-gray-300" />
                        </div>
                        <div>
                            <h4 className="text-red-800 font-semibold text-lg">Sesión no encontrada</h4>
                            <p className="text-red-700">
                                No se encontró información de usuario. Por favor, inicia sesión nuevamente.
                            </p>
                            <button
                                onClick={() => (window.location.href = "/login")}
                                className="cursor-pointer mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                            >
                                Ir a Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return <LoadingScreen />
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 mb-6 mt-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            <h2 className="text-xl font-semibold">Historial Medico</h2>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Visualiza y gestiona tus citas médicas</p>
                    </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <AlertCircle className="h-12 w-12 text-gray-300" />
                        </div>
                        <div>
                            <h4 className="text-red-800 font-semibold text-lg">Error al cargar el historial</h4>
                            <p className="text-red-700">{error}</p>
                            <button
                                onClick={cargarHistorial}
                                className="cursor-pointer mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 mb-6 mt-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <h2 className="text-xl font-semibold">Historial Medico</h2>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Visualiza y gestiona tus citas médicas</p>
                </div>
            </div>

            {pdfError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">Error al generar PDF: {pdfError}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {estadosAMostrar.map((estado) => {
                    const citasDelEstado = citasPorEstado[estado] || []
                    const iconos = {
                        Pendiente: <ClockPending className="h-5 w-5 text-yellow-500" />,
                        Completada: <CheckCircle className="h-5 w-5 text-green-500" />,
                        "No asistida": <X className="h-5 w-5 text-red-500" />,
                    }

                    return (
                        <div key={estado} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-text-dark flex items-center gap-2">
                                    {iconos[estado] || <ClipboardList className="h-5 w-5" />}
                                    {`Citas ${estado.toLowerCase()}s`}
                                </h2>
                            </div>

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
                                                handleEditarCita={handleEditarCita}
                                                handleCancelarCita={handleCancelarCita}
                                                handleGenerarPDF={handleGenerarPDF}
                                                pdfLoading={pdfLoading}
                                            />
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-text-light">
                                    {iconos[estado] ? (
                                        React.cloneElement(iconos[estado], { className: "h-12 w-12 mx-auto mb-4 text-gray-300" })
                                    ) : (
                                        <ClipboardList className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    )}
                                    <p>{`No hay citas ${estado.toLowerCase()}`}s</p>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

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
    )
}

export default HistorialPaciente
