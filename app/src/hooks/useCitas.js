import { useState, useEffect } from "react";
import { 
    getCitaByPatient, 
    getDoctorById, 
    getDiagnosticosByPacienteId, 
    getRecetasByDiagnosticoId 
} from "../services/apiPatientClient";
import useFormat from "./useFormat";

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

            const data = await getCitaByPatient(userId);
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
            
            //diagnósticos asociados al paciente
            const diagnosticosData = await getDiagnosticosByPacienteId(cita.paciente_id);
            
            // Filtrar el diagnóstico 
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
                return "bg-yellow-100 text-yellow-800";
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