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
        const hoy = new Date();
        return hoy.toISOString().split('T')[0]; // YYYY-MM-DD
    };

    const cargarCitasHoy = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const doctorId = localStorage.getItem("userId");
            if (!doctorId) {
                throw new Error("No se encontró el ID del doctor. Por favor, inicia sesión nuevamente.");
            }

            const todasLasCitas = await getCitasByDoctor(doctorId);
            const fechaHoy = obtenerFechaHoy();
            
            if (!Array.isArray(todasLasCitas)) {
                throw new Error("Respuesta inválida del servidor");
            }

            const citasDelDia = todasLasCitas.filter(cita => 
                cita?.fecha === fechaHoy
            );

            const citasConPacientes = await Promise.allSettled(
                citasDelDia.map(async (cita) => {
                    if (!cita?.paciente_id) {
                        return {
                            ...cita,
                            paciente: null,
                            pacienteError: 'ID de paciente no válido'
                        };
                    }

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
                            paciente: null,
                            pacienteError: 'Error al cargar datos del paciente'
                        };
                    }
                })
            );

            // Filtrar resultados exitosos y manejar errores
            const citasValidas = citasConPacientes
                .filter(result => result.status === 'fulfilled')
                .map(result => result.value);

            setCitasHoy(citasValidas);
        } catch (err) {
            console.error("Error al cargar citas de hoy:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al cargar las citas");
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
            throw new Error('ID de cita y estado son requeridos');
        }

        try {
            await updateCita(citaId, { estado: nuevoEstado });
            await recargarCitas();
            console.log(`Cita marcada como ${nuevoEstado.toLowerCase()} exitosamente`);
        } catch (error) {
            console.error(`Error al marcar cita como ${nuevoEstado.toLowerCase()}:`, error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setError(`Error al actualizar el estado de la cita: ${errorMessage}`);
            throw error;
        }
    };

    const marcarComoCompletada = async (citaId) => {
        return actualizarEstadoCita(citaId, 'Completada');
    };

    const marcarComoNoAsistida = async (citaId) => {
        return actualizarEstadoCita(citaId, 'No asistida');
    };

    const marcarComoCancelada = async (citaId) => {
        return actualizarEstadoCita(citaId, 'Cancelada');
    };

    const handleDiagnosticoCreated = async () => {
        try {
            console.log('Diagnóstico creado exitosamente');
            await recargarCitas();
        } catch (error) {
            console.error('Error al recargar citas después de crear diagnóstico:', error);
            setError('Error al recargar las citas después de crear el diagnóstico');
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