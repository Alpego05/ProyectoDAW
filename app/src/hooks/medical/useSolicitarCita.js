import { useState, useCallback } from "react"
import { getDoctorById, getAllDoctors } from "../../services/apiDoctor"
import { getHorarioByDoctorId } from "../../services/apiHorarios"
import { getCitasByDoctor, getCitasByPatient, createCita } from "../../services/apiCitas"

const useSolicitarCita = () => {
    const [loading, setLoading] = useState(false)
    const [loadingDoctors, setLoadingDoctors] = useState(false)
    const [error, setError] = useState(null)
    const [doctores, setDoctores] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [horarioDisponible, setHorarioDisponible] = useState([])
    const [citasExistentes, setCitasExistentes] = useState([])
    const [misCitas, setMisCitas] = useState([])
    const [horariosLibres, setHorariosLibres] = useState([])

    const getPatientId = () => {
        return localStorage.getItem("userId") || ""
    }

    const loadAllDoctors = useCallback(async () => {
        if (loadingDoctors) return

        setLoadingDoctors(true)
        setError(null)

        try {
            const response = await getAllDoctors()
            let doctoresData
            if (response?.data) {
                doctoresData = Array.isArray(response.data) ? response.data : [response.data]
            } else if (Array.isArray(response)) {
                doctoresData = response
            } else if (response) {
                doctoresData = [response]
            } else {
                doctoresData = []
            }

            setDoctores(doctoresData)

            if (doctoresData.length === 0) {
                console.warn("No se encontraron doctores")
                setError("No se encontraron doctores disponibles")
            }

            return doctoresData
        } catch (err) {
            console.error("Error al cargar doctores:", err)
            const errorMessage ="Error desconocido al cargar doctores"
            setError(`Error al cargar doctores: ${errorMessage}`)
            setDoctores([])
            return []
        } finally {
            setTimeout(() => setLoadingDoctors(false), 100)
        }
    }, [])

    // Obtener nombre del día
    const getDay = useCallback((fecha) => {
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

    // obtener información del doctor
    const loadDoctorInfo = useCallback(async (doctorId) => {
        setLoading(true)
        setError(null)

        try {
            const doctorData = await getDoctorById(doctorId)
            setSelectedDoctor(doctorData)
            return doctorData
        } catch (err) {
            console.error("Error al cargar doctor:", err)
            const errorMessage = err.response?.data?.message || err.message || "Error al cargar información del doctor"
            setError(errorMessage)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const loadDoctorSchedule = useCallback(async (doctorId) => {
        setLoading(true)
        setError(null)

        try {
            const response = await getHorarioByDoctorId(doctorId)

            let horarioData
            if (response?.data) {
                horarioData = Array.isArray(response.data) ? response.data : [response.data]
            } else if (Array.isArray(response)) {
                horarioData = response
            } else if (response) {
                horarioData = [response]
            } else {
                horarioData = []
            }

            setHorarioDisponible(horarioData)
            return horarioData
        } catch (err) {
            console.error("Error al cargar horarios:", err)
            const errorMessage = err.response?.data?.message || err.message || "Error al cargar horarios"
            setError(errorMessage)
            setHorarioDisponible([])
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const loadExistingAppointments = useCallback(async (doctorId) => {
        setLoading(true)
        setError(null)

        try {
            const response = await getCitasByDoctor(doctorId)

            let citasData
            if (response?.data) {
                citasData = Array.isArray(response.data) ? response.data : [response.data]
            } else if (Array.isArray(response)) {
                citasData = response
            } else if (response) {
                citasData = [response]
            } else {
                citasData = []
            }

            setCitasExistentes(citasData)
            return citasData
        } catch (err) {
            console.error(err)
            const errorMessage = err.response?.data?.message || err.message || "Error al cargar citas existentes"
            setError(errorMessage)
            setCitasExistentes([])
            return []
        } finally {
            setLoading(false)
        }
    }, [])

    const loadPatientAppointments = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const patientId = getPatientId()
            if (!patientId) {
                setMisCitas([])
                return []
            }

            const response = await getCitasByPatient(patientId)

            let citasData
            if (response?.data) {
                citasData = Array.isArray(response.data) ? response.data : [response.data]
            } else if (Array.isArray(response)) {
                citasData = response
            } else if (response) {
                citasData = [response]
            } else {
                citasData = []
            }

            setMisCitas(citasData)
            return citasData
        } catch (err) {
            console.error(err)
            const errorMessage = err.response?.data?.message || err.message || "Error al cargar mis citas"
            setError(errorMessage)
            setMisCitas([])
            return []
        } finally {
            setLoading(false)
        }
    }, [])

    const getAvailableDays = useCallback((horarios) => {
        if (!horarios || horarios.length === 0) return []

        const dias = [...new Set(horarios.map((h) => h.dia_semana))]
        const diasOrdenados = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

        return diasOrdenados.filter((dia) => dias.includes(dia))
    }, [])

    // verificar si una fecha es válida
    const isValidDate = useCallback(
        (fecha, horarios) => {
            if (!fecha || !horarios || horarios.length === 0) return false

            const diaSemana = getDay(fecha)
            return horarios.some((horario) => horario.dia_semana === diaSemana)
        },
        [getDay],
    )

    const calculateAvailableSlots = useCallback(
        (horarios, citasOcupadas, fecha) => {
            if (!horarios || horarios.length === 0) return []

            const fechaSeleccionada = new Date(fecha).toDateString()
            const diaSemana = getDay(fecha)

            const horariosDelDia = horarios.filter((horario) => horario.dia_semana === diaSemana)

            if (horariosDelDia.length === 0) {
                return []
            }

            const citasDelDia = citasOcupadas.filter((cita) => {
                const fechaCita = new Date(cita.fecha).toDateString()
                return fechaCita === fechaSeleccionada
            })

            let todosLosSlots = []

            horariosDelDia.forEach((horario) => {
                const slots = generateTimeSlots(horario.hora_inicio, horario.hora_fin)
                todosLosSlots = [...todosLosSlots, ...slots]
            })

            const slotsLibres = todosLosSlots.filter((slot) => {
                return !citasDelDia.some((cita) => {
                    let horaCita
                    if (cita.hora_inicio) {
                        horaCita = cita.hora_inicio.slice(0, 5)
                    } else if (cita.fecha) {
                        horaCita = new Date(cita.fecha).toTimeString().slice(0, 5)
                    }
                    return horaCita === slot
                })
            })

            const slotsUnicos = [...new Set(slotsLibres)].sort()
            return slotsUnicos
        },
        [generateTimeSlots, getDay],
    )

    const loadDoctorData = useCallback(
        async (doctorId, fecha = null) => {
            setLoading(true)
            setError(null)

            try {
                const [doctor, horarios, citas] = await Promise.all([
                    loadDoctorInfo(doctorId),
                    loadDoctorSchedule(doctorId),
                    loadExistingAppointments(doctorId),
                ])

                if (fecha && horarios && citas) {
                    const slotsLibres = calculateAvailableSlots(horarios, citas, fecha)
                    setHorariosLibres(slotsLibres)
                }

                return { doctor, horarios, citas }
            } catch (err) {
                console.error("Error al cargar datos del doctor:", err)
                const errorMessage = err.response?.data?.message || err.message || "Error al cargar datos del doctor"
                setError(errorMessage)
                throw err
            } finally {
                setLoading(false)
            }
        },
        [loadDoctorInfo, loadDoctorSchedule, loadExistingAppointments, calculateAvailableSlots],
    )

    const updateAvailableSlots = useCallback(
        (fecha) => {
            if (horarioDisponible.length > 0 && citasExistentes.length >= 0) {
                const slotsLibres = calculateAvailableSlots(horarioDisponible, citasExistentes, fecha)
                setHorariosLibres(slotsLibres)
            }
        },
        [horarioDisponible, citasExistentes, calculateAvailableSlots],
    )

    const solicitarCita = useCallback(
        async (doctorId, fecha, hora, motivo = "") => {
            setLoading(true)
            setError(null)

            try {
                const patientId = getPatientId()

                if (!patientId) {
                    throw new Error("No se encontró el ID del paciente")
                }

                // console.log(":", {
                //     doctorId,
                //     patientId,
                //     fecha,
                //     hora,
                //     motivo,
                // })

                const citaData = {
                    doctorId: doctorId,
                    patientId: patientId,
                    fecha: fecha,
                    hora: hora,
                    motivo: motivo || "Consulta médica",
                }


                const nuevaCita = await createCita(citaData)
                setCitasExistentes((prev) => [...prev, nuevaCita])
                await loadPatientAppointments()

                // Recalcular horarios libres
                if (horarioDisponible.length > 0) {
                    const slotsLibres = calculateAvailableSlots(horarioDisponible, [...citasExistentes, nuevaCita], fecha)
                    setHorariosLibres(slotsLibres)
                }
                // console.log("Cita creada exitosamente:", nuevaCita)
                return nuevaCita
            } catch (err) {
                console.error("Error al solicitar cita:", err)
                const errorMessage = err.response?.data?.message || err.message || "Error al solicitar cita"
                setError(errorMessage)
                throw err
            } finally {
                setLoading(false)
            }
        },
        [horarioDisponible, citasExistentes, calculateAvailableSlots, loadPatientAppointments],
    )

    const isSlotAvailable = useCallback(
        (fecha, hora) => {
            const fechaSeleccionada = new Date(fecha).toDateString()

            return !citasExistentes.some((cita) => {
                const fechaCita = new Date(cita.fecha).toDateString()
                let horaCita
                if (cita.hora_inicio) {
                    horaCita = cita.hora_inicio.slice(0, 5)
                } else if (cita.fecha) {
                    horaCita = new Date(cita.fecha).toTimeString().slice(0, 5)
                }

                return fechaCita === fechaSeleccionada && horaCita === hora
            })
        },
        [citasExistentes],
    )

    // Limpiar estado
    const clearData = useCallback(() => {
        setSelectedDoctor(null)
        setHorarioDisponible([])
        setCitasExistentes([])
        setHorariosLibres([])
        setError(null)
    }, [])

    return {
        // Estados
        loading,
        loadingDoctors,
        error,
        doctores,
        selectedDoctor,
        horarioDisponible,
        citasExistentes,
        misCitas,
        horariosLibres,

        // Funciones
        loadAllDoctors,
        loadDoctorData,
        loadPatientAppointments,
        updateAvailableSlots,
        solicitarCita,
        isSlotAvailable,
        isValidDate,
        getAvailableDays,
        clearData,

        getPatientId,
    }
}

export default useSolicitarCita
