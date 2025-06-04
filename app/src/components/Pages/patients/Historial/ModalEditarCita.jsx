import { useState, useEffect, useCallback } from "react"
import { X, Calendar, Clock, AlertCircle } from "lucide-react"
import { getHorarioByDoctorId } from "../../../../services/apiHorarios"
import { getCitasByDoctor, updateCita } from "../../../../services/apiCitas"
const ModalEditarCita = ({ cita, onClose, onSubmit, formatDate }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [horarioDisponible, setHorarioDisponible] = useState([])
    const [citasExistentes, setCitasExistentes] = useState([])
    const [horariosLibres, setHorariosLibres] = useState([])
    const [availableDays, setAvailableDays] = useState([])
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        if (cita) {
            setSelectedDate(cita.fecha?.split("T")[0] || "")
            setSelectedTime(cita.hora_inicio || "")
            setEndTime(cita.hora_fin || "")
        }
    }, [cita])

    const getDayNameInSpanish = useCallback((fecha) => {
        const date = new Date(fecha)
        const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
        return days[date.getDay()]
    }, [])

    const generateTimeSlots = useCallback((startTime, endTime) => {
        const slots = []
        const start = new Date(`2024-01-01 ${startTime}`)
        const end = new Date(`2024-01-01 ${endTime}`)

        const current = new Date(start)

        while (current < end) {
            const timeString = current.toTimeString().slice(0, 5)
            slots.push(timeString)
            current.setMinutes(current.getMinutes() + 30)
        }

        return slots
    }, [])

    const calculateAvailableSlots = useCallback(
        (horarios, citasOcupadas, fecha) => {
            if (!horarios || horarios.length === 0) return []

            const fechaSeleccionada = new Date(fecha).toDateString()
            const diaSemana = getDayNameInSpanish(fecha)

            const horariosDelDia = horarios.filter((horario) => horario.dia_semana === diaSemana)

            if (horariosDelDia.length === 0) {
                return []
            }

            const citasDelDia = citasOcupadas.filter((citaItem) => {
                const fechaCita = new Date(citaItem.fecha).toDateString()
                // FIXED: Excluir la cita actual que se está editando
                const esLaMismaCita = citaItem.id_cita === cita?.id_cita
                return fechaCita === fechaSeleccionada && !esLaMismaCita
            })

            let todosLosSlots = []

            horariosDelDia.forEach((horario) => {
                const slots = generateTimeSlots(horario.hora_inicio, horario.hora_fin)
                todosLosSlots = [...todosLosSlots, ...slots]
            })

            const slotsLibres = todosLosSlots.filter((slot) => {
                return !citasDelDia.some((citaItem) => {
                    let horaCita
                    if (citaItem.hora_inicio) {
                        horaCita = citaItem.hora_inicio.slice(0, 5)
                    } else if (citaItem.fecha) {
                        horaCita = new Date(citaItem.fecha).toTimeString().slice(0, 5)
                    }
                    return horaCita === slot
                })
            })

            const slotsUnicos = [...new Set(slotsLibres)].sort()
            return slotsUnicos
        },
        [generateTimeSlots, getDayNameInSpanish, cita?.id_cita],
    )

    const getAvailableDays = useCallback((horarios) => {
        if (!horarios || horarios.length === 0) return []

        const dias = [...new Set(horarios.map((h) => h.dia_semana))]
        const diasOrdenados = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

        return diasOrdenados.filter((dia) => dias.includes(dia))
    }, [])

    // FIXED: Obtener doctorId correctamente
    const getDoctorId = useCallback(() => {
        // Intentar diferentes propiedades donde puede estar el doctor ID
        return cita?.doctor_id || cita?.doctorId || cita?.medico_id
    }, [cita])

    const loadDoctorData = useCallback(async () => {
        const doctorId = getDoctorId()

        console.log("🔍 Cita completa:", cita)
        console.log("🔍 Doctor ID encontrado:", doctorId)

        if (!doctorId) {
            console.warn("No se encontró doctorId en la cita")
            setError("No se pudo identificar el doctor de la cita")
            return
        }

        setLoading(true)
        setError(null)

        try {
            console.log("🔄 Cargando datos para doctor:", doctorId)

            const [horariosResponse, citasResponse] = await Promise.all([
                getHorarioByDoctorId(doctorId),
                getCitasByDoctor(doctorId),
            ])

            console.log("📦 Respuesta horarios:", horariosResponse)
            console.log("📦 Respuesta citas:", citasResponse)

            // Procesar horarios
            let horarioData
            if (horariosResponse?.data) {
                horarioData = Array.isArray(horariosResponse.data) ? horariosResponse.data : [horariosResponse.data]
            } else if (Array.isArray(horariosResponse)) {
                horarioData = horariosResponse
            } else {
                horarioData = horariosResponse ? [horariosResponse] : []
            }

            // Procesar citas
            let citasData
            if (citasResponse?.data) {
                citasData = Array.isArray(citasResponse.data) ? citasResponse.data : [citasResponse.data]
            } else if (Array.isArray(citasResponse)) {
                citasData = citasResponse
            } else {
                citasData = citasResponse ? [citasResponse] : []
            }

            console.log("✅ Horarios procesados:", horarioData)
            console.log("✅ Citas procesadas:", citasData)

            setHorarioDisponible(horarioData)
            setCitasExistentes(citasData)
            setAvailableDays(getAvailableDays(horarioData))

            if (horarioData.length === 0) {
                setError("No se encontraron horarios disponibles para este doctor")
            }
        } catch (err) {
            console.error("❌ Error al cargar datos:", err)
            setError(`Error al cargar los horarios disponibles: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }, [cita, getAvailableDays, getDoctorId])

    useEffect(() => {
        loadDoctorData()
    }, [loadDoctorData])

    useEffect(() => {
        if (selectedDate && horarioDisponible.length > 0) {
            const slotsLibres = calculateAvailableSlots(horarioDisponible, citasExistentes, selectedDate)
            setHorariosLibres(slotsLibres)
        }
    }, [selectedDate, horarioDisponible, citasExistentes, calculateAvailableSlots])

    const isValidDate = useCallback(
        (fecha) => {
            if (!fecha || !horarioDisponible || horarioDisponible.length === 0) return false

            const diaSemana = getDayNameInSpanish(fecha)
            return horarioDisponible.some((horario) => horario.dia_semana === diaSemana)
        },
        [horarioDisponible, getDayNameInSpanish],
    )

    const calculateEndTime = useCallback((startTime) => {
        if (!startTime) return ""

        const start = new Date(`2024-01-01 ${startTime}`)
        start.setMinutes(start.getMinutes() + 30)
        return start.toTimeString().slice(0, 5)
    }, [])

    const handleTimeChange = (time) => {
        setSelectedTime(time)
        setEndTime(calculateEndTime(time))
    }

    // FIXED: Función para actualizar la cita
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedDate || !selectedTime) {
            setError("Por favor complete todos los campos requeridos")
            return
        }

        if (!isValidDate(selectedDate)) {
            setError("La fecha seleccionada no está disponible para este doctor")
            return
        }

        if (!horariosLibres.includes(selectedTime)) {
            setError("El horario seleccionado no está disponible")
            return
        }

        const calculatedEndTime = calculateEndTime(selectedTime)

        setUpdating(true)
        setError(null)

        try {
            console.log("🔄 Actualizando cita:", {
                id: cita.id_cita,
                fecha: selectedDate,
                hora_inicio: selectedTime,
                hora_fin: calculatedEndTime,
            })

            // FIXED: Crear objeto con los nombres de campo correctos para la base de datos
            const citaActualizada = {
                patient_id: cita.patient_id || cita.paciente_id, // FIXED: Usar patient_id
                doctor_id: cita.doctor_id || cita.medico_id, // FIXED: Usar doctor_id
                fecha: selectedDate,
                hora_inicio: selectedTime,
                hora_fin: calculatedEndTime,
                estado: cita.estado || "Pendiente",
            }

            console.log("📤 Datos a enviar:", citaActualizada)

            await updateCita(cita.id_cita, citaActualizada)

            console.log("✅ Cita actualizada exitosamente")

            // Llamar al callback del componente padre
            if (onSubmit) {
                onSubmit(selectedDate, selectedTime, calculatedEndTime)
            }

            onClose()
        } catch (err) {
            console.error("❌ Error al actualizar cita:", err)
            setError(`Error al actualizar la cita: ${err.message}`)
        } finally {
            setUpdating(false)
        }
    }

    const getMinDate = () => {
        const today = new Date()
        return today.toISOString().split("T")[0]
    }

    const getMaxDate = () => {
        const future = new Date()
        future.setDate(future.getDate() + 30)
        return future.toISOString().split("T")[0]
    }

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#e6f3f8] rounded-lg">
                            <Calendar className="h-5 w-5 text-[#0077b6]" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1e293b]">Cambiar Horario de Cita</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        disabled={updating}
                    >
                        <X className="h-5 w-5 text-[#64748b]" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Columna izquierda */}
                        <div className="flex-1 space-y-5">
                            {/* Información actual */}
                            <div className="bg-[#f8fafc] rounded-lg p-4">
                                <h4 className="text-sm font-medium text-[#475569] mb-2">Horario actual:</h4>
                                <p className="text-sm text-[#64748b]">
                                    {formatDate ? formatDate(cita.fecha) : cita.fecha} • {cita.hora_inicio} - {cita.hora_fin}
                                </p>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            {/* Nueva fecha */}
                            <div>
                                <label className="block text-sm font-medium text-[#1e293b] mb-2">Nueva Fecha</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => {
                                            setSelectedDate(e.target.value)
                                            setSelectedTime("")
                                            setEndTime("")
                                            setError(null)
                                        }}
                                        min={getMinDate()}
                                        max={getMaxDate()}
                                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:border-transparent transition-all duration-200"
                                        required
                                        disabled={updating}
                                    />
                                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                                </div>
                                {selectedDate && !isValidDate(selectedDate) && (
                                    <p className="text-xs text-red-500 mt-1">El doctor no tiene horarios disponibles este día</p>
                                )}
                            </div>

                            {/* Información de horarios disponibles */}
                            {availableDays.length > 0 && (
                                <div className="bg-[#e6f3f8] rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-[#0077b6] mb-2">Días disponibles del doctor:</h4>
                                    <ul className="grid grid-cols-2 gap-1">
                                        {availableDays.map((dia) => (
                                            <li key={dia} className="text-sm text-[#005b8a]">
                                                {dia.charAt(0).toUpperCase() + dia.slice(1)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Columna derecha */}
                        <div className="flex-1 space-y-5">
                            {/* Nueva hora de inicio */}
                            <div>
                                <label className="block text-sm font-medium text-[#1e293b] mb-2">Hora de Inicio</label>
                                <div className="relative">
                                    {loading ? (
                                        <div className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-50">
                                            <span className="text-[#64748b]">Cargando horarios...</span>
                                        </div>
                                    ) : horariosLibres.length > 0 ? (
                                        <select
                                            value={selectedTime}
                                            onChange={(e) => {
                                                handleTimeChange(e.target.value)
                                                setError(null)
                                            }}
                                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:border-transparent transition-all duration-200"
                                            required
                                            disabled={updating}
                                        >
                                            <option value="">Seleccionar hora</option>
                                            {horariosLibres.map((hora) => (
                                                <option key={hora} value={hora}>
                                                    {hora}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-50">
                                            <span className="text-[#64748b]">
                                                {selectedDate ? "No hay horarios disponibles" : "Seleccione una fecha primero"}
                                            </span>
                                        </div>
                                    )}
                                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                                </div>
                            </div>

                            {/* Hora de fin calculada */}
                            {selectedTime && (
                                <div>
                                    <label className="block text-sm font-medium text-[#1e293b] mb-2">Hora de Fin</label>
                                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                                        <span className="text-[#64748b]">{endTime}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-[#475569] hover:text-[#1e293b] hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
                            disabled={updating}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !selectedTime || error || updating}
                            className="px-6 py-2.5 bg-[#0077b6] text-white rounded-lg hover:bg-[#005b8a] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                            {updating ? "Actualizando..." : loading ? "Cargando..." : "Confirmar Cambio"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalEditarCita
