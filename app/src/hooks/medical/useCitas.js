import { useState, useEffect } from 'react';
import { getCitasByPatient } from '../../services/apiCitas';
import { getDoctorById } from '../../services/apiDoctor';
import { getDiagnosticosByPacienteId } from '../../services/apiDiagnosticos';
import { getRecetasByDiagnosticoId } from '../../services/apiRecetas';

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
            if (!userId) {
                throw new Error("No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.");
            }

            const data = await getCitasByPatient(userId);
            setCitas(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error al obtener citas:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al obtener las citas");
            setCitas([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarCitas();
    }, []);

    const cargarDetallesCita = async (cita) => {
        if (!cita || !cita.doctor_id || !cita.paciente_id || !cita.id_cita) {
            setDetailsError("Datos de cita incompletos");
            return;
        }

        setLoadingDetails(true);
        setDetailsError(null);

        try {
            // Información del doctor
            const doctorData = await getDoctorById(cita.doctor_id);
            
            // Obtener diagnósticos del paciente
            const diagnosticosData = await getDiagnosticosByPacienteId(cita.paciente_id);
            const citaDiagnostico = diagnosticosData?.find(d => d.cita_id === cita.id_cita) || null;

            // Obtener recetas si existe diagnóstico
            let recetasData = [];
            if (citaDiagnostico?.id_diagnostico) {
                try {
                    recetasData = await getRecetasByDiagnosticoId(citaDiagnostico.id_diagnostico);
                } catch (recetaError) {
                    console.warn("Error al cargar recetas:", recetaError);
                    // No es crítico, continúa sin recetas
                }
            }

            setCitaDetails({
                doctor: doctorData,
                diagnostico: citaDiagnostico,
                recetas: Array.isArray(recetasData) ? recetasData : []
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
        setDetailsError(null);
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