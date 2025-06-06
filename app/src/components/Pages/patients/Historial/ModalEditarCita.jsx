import { useState, useEffect, useCallback } from "react"
import { X, Calendar, Clock, AlertCircle } from "lucide-react"
import { getHorarioByDoctorId } from "../../../../services/apiHorarios"
import { getCitasByDoctor, updateCita } from "../../../../services/apiCitas"

const ModalEditarCita = ({ cita, onClose, onSubmit }) => {
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

    // Función para normalizar fechas (evitar problemas de zona horaria)
    const normalizeDate = useCallback((dateStr) => {
        if (!dateStr) return ""
        try {
            // Si ya está en formato YYYY-MM-DD, devolverlo tal como está
            if (typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return dateStr
            }
            // Si es un objeto Date o string de fecha completa, convertir a YYYY-MM-DD
            const date = new Date(dateStr)
            if (isNaN(date.getTime())) return ""

            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        } catch (error) {
            console.error("Error normalizando fecha:", error)
            return ""
        }
    }, [])

    // Función para normalizar tiempo
    const normalizeTime = useCallback((timeStr) => {
        if (!timeStr) return ""
        try {
            // Si ya está en formato HH:MM:SS, devolverlo tal como está
            if (typeof timeStr === 'string' && timeStr.match(/^\d{2}:\d{2}:\d{2}$/)) {
                return timeStr
            }
            // Si es formato HH:MM, agregar :00
            if (typeof timeStr === 'string' && timeStr.match(/^\d{2}:\d{2}$/)) {
                return `${timeStr}:00`
            }
            return timeStr
        } catch (error) {
            console.error("Error normalizando tiempo:", error)
            return ""
        }
    }, [])

    useEffect(() => {
        if (cita) {
            const normalizedDate = normalizeDate(cita.fecha)
            const normalizedStartTime = normalizeTime(cita.hora_inicio)
            const normalizedEndTime = normalizeTime(cita.hora_fin)

            console.log("Inicializando valores:", {
                fecha: normalizedDate,
                hora_inicio: normalizedStartTime,
                hora_fin: normalizedEndTime,
                original: cita
            })

            setSelectedDate(normalizedDate)
            setSelectedTime(normalizedStartTime)
            setEndTime(normalizedEndTime)
        }
    }, [cita, normalizeDate, normalizeTime])

    const getDayNameInSpanish = useCallback((fecha) => {
        try {
            // Crear fecha local para evitar problemas de zona horaria
            const [year, month, day] = fecha.split('-').map(Number)
            const date = new Date(year, month - 1, day)
            const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
            return days[date.getDay()]
        } catch (error) {
            console.error("Error obteniendo día de la semana:", error)
            return ""
        }
    }, [])

    const generateTimeSlots = useCallback((startTime, endTime) => {
        const slots = []
        try {
            // Usar fecha fija UTC para evitar problemas de zona horaria
            const baseDate = '1970-01-01T'
            const start = new Date(`${baseDate}${startTime}`)
            const end = new Date(`${baseDate}${endTime}`)

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                console.error("Tiempos inválidos:", { startTime, endTime })
                return slots
            }

            const current = new Date(start)
            while (current < end) {
                const timeString = current.toTimeString().slice(0, 8)
                slots.push(timeString)
                current.setMinutes(current.getMinutes() + 30)
            }
        } catch (error) {
            console.error("Error generando slots de tiempo:", error)
        }

        return slots
    }, [])

    const calculateAvailableSlots = useCallback(
        (horarios, citasOcupadas, fecha) => {
            if (!horarios || horarios.length === 0 || !fecha) return []

            try {
                const diaSemana = getDayNameInSpanish(fecha)
                if (!diaSemana) return []

                const horariosDelDia = horarios.filter((horario) => horario.dia_semana === diaSemana)
                if (horariosDelDia.length === 0) return []

                // Filtrar citas del mismo día (excluyendo la cita actual)
                const citasDelDia = citasOcupadas.filter((citaItem) => {
                    const fechaCitaNormalizada = normalizeDate(citaItem.fecha)
                    const fechaSeleccionadaNormalizada = normalizeDate(fecha)
                    const esLaMismaCita = citaItem.id_cita === cita?.id_cita

                    return fechaCitaNormalizada === fechaSeleccionadaNormalizada && !esLaMismaCita
                })

                // Generar todos los slots disponibles
                let todosLosSlots = []
                horariosDelDia.forEach((horario) => {
                    const slots = generateTimeSlots(horario.hora_inicio, horario.hora_fin)
                    todosLosSlots = [...todosLosSlots, ...slots]
                })

                // Filtrar slots ocupados
                const slotsLibres = todosLosSlots.filter((slot) => {
                    return !citasDelDia.some((citaItem) => {
                        const horaCitaNormalizada = normalizeTime(citaItem.hora_inicio)
                        return horaCitaNormalizada === slot
                    })
                })

                const slotsUnicos = [...new Set(slotsLibres)].sort()
                console.log("Slots calculados:", {
                    fecha,
                    diaSemana,
                    horariosDelDia: horariosDelDia.length,
                    citasDelDia: citasDelDia.length,
                    todosLosSlots: todosLosSlots.length,
                    slotsLibres: slotsUnicos.length
                })

                return slotsUnicos
            } catch (error) {
                console.error("Error calculando slots disponibles:", error)
                return []
            }
        },
        [generateTimeSlots, getDayNameInSpanish, cita?.id_cita, normalizeDate, normalizeTime],
    )

    const getAvailableDays = useCallback((horarios) => {
        if (!horarios || horarios.length === 0) return []

        const dias = [...new Set(horarios.map((h) => h.dia_semana))]
        const diasOrdenados = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

        return diasOrdenados.filter((dia) => dias.includes(dia))
    }, [])

    const getDoctorId = useCallback(() => {
        return cita?.doctor_id || cita?.doctorId || cita?.medico_id
    }, [cita])

    const loadDoctorData = useCallback(async () => {
        const doctorId = getDoctorId()

        if (!doctorId) {
            console.warn("No se encontró doctorId en la cita:", cita)
            setError("No se pudo identificar el doctor de la cita")
            return
        }

        setLoading(true)
        setError(null)

        try {
            console.log("Cargando datos para doctor:", doctorId)

            const [horariosResponse, citasResponse] = await Promise.all([
                getHorarioByDoctorId(doctorId),
                getCitasByDoctor(doctorId),
            ])

            // Procesar horarios
            let horarioData = []
            if (horariosResponse?.data) {
                horarioData = Array.isArray(horariosResponse.data) ? horariosResponse.data : [horariosResponse.data]
            } else if (Array.isArray(horariosResponse)) {
                horarioData = horariosResponse
            } else if (horariosResponse) {
                horarioData = [horariosResponse]
            }

            // Procesar citas
            let citasData = []
            if (citasResponse?.data) {
                citasData = Array.isArray(citasResponse.data) ? citasResponse.data : [citasResponse.data]
            } else if (Array.isArray(citasResponse)) {
                citasData = citasResponse
            } else if (citasResponse) {
                citasData = [citasResponse]
            }

            console.log("Datos cargados:", {
                horarios: horarioData.length,
                citas: citasData.length
            })

            setHorarioDisponible(horarioData)
            setCitasExistentes(citasData)
            setAvailableDays(getAvailableDays(horarioData))

            if (horarioData.length === 0) {
                setError("No se encontraron horarios disponibles para este doctor")
            }
        } catch (err) {
            console.error("Error al cargar datos:", err)
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

            // Si el tiempo seleccionado ya no está disponible, limpiar selección
            if (selectedTime && !slotsLibres.includes(selectedTime)) {
                console.log("Tiempo seleccionado ya no disponible, limpiando:", selectedTime)
                setSelectedTime("")
                setEndTime("")
            }
        }
    }, [selectedDate, horarioDisponible, citasExistentes, calculateAvailableSlots, selectedTime])

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

        try {
            const baseDate = '1970-01-01T'
            const start = new Date(`${baseDate}${startTime}`)
            if (isNaN(start.getTime())) return ""

            start.setMinutes(start.getMinutes() + 30)
            return start.toTimeString().slice(0, 8)
        } catch (error) {
            console.error("Error calculando hora de fin:", error)
            return ""
        }
    }, [])

    const handleTimeChange = (time) => {
        console.log("Cambio de tiempo:", time)
        setSelectedTime(time)
        setEndTime(calculateEndTime(time))
        setError(null)
    }

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
        if (!calculatedEndTime) {
            setError("Error calculando la hora de fin")
            return
        }

        setUpdating(true)
        setError(null)

        try {
            // Asegurar consistencia en los IDs
            const doctorId = cita.doctor_id || cita.doctorId || cita.medico_id
            const patientId = cita.patient_id || cita.paciente_id

            if (!doctorId || !patientId) {
                throw new Error("IDs de doctor o paciente no encontrados")
            }

            const citaActualizada = {
                patient_id: patientId,
                doctor_id: doctorId,
                fecha: selectedDate,
                hora_inicio: selectedTime,
                hora_fin: calculatedEndTime,
                estado: cita.estado || "Pendiente",
            }

            console.log("Actualizando cita:", {
                id: cita.id_cita,
                datos: citaActualizada
            })

            await updateCita(cita.id_cita, citaActualizada)
            console.log("Cita actualizada exitosamente")

            if (onSubmit) {
                onSubmit(selectedDate, selectedTime, calculatedEndTime)
            }

            onClose()
        } catch (err) {
            console.error("Error al actualizar cita:", err)
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

    const displayDate = (fecha) => {
        if (!fecha) return ""
        const normalized = normalizeDate(fecha)
        if (!normalized) return fecha

        try {
            const [year, month, day] = normalized.split('-')
            const date = new Date(year, month - 1, day)
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } catch (error) {
            return normalized
        }
    }

    const displayTime = (time) => {
        if (!time) return ""
        try {
            return time.substring(0, 5) // HH:MM format
        } catch (error) {
            return time
        }
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
                                    {displayDate(cita.fecha)} • {displayTime(cita.hora_inicio)} - {displayTime(cita.hora_fin)}
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
                                            console.log("Cambio de fecha:", e.target.value)
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
                                            onChange={(e) => handleTimeChange(e.target.value)}
                                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:border-transparent transition-all duration-200"
                                            required
                                            disabled={updating}
                                        >
                                            <option value="">Seleccionar hora</option>
                                            {horariosLibres.map((hora) => (
                                                <option key={hora} value={hora}>
                                                    {displayTime(hora)}
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
                            {selectedTime && endTime && (
                                <div>
                                    <label className="block text-sm font-medium text-[#1e293b] mb-2">Hora de Fin</label>
                                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                                        <span className="text-[#64748b]">{displayTime(endTime)}</span>
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