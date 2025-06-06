import { useState, useEffect, useCallback } from "react";
import { getCitasByPatient, updateCita, deleteCita } from "../../services/apiCitas";
import { getDiagnosticosByPacienteId } from "../../services/apiDiagnosticos";
import { getDoctorById } from "../../services/apiDoctor";
import { getPatientById } from "../../services/apiPatient"; 
import { useCitaPDF } from "./useCitaPDF";

export const usePacienteHistorial = (pacienteId) => {
    const [citas, setCitas] = useState([]);
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [pacienteInfo, setPacienteInfo] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actualizando, setActualizando] = useState(false);
    const { obtenerDatosPDF } = useCitaPDF();

    // Función para cargar información del paciente
    const cargarPaciente = useCallback(async (id) => {
        try {
            const paciente = await getPatientById(id);
            setPacienteInfo(paciente);
            return paciente;
        } catch (error) {
            console.warn('No se pudo cargar el paciente:', error);
            return null;
        }
    }, []);


    const enriquecerCitas = useCallback(async (citasData, pacienteData) => {
        if (!Array.isArray(citasData) || citasData.length === 0) {
            return [];
        }

        try {
  
            const doctorIds = [...new Set(citasData.map(cita => 
                cita.doctor_id || cita.id_doctor
            ).filter(Boolean))];


            const doctoresPromises = doctorIds.map(async (doctorId) => {
                try {
                    const doctor = await getDoctorById(doctorId);
                    return { id: doctorId, data: doctor };
                } catch (error) {
                    console.warn(`No se pudo cargar doctor ${doctorId}:`, error);
                    return { id: doctorId, data: null };
                }
            });

            const doctoresResults = await Promise.all(doctoresPromises);
            const doctoresMap = doctoresResults.reduce((acc, { id, data }) => {
                acc[id] = data;
                return acc;
            }, {});

            // Enriquecer citas con información del doctor y paciente
            return citasData.map(cita => ({
                ...cita,
                doctor: doctoresMap[cita.doctor_id] || {
                    nombre: 'Doctor no encontrado',
                    name: 'Doctor no encontrado'
                },
                paciente: pacienteData || {
                    nombre: 'Paciente no encontrado',
                    apellido1: '',
                    apellido2: ''
                }
            }));
        } catch (error) {
            console.error('Error ', error);

            return citasData.map(cita => ({
                ...cita,
                doctor: {
                    nombre: 'no disponible',
                    name: 'no disponible'
                },
                paciente: pacienteData || {
                    nombre: 'Undefined',
                    apellido1: '',
                    apellido2: ''
                }
            }));
        }
    }, []);

    const cargarHistorial = useCallback(async () => {
        if (!pacienteId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const [pacienteData, citasResponse, diagnosticosResponse] = await Promise.all([
                cargarPaciente(pacienteId),
                getCitasByPatient(pacienteId),
                getDiagnosticosByPacienteId(pacienteId).catch(err => {
                    console.warn('Error al cargar diagnósticos:', err);
                    return [];
                })
            ]);
            

            
            let citasData = [];
            if (citasResponse?.data) {
                citasData = Array.isArray(citasResponse.data) ? citasResponse.data : [citasResponse.data];
            } else if (Array.isArray(citasResponse)) {
                citasData = citasResponse;
            } else if (citasResponse) {
                citasData = [citasResponse];
            }

            const citasEnriquecidas = await enriquecerCitas(citasData, pacienteData);
            
            // Ordenar por fecha descendente
            const citasProcesadas = citasEnriquecidas.sort((a, b) => {
                const fechaA = new Date(a.fecha);
                const fechaB = new Date(b.fecha);
                return fechaB - fechaA;
            });
            
            const diagnosticosProcesados = Array.isArray(diagnosticosResponse)
                ? diagnosticosResponse
                : diagnosticosResponse?.data
                ? Array.isArray(diagnosticosResponse.data) 
                    ? diagnosticosResponse.data 
                    : [diagnosticosResponse.data]
                : [];

            // console.log(citasProcesadas);
            // console.log(diagnosticosProcesados);

            setCitas(citasProcesadas);
            setDiagnosticos(diagnosticosProcesados);
        } catch (err) {
            console.error('Error al cargar historial:', err);
            setError(err.message || "Error al cargar el historial");
            setCitas([]);
            setDiagnosticos([]);
        } finally {
            setLoading(false);
        }
    }, [pacienteId, cargarPaciente, enriquecerCitas]);

    const generarPDFDiagnostico = useCallback(async (diagnostico) => {
        try {

            const citaAsociada = citas.find(c => 
                c.id_cita === diagnostico.cita_id || 
                c.id === diagnostico.cita_id
            );
            
            if (!citaAsociada) {
                throw new Error("No se encontró la cita asociada a este diagnóstico");
            }

            if (!citaAsociada.paciente && pacienteInfo) {
                citaAsociada.paciente = pacienteInfo;
            }
            
            const datosPDF = await obtenerDatosPDF(citaAsociada);
            
            return {
                ...datosPDF,
                diagnostico: {
                    ...diagnostico,
                    recetas: diagnostico.recetas || []
                }
            };
        } catch (error) {
            console.error("Error al preparar datos para PDF:", error);
            throw error;
        }
    }, [citas, obtenerDatosPDF, pacienteInfo]);

    const actualizarCita = useCallback(async (citaId, datos) => {
        try {
            setActualizando(true);
            setError(null);

            console.log('Actualizando cita:', { citaId, datos });

            const citaActualizada = await updateCita(citaId, datos);
            setCitas(prevCitas => 
                prevCitas.map(cita => 
                    (cita.id_cita === citaId || cita.id === citaId) 
                        ? { ...cita, ...citaActualizada, doctor: cita.doctor, paciente: cita.paciente }
                        : cita
                )
            );

            console.log('Cita actualizada');
            return citaActualizada;
        } catch (error) {
            console.error('Error al actualizar cita:', error);
            setError('Error al actualizar cita');
            throw new Error('Error al actualizar cita');
        } finally {
            setActualizando(false);
        }
    }, []);

    const cancelarCita = useCallback(async (citaId) => {
        try {
            setActualizando(true);
            setError(null);

            try {
                await updateCita(citaId, { estado: 'Cancelada' });
                setCitas(prevCitas => 
                    prevCitas.map(cita => 
                        (cita.id_cita === citaId || cita.id === citaId) 
                            ? { ...cita, estado: 'Cancelada' }
                            : cita
                    )
                );
                
                console.log('Cita cancelada');
            } catch (updateError) {
                console.warn('No se pudo actualizar estado:', updateError);
                
                await deleteCita(citaId);
                
                setCitas(prevCitas => 
                    prevCitas.filter(cita => 
                        !(cita.id_cita === citaId || cita.id === citaId)
                    )
                );
                
                console.log('cita eliminada');
            }

        } catch (error) {
            console.error('Error al cancelar cita:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Error al cancelar cita';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setActualizando(false);
        }
    }, []);

    const getDiagnosticoPorCita = useCallback((citaId) => {
        return diagnosticos.find(diag => 
            diag.cita_id === citaId 
        );
    }, [diagnosticos]);

    const getNombreCita = useCallback((cita) => {
        return cita.nombre ||  'Consulta médica';
    }, []);

    useEffect(() => {
        cargarHistorial();
    }, [cargarHistorial]);

    const citasPorEstado = citas.reduce((acc, cita) => {
        const estado = cita.estado || 'Sin estado';
        if (!acc[estado]) {
            acc[estado] = [];
        }
        acc[estado].push(cita);
        return acc;
    }, {});

    const estadisticas = {
        totalCitas: citas.length,
        citasPendientes: (citasPorEstado['Pendiente'] || []).length,
        citasCompletadas: (citasPorEstado['Completada'] || []).length,
        citasNoAsistidas: (citasPorEstado['No asistida'] || []).length,
        citasCanceladas: (citasPorEstado['Cancelada'] || []).length,
        totalDiagnosticos: diagnosticos.length
    };

    return {

        citas,
        diagnosticos,
        pacienteInfo, 
        citasPorEstado,
        loading,
        error,
        actualizando,
        estadisticas,

        cargarHistorial,
        generarPDFDiagnostico,
        actualizarCita,
        cancelarCita,

        getDiagnosticoPorCita,
        getNombreCita,
        clearError: () => setError(null)
    };
};