import { useState, useEffect, useCallback } from 'react';
import { getDoctorById, getAllDoctors } from '../../services/apiDoctor';
import { getHorarioByDoctorId } from '../../services/apiHorarios';
import { getCitasByDoctor, getCitasByPatient, createCita, checkExistingCita } from '../../services/apiCitas';

const useSolicitarCita = () => {
    const [loading, setLoading] = useState(false);
    const [loadingDoctors, setLoadingDoctors] = useState(false);
    const [error, setError] = useState(null);
    const [doctores, setDoctores] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [horarioDisponible, setHorarioDisponible] = useState([]);
    const [citasExistentes, setCitasExistentes] = useState([]);
    const [misCitas, setMisCitas] = useState([]);
    const [horariosLibres, setHorariosLibres] = useState([]);

    const getPatientId = () => {
        return localStorage.getItem("userId") || "";
    };

    // FIXED: Cargar todos los doctores
    const loadAllDoctors = useCallback(async () => {
        if (loadingDoctors) return; // Prevenir múltiples llamadas simultáneas

        setLoadingDoctors(true);
        setError(null);

        try {
            console.log('🔄 Iniciando carga de doctores...');
            const response = await getAllDoctors();
            console.log('📦 Respuesta cruda de API:', response);

            // FIXED: Manejar diferentes estructuras de respuesta
            let doctoresData;
            if (response?.data) {
                doctoresData = Array.isArray(response.data) ? response.data : [response.data];
            } else if (Array.isArray(response)) {
                doctoresData = response;
            } else if (response) {
                doctoresData = [response];
            } else {
                doctoresData = [];
            }

            console.log('✅ Doctores procesados:', doctoresData);
            setDoctores(doctoresData);

            if (doctoresData.length === 0) {
                console.warn('⚠️ No se encontraron doctores');
                setError('No se encontraron doctores disponibles');
            }

            return doctoresData;
        } catch (err) {
            console.error('❌ Error al cargar doctores:', err);
            console.error('📝 Detalles completos del error:', {
                message: err.message,
                response: err.response,
                status: err.response?.status,
                data: err.response?.data
            });

            const errorMessage = err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                'Error desconocido al cargar doctores';
            setError(`Error al cargar doctores: ${errorMessage}`);
            setDoctores([]);
            return [];
        } finally {
            // FIXED: Asegurar que loading siempre se resetee
            setTimeout(() => setLoadingDoctors(false), 100);
        }
    }, []); // FIXED: Remover loadingDoctors de dependencias para evitar loops

    // Obtener nombre del día
    const getDayNameInSpanish = useCallback((fecha) => {
        const date = new Date(fecha);
        const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        return days[date.getDay()];
    }, []);

    // generar slots de 30 min
    const generateTimeSlots = useCallback((startTime, endTime) => {
        const slots = [];
        const start = new Date(`2024-01-01 ${startTime}`);
        const end = new Date(`2024-01-01 ${endTime}`);

        let current = new Date(start);

        while (current < end) {
            const timeString = current.toTimeString().slice(0, 5);
            slots.push(timeString);
            current.setMinutes(current.getMinutes() + 30);
        }

        return slots;
    }, []);

    // FIXED: obtener información del doctor
    const loadDoctorInfo = useCallback(async (doctorId) => {
        setLoading(true);
        setError(null);

        try {
            console.log('🔄 Cargando info del doctor:', doctorId);
            const doctorData = await getDoctorById(doctorId);
            console.log('✅ Doctor cargado:', doctorData);
            setSelectedDoctor(doctorData);
            return doctorData;
        } catch (err) {
            console.error('❌ Error al cargar doctor:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Error al cargar información del doctor';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // FIXED: obtener horarios del doctor
    const loadDoctorSchedule = useCallback(async (doctorId) => {
        setLoading(true);
        setError(null);

        try {
            console.log('🔄 Cargando horarios del doctor:', doctorId);
            const response = await getHorarioByDoctorId(doctorId);
            console.log('📦 Respuesta horarios:', response);

            // FIXED: Manejar diferentes estructuras de respuesta
            let horarioData;
            if (response?.data) {
                horarioData = Array.isArray(response.data) ? response.data : [response.data];
            } else if (Array.isArray(response)) {
                horarioData = response;
            } else if (response) {
                horarioData = [response];
            } else {
                horarioData = [];
            }

            console.log('✅ Horarios procesados:', horarioData);
            setHorarioDisponible(horarioData);
            return horarioData;
        } catch (err) {
            console.error('❌ Error al cargar horarios:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Error al cargar horarios';
            setError(errorMessage);
            setHorarioDisponible([]);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // obtener citas existentes del doctor
    const loadExistingAppointments = useCallback(async (doctorId) => {
        setLoading(true);
        setError(null);

        try {
            console.log('🔄 Cargando citas existentes del doctor:', doctorId);
            const response = await getCitasByDoctor(doctorId);
            console.log('📦 Respuesta citas:', response);

            // FIXED: Manejar diferentes estructuras de respuesta
            let citasData;
            if (response?.data) {
                citasData = Array.isArray(response.data) ? response.data : [response.data];
            } else if (Array.isArray(response)) {
                citasData = response;
            } else if (response) {
                citasData = [response];
            } else {
                citasData = [];
            }

            console.log('✅ Citas procesadas:', citasData);
            setCitasExistentes(citasData);
            return citasData;
        } catch (err) {
            console.error('❌ Error al cargar citas existentes:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Error al cargar citas existentes';
            setError(errorMessage);
            setCitasExistentes([]);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // cargar las citas del paciente
    const loadPatientAppointments = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const patientId = getPatientId();
            if (!patientId) {
                setMisCitas([]);
                return [];
            }

            console.log('🔄 Cargando citas del paciente:', patientId);
            const response = await getCitasByPatient(patientId);
            console.log('📦 Respuesta mis citas:', response);

            // FIXED: Manejar diferentes estructuras de respuesta
            let citasData;
            if (response?.data) {
                citasData = Array.isArray(response.data) ? response.data : [response.data];
            } else if (Array.isArray(response)) {
                citasData = response;
            } else if (response) {
                citasData = [response];
            } else {
                citasData = [];
            }

            console.log('✅ Mis citas procesadas:', citasData);
            setMisCitas(citasData);
            return citasData;
        } catch (err) {
            console.error('❌ Error al cargar mis citas:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Error al cargar mis citas';
            setError(errorMessage);
            setMisCitas([]);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // verificar si ya existe una cita con el doctor
    const checkExistingAppointment = useCallback(async (doctorId) => {
        try {
            const patientId = getPatientId();
            if (!patientId) return false;

            return await checkExistingCita(patientId, doctorId);
        } catch (err) {
            console.error('Error al verificar cita existente:', err);
            return false;
        }
    }, []);

    // obtener días disponibles del doctor
    const getAvailableDays = useCallback((horarios) => {
        if (!horarios || horarios.length === 0) return [];

        const dias = [...new Set(horarios.map(h => h.dia_semana))];
        const diasOrdenados = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

        return diasOrdenados.filter(dia => dias.includes(dia));
    }, []);

    // verificar si una fecha es válida 
    const isValidDate = useCallback((fecha, horarios) => {
        if (!fecha || !horarios || horarios.length === 0) return false;

        const diaSemana = getDayNameInSpanish(fecha);
        return horarios.some(horario => horario.dia_semana === diaSemana);
    }, [getDayNameInSpanish]);

    // calcular horarios libres
    const calculateAvailableSlots = useCallback((horarios, citasOcupadas, fecha) => {
        if (!horarios || horarios.length === 0) return [];

        const fechaSeleccionada = new Date(fecha).toDateString();
        const diaSemana = getDayNameInSpanish(fecha);

        const horariosDelDia = horarios.filter(horario =>
            horario.dia_semana === diaSemana
        );

        if (horariosDelDia.length === 0) {
            return [];
        }

        const citasDelDia = citasOcupadas.filter(cita => {
            const fechaCita = new Date(cita.fecha).toDateString();
            return fechaCita === fechaSeleccionada;
        });

        let todosLosSlots = [];

        // Generar slots para cada horario del día
        horariosDelDia.forEach(horario => {
            const slots = generateTimeSlots(horario.hora_inicio, horario.hora_fin);
            todosLosSlots = [...todosLosSlots, ...slots];
        });

        // Filtrar slots ocupados
        const slotsLibres = todosLosSlots.filter(slot => {
            return !citasDelDia.some(cita => {
                // Manejar diferentes formatos de hora
                let horaCita;
                if (cita.hora_inicio) {
                    horaCita = cita.hora_inicio.slice(0, 5);
                } else if (cita.fecha) {
                    horaCita = new Date(cita.fecha).toTimeString().slice(0, 5);
                }
                return horaCita === slot;
            });
        });

        // Remover duplicados y ordenar
        const slotsUnicos = [...new Set(slotsLibres)].sort();

        return slotsUnicos;
    }, [generateTimeSlots, getDayNameInSpanish]);

    // Cargar toda la información necesaria para un doctor
    const loadDoctorData = useCallback(async (doctorId, fecha = null) => {
        setLoading(true);
        setError(null);

        try {
            console.log('🔄 Cargando datos completos del doctor:', doctorId);
            // Cargar datos en paralelo
            const [doctor, horarios, citas] = await Promise.all([
                loadDoctorInfo(doctorId),
                loadDoctorSchedule(doctorId),
                loadExistingAppointments(doctorId)
            ]);

            // Si se proporciona una fecha, calcular slots disponibles
            if (fecha && horarios && citas) {
                const slotsLibres = calculateAvailableSlots(horarios, citas, fecha);
                setHorariosLibres(slotsLibres);
            }

            console.log('✅ Datos del doctor cargados completamente');
            return { doctor, horarios, citas };
        } catch (err) {
            console.error('❌ Error al cargar datos del doctor:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Error al cargar datos del doctor';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [loadDoctorInfo, loadDoctorSchedule, loadExistingAppointments, calculateAvailableSlots]);

    // Actualizar horarios libres cuando cambie la fecha
    const updateAvailableSlots = useCallback((fecha) => {
        if (horarioDisponible.length > 0 && citasExistentes.length >= 0) {
            const slotsLibres = calculateAvailableSlots(horarioDisponible, citasExistentes, fecha);
            setHorariosLibres(slotsLibres);
        }
    }, [horarioDisponible, citasExistentes, calculateAvailableSlots]);

    // Crear nueva cita
    const solicitarCita = useCallback(async (doctorId, fecha, hora, motivo = '') => {
        setLoading(true);
        setError(null);

        try {
            const patientId = getPatientId();

            if (!patientId) {
                throw new Error('No se encontró el ID del paciente');
            }

            // Verificar si ya existe una cita con este doctor
            const existeCita = await checkExistingAppointment(doctorId);
            if (existeCita) {
                throw new Error('Ya tiene una cita programada con este doctor');
            }

            const citaData = {
                doctorId: doctorId,
                patientId: patientId,
                fecha: fecha,
                hora: hora,
                motivo: motivo || 'Consulta médica'
            };

            const nuevaCita = await createCita(citaData);

            // Actualizar citas existentes para reflejar la nueva cita
            setCitasExistentes(prev => [...prev, nuevaCita]);

            // Recargar mis citas
            await loadPatientAppointments();

            // Recalcular horarios libres
            if (horarioDisponible.length > 0) {
                const slotsLibres = calculateAvailableSlots(
                    horarioDisponible,
                    [...citasExistentes, nuevaCita],
                    fecha
                );
                setHorariosLibres(slotsLibres);
            }

            return nuevaCita;
        } catch (err) {
            console.error('Error al solicitar cita:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Error al solicitar cita';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [horarioDisponible, citasExistentes, calculateAvailableSlots, checkExistingAppointment, loadPatientAppointments]);

    const isSlotAvailable = useCallback((fecha, hora) => {
        const fechaSeleccionada = new Date(fecha).toDateString();

        return !citasExistentes.some(cita => {
            const fechaCita = new Date(cita.fecha).toDateString();
            let horaCita;
            if (cita.hora_inicio) {
                horaCita = cita.hora_inicio.slice(0, 5);
            } else if (cita.fecha) {
                horaCita = new Date(cita.fecha).toTimeString().slice(0, 5);
            }

            return fechaCita === fechaSeleccionada && horaCita === hora;
        });
    }, [citasExistentes]);

    // Limpiar estado
    const clearData = useCallback(() => {
        setSelectedDoctor(null);
        setHorarioDisponible([]);
        setCitasExistentes([]);
        setHorariosLibres([]);
        setError(null);
    }, []);

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
        checkExistingAppointment,
        clearData,

        getPatientId
    };
};

export default useSolicitarCita;