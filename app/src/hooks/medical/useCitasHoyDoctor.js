import { useState, useEffect } from 'react';
import { getCitasByDoctor, updateCita } from '../../services/apiCitas';
import { getPatientById } from '../../services/apiPatient';

export const useCitasHoyDoctor = () => {
    const [citasHoy, setCitasHoy] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCita, setSelectedCita] = useState(null);
    const [showPatientInfo, setShowPatientInfo] = useState(false);

    const obtenerFechaHoy = () => {
        try {
            const hoy = new Date();
            return hoy.toISOString().split('T')[0]; // YYYY-MM-DD
        } catch {
            return new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
        }
    };

    const cargarCitasHoy = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const doctorId = localStorage.getItem("userId");
            if (!doctorId) {
                setIsLoading(false);
                return;
            }

            const todasLasCitas = await getCitasByDoctor(doctorId).catch(() => []);
            const fechaHoy = obtenerFechaHoy();
            
            // Si no hay citas o no es un array usar array vacío
            const citasArray = Array.isArray(todasLasCitas) ? todasLasCitas : [];

            const citasDelDia = citasArray.filter(cita => 
                cita && cita.fecha === fechaHoy
            );

            const citasConPacientes = await Promise.allSettled(
                citasDelDia.map(async (cita) => {
                    if (!cita.paciente_id) {
                        return {
                            ...cita,
                            paciente: null
                        };
                    }

                    try {
                        const pacienteData = await getPatientById(cita.paciente_id);
                        return {
                            ...cita,
                            paciente: pacienteData || null
                        };
                    } catch {
                        return {
                            ...cita,
                            paciente: null
                        };
                    }
                })
            );

            // Obtener todas las citas válidas
            const citasValidas = citasConPacientes
                .filter(result => result.status === 'fulfilled')
                .map(result => result.value)
                .filter(Boolean); 

            setCitasHoy(citasValidas);
        } catch (err) {
            console.error("Error al cargar citas de hoy:", err);
            setError("Error al cargar las citas");
            setCitasHoy([]);
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
        if (!cita) return;
        setSelectedCita(cita);
        setShowPatientInfo(true);
    };

    const closePatientInfo = () => {
        setSelectedCita(null);
        setShowPatientInfo(false);
    };

    const actualizarEstadoCita = async (citaId, nuevoEstado) => {
        if (!citaId || !nuevoEstado) {
            return;
        }

        try {
            await updateCita(citaId, { estado: nuevoEstado });
            await recargarCitas();
        } catch (error) {
            console.error(`Error al actualizar estado a ${nuevoEstado}:`, error);
            setError("Error al actualizar la cita");
            throw error;
        }
    };

    const marcarComoCompletada = async (citaId) => {
        if (!citaId) return;
        return actualizarEstadoCita(citaId, 'Completada');
    };

    const marcarComoNoAsistida = async (citaId) => {
        if (!citaId) return;
        return actualizarEstadoCita(citaId, 'No asistida');
    };

    const marcarComoCancelada = async (citaId) => {
        if (!citaId) return;
        return actualizarEstadoCita(citaId, 'Cancelada');
    };

    const handleDiagnosticoCreated = async () => {
        try {
            await recargarCitas();
        } catch (error) {
            console.error('Error al recargar citas:', error);
            setError('Error al recargar las citas');
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
        handleDiagnosticoCreated,
        closePatientInfo,
        marcarComoCompletada,
        marcarComoNoAsistida,
        marcarComoCancelada,
        obtenerFechaHoy
    };
};