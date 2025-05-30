import { useState, useEffect } from 'react';
import { getCitasByPatient, getCitasByDoctor, updateCita } from '../services/apiCitas';
import { getPatientById } from '../services/apiPatient';
import { getDoctorById } from '../services/apiDoctor';
import { getDiagnosticosByPacienteId } from '../services/apiDiagnosticos';
import { getRecetasByPacienteId, getRecetasByDiagnosticoId } from '../services/apiRecetas';

import useFormat from './useFormat';

export const useCitas = () => {
    const [citas, setCitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCita, setSelectedCita] = useState(null);
    const [citaDetails, setCitaDetails] = useState({
        doctor: null,
        diagnostico: null,
        recetas: []
    });
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [detailsError, setDetailsError] = useState(null);

    const cargarCitas = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("No se encontró el ID del usuario en localStorage");

            const data = await getCitasByPatient(userId);
            setCitas(data);
        } catch (err) {
            console.error("Error al obtener citas:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al obtener las citas");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarCitas();
    }, []);

    const cargarDetallesCita = async (cita) => {
        if (!cita) return;

        setLoadingDetails(true);
        setDetailsError(null);

        try {
            //información del doctor
            console.log(cita.doctor_id)
            const doctorData = await getDoctorById(cita.doctor_id);
            const diagnosticosData = await getDiagnosticosByPacienteId(cita.paciente_id);
            const citaDiagnostico = diagnosticosData.find(d => d.cita_id === cita.id_cita);

            // obtener recetas 
            let recetasData = [];
            if (citaDiagnostico) {
                recetasData = await getRecetasByDiagnosticoId(citaDiagnostico.id_diagnostico);
            }

            setCitaDetails({
                doctor: doctorData,
                diagnostico: citaDiagnostico,
                recetas: recetasData
            });
        } catch (err) {
            console.error("Error al cargar detalles de la cita:", err);
            setDetailsError("No se pudieron cargar todos los detalles de la cita");
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleCitaClick = (cita) => {
        setSelectedCita(cita);
        cargarDetallesCita(cita);
    };

    const closeDetails = () => {
        setSelectedCita(null);
        setCitaDetails({
            doctor: null,
            diagnostico: null,
            recetas: []
        });
    };

    return {
        citas,
        isLoading,
        error,
        selectedCita,
        citaDetails,
        loadingDetails,
        detailsError,
        cargarCitas,
        handleCitaClick,
        closeDetails,
    };
};

export const useFormatCita = () => {
    const { formatDay } = useFormat();

    const formatTime = (timeString) => {
        return timeString?.substring(0, 5) || '';
    };

    const getEstadoClassName = (estado) => {
        switch (estado) {
            case "Pendiente":
                return "bg-yellow-100 text-yellow-600";
            case "Completada":
                return "bg-green-100 text-green-800";
            case "No asistida":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return {
        formatDate: formatDay,
        formatTime,
        getEstadoClassName,
    };
};

export const useCitasHoyDoctor = () => {
    const [citasHoy, setCitasHoy] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCita, setSelectedCita] = useState(null);
    const [showPatientInfo, setShowPatientInfo] = useState(false);

    const obtenerFechaHoy = () => {
        const hoy = new Date();
        return hoy.toISOString().split('T')[0]; //YYYY-MM-DD
    };

    const cargarCitasHoy = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const doctorId = localStorage.getItem("userId");
            if (!doctorId) {
                throw new Error("No se encontró el ID del doctor");
            }

            const todasLasCitas = await getCitasByDoctor(doctorId);
            const fechaHoy = obtenerFechaHoy();
            
            const citasDelDia = todasLasCitas.filter(cita => 
                cita.fecha === fechaHoy
            );

            const citasConPacientes = await Promise.all(
                citasDelDia.map(async (cita) => {
                    try {
                        const pacienteData = await getPatientById(cita.paciente_id);
                        return {
                            ...cita,
                            paciente: pacienteData
                        };
                    } catch (err) {
                        console.error(`Error al obtener datos del paciente ${cita.paciente_id}:`, err);
                        return {
                            ...cita,
                            paciente: null
                        };
                    }
                })
            );

            setCitasHoy(citasConPacientes);
        } catch (err) {
            console.error("Error al cargar citas de hoy:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al cargar las citas");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarCitasHoy();
    }, []);

    const recargarCitas = async () => {
        await cargarCitasHoy();
    };

    const handleCitaClick = (cita) => {
        setSelectedCita(cita);
        setShowPatientInfo(true);
    };

    const closePatientInfo = () => {
        setSelectedCita(null);
        setShowPatientInfo(false);
    };

    const marcarComoCompletada = async (citaId) => {
        try {
            await updateCita(citaId, { estado: 'Completada' });

            await recargarCitas();
            console.log('Cita marcada como completada exitosamente');
        } catch (error) {
            console.error('Error al marcar cita como completada:', error);
            setError('Error al actualizar el estado de la cita');
        }
    };

    const marcarComoNoAsistida = async (citaId) => {
        try {
            await updateCita(citaId, { estado: 'No asistida' });

            await recargarCitas();
            console.log('Cita marcada como no asistida exitosamente');
        } catch (error) {
            console.error('Error al marcar cita como no asistida:', error);
            setError('Error al actualizar el estado de la cita');
        }
    };

    return {
        citasHoy,
        isLoading,
        error,
        selectedCita,
        showPatientInfo,
        cargarCitasHoy,
        recargarCitas,
        handleCitaClick,
        closePatientInfo,
        marcarComoCompletada,
        marcarComoNoAsistida
    };
};

export const useDiagnosticos = () => {
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDiagnostico, setSelectedDiagnostico] = useState(null);

    const cargarDiagnosticos = async (pacienteId) => {
        setIsLoading(true);
        setError(null);

        try {
            const id = pacienteId || localStorage.getItem("userId");
            if (!id) throw new Error("No se encontró el ID del paciente");

            const data = await getDiagnosticosByPacienteId(id);
            setDiagnosticos(data);
        } catch (err) {
            console.error("Error al obtener diagnósticos:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al obtener los diagnósticos");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarDiagnosticos();
    }, []);

    const handleDiagnosticoClick = (diagnostico) => {
        setSelectedDiagnostico(diagnostico);
    };

    const closeDetails = () => {
        setSelectedDiagnostico(null);
    };

    return {
        diagnosticos,
        isLoading,
        error,
        selectedDiagnostico,
        cargarDiagnosticos,
        handleDiagnosticoClick,
        closeDetails
    };
};

export const useRecetas = () => {
    const [recetas, setRecetas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReceta, setSelectedReceta] = useState(null);

    const cargarRecetasPorPaciente = async (pacienteId) => {
        setIsLoading(true);
        setError(null);

        try {
            const id = pacienteId || localStorage.getItem("userId");
            if (!id) throw new Error("No se encontró el ID del paciente");

            const data = await getRecetasByPacienteId(id);
            setRecetas(data);
        } catch (err) {
            console.error("Error al obtener recetas:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al obtener las recetas");
        } finally {
            setIsLoading(false);
        }
    };

    const cargarRecetasPorDiagnostico = async (diagnosticoId) => {
        if (!diagnosticoId) {
            setError('No se proporcionó ID de diagnóstico');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await getRecetasByDiagnosticoId(diagnosticoId);
            setRecetas(data);
        } catch (err) {
            console.error("Error al obtener recetas por diagnóstico:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al obtener las recetas");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarRecetasPorPaciente();
    }, []);

    const handleRecetaClick = (receta) => {
        setSelectedReceta(receta);
    };

    const closeDetails = () => {
        setSelectedReceta(null);
    };

    return {
        recetas,
        isLoading,
        error,
        selectedReceta,
        cargarRecetasPorPaciente,
        cargarRecetasPorDiagnostico,
        handleRecetaClick,
        closeDetails
    };
};