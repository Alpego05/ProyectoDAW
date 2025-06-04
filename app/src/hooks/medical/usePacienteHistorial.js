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
            console.warn('No se pudo cargar información del paciente:', error);
            return null;
        }
    }, []);

    // Función para enriquecer citas con información del doctor y paciente
    const enriquecerCitas = useCallback(async (citasData, pacienteData) => {
        if (!Array.isArray(citasData) || citasData.length === 0) {
            return [];
        }

        try {
            // Obtener IDs únicos de doctores
            const doctorIds = [...new Set(citasData.map(cita => 
                cita.doctor_id || cita.id_doctor
            ).filter(Boolean))];

            // Cargar información de doctores en paralelo
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
                doctor: doctoresMap[cita.doctor_id || cita.id_doctor] || {
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
            console.error('Error al enriquecer citas:', error);
            // Retornar citas sin enriquecer en caso de error
            return citasData.map(cita => ({
                ...cita,
                doctor: {
                    nombre: 'Información no disponible',
                    name: 'Información no disponible'
                },
                paciente: pacienteData || {
                    nombre: 'Paciente no encontrado',
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
            
            console.log('🔄 Cargando historial para paciente:', pacienteId);
            
            // Cargar paciente, citas y diagnósticos en paralelo
            const [pacienteData, citasResponse, diagnosticosResponse] = await Promise.all([
                cargarPaciente(pacienteId),
                getCitasByPatient(pacienteId),
                getDiagnosticosByPacienteId(pacienteId).catch(err => {
                    console.warn('Error al cargar diagnósticos:', err);
                    return [];
                })
            ]);
            
            console.log('👤 Paciente cargado:', pacienteData);
            console.log('📦 Citas cargadas:', citasResponse);
            console.log('📦 Diagnósticos cargados:', diagnosticosResponse);
            
            // Procesar citas: asegurar array y manejar diferentes estructuras de respuesta
            let citasData = [];
            if (citasResponse?.data) {
                citasData = Array.isArray(citasResponse.data) ? citasResponse.data : [citasResponse.data];
            } else if (Array.isArray(citasResponse)) {
                citasData = citasResponse;
            } else if (citasResponse) {
                citasData = [citasResponse];
            }

            // Enriquecer citas con información del doctor y paciente
            const citasEnriquecidas = await enriquecerCitas(citasData, pacienteData);
            
            // Ordenar por fecha descendente (más recientes primero)
            const citasProcesadas = citasEnriquecidas.sort((a, b) => {
                const fechaA = new Date(a.fecha);
                const fechaB = new Date(b.fecha);
                return fechaB - fechaA;
            });
            
            // Procesar diagnósticos: asegurar array
            const diagnosticosProcesados = Array.isArray(diagnosticosResponse)
                ? diagnosticosResponse
                : diagnosticosResponse?.data
                ? Array.isArray(diagnosticosResponse.data) 
                    ? diagnosticosResponse.data 
                    : [diagnosticosResponse.data]
                : [];

            console.log('✅ Citas procesadas:', citasProcesadas);
            console.log('✅ Diagnósticos procesados:', diagnosticosProcesados);

            setCitas(citasProcesadas);
            setDiagnosticos(diagnosticosProcesados);
        } catch (err) {
            console.error('❌ Error al cargar historial:', err);
            setError(err.message || "Error al cargar el historial");
            setCitas([]);
            setDiagnosticos([]);
        } finally {
            setLoading(false);
        }
    }, [pacienteId, cargarPaciente, enriquecerCitas]);

    const generarPDFDiagnostico = useCallback(async (diagnostico) => {
        try {
            console.log('🔄 Generando PDF para diagnóstico:', diagnostico);
            
            // Buscar la cita asociada al diagnóstico
            const citaAsociada = citas.find(c => 
                c.id_cita === diagnostico.cita_id || 
                c.id === diagnostico.cita_id
            );
            
            if (!citaAsociada) {
                throw new Error("No se encontró la cita asociada a este diagnóstico");
            }
            
            console.log('📋 Cita asociada encontrada:', citaAsociada);
            
            // Asegurar que la cita tiene información del paciente
            if (!citaAsociada.paciente && pacienteInfo) {
                citaAsociada.paciente = pacienteInfo;
            }
            
            // Obtener datos completos para el PDF
            const datosPDF = await obtenerDatosPDF(citaAsociada);
            
            return {
                ...datosPDF,
                diagnostico: {
                    ...diagnostico,
                    recetas: diagnostico.recetas || []
                }
            };
        } catch (error) {
            console.error("❌ Error al preparar datos para PDF:", error);
            throw error;
        }
    }, [citas, obtenerDatosPDF, pacienteInfo]);

    // Actualizar una cita (cambiar horario)
    const actualizarCita = useCallback(async (citaId, datosActualizacion) => {
        try {
            setActualizando(true);
            setError(null);

            console.log('🔄 Actualizando cita:', { citaId, datosActualizacion });

            const citaActualizada = await updateCita(citaId, datosActualizacion);
            
            // Actualizar el estado local
            setCitas(prevCitas => 
                prevCitas.map(cita => 
                    (cita.id_cita === citaId || cita.id === citaId) 
                        ? { ...cita, ...citaActualizada, doctor: cita.doctor, paciente: cita.paciente }
                        : cita
                )
            );

            console.log('✅ Cita actualizada exitosamente');
            return citaActualizada;
        } catch (error) {
            console.error('❌ Error al actualizar cita:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Error al actualizar cita';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setActualizando(false);
        }
    }, []);

    // Cancelar una cita
    const cancelarCita = useCallback(async (citaId) => {
        try {
            setActualizando(true);
            setError(null);

            console.log('🔄 Cancelando cita:', citaId);

            // Primero intentar cambiar el estado a "Cancelada"
            try {
                await updateCita(citaId, { estado: 'Cancelada' });
                
                // Actualizar el estado local
                setCitas(prevCitas => 
                    prevCitas.map(cita => 
                        (cita.id_cita === citaId || cita.id === citaId) 
                            ? { ...cita, estado: 'Cancelada' }
                            : cita
                    )
                );
                
                console.log('✅ Cita cancelada (estado actualizado)');
            } catch (updateError) {
                // Si falla la actualización, intentar eliminar
                console.warn('No se pudo actualizar estado, intentando eliminar:', updateError);
                
                await deleteCita(citaId);
                
                // Remover del estado local
                setCitas(prevCitas => 
                    prevCitas.filter(cita => 
                        !(cita.id_cita === citaId || cita.id === citaId)
                    )
                );
                
                console.log('✅ Cita eliminada');
            }

        } catch (error) {
            console.error('❌ Error al cancelar cita:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Error al cancelar cita';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setActualizando(false);
        }
    }, []);

    // Obtener diagnóstico por cita
    const getDiagnosticoPorCita = useCallback((citaId) => {
        return diagnosticos.find(diag => 
            diag.cita_id === citaId || 
            diag.id_cita === citaId
        );
    }, [diagnosticos]);

    // Obtener el nombre completo de una cita
    const getNombreCita = useCallback((cita) => {
        // Priorizar el campo 'nombre' de la cita, luego 'motivo', y finalmente un valor por defecto
        return cita.nombre || cita.motivo || 'Consulta médica';
    }, []);

    // Cargar historial cuando cambie el pacienteId
    useEffect(() => {
        cargarHistorial();
    }, [cargarHistorial]);

    // Separar citas por estado
    const citasPorEstado = citas.reduce((acc, cita) => {
        const estado = cita.estado || 'Sin estado';
        if (!acc[estado]) {
            acc[estado] = [];
        }
        acc[estado].push(cita);
        return acc;
    }, {});

    // Estadísticas del historial
    const estadisticas = {
        totalCitas: citas.length,
        citasPendientes: (citasPorEstado['Pendiente'] || []).length,
        citasCompletadas: (citasPorEstado['Completada'] || []).length,
        citasNoAsistidas: (citasPorEstado['No asistida'] || []).length,
        citasCanceladas: (citasPorEstado['Cancelada'] || []).length,
        totalDiagnosticos: diagnosticos.length
    };

    return {
        // Estados principales
        citas,
        diagnosticos,
        pacienteInfo, // Nuevo estado exportado
        citasPorEstado,
        loading,
        error,
        actualizando,
        estadisticas,

        // Funciones principales
        cargarHistorial,
        generarPDFDiagnostico,
        actualizarCita,
        cancelarCita,

        // Funciones de utilidad
        getDiagnosticoPorCita,
        getNombreCita,

        // Función para limpiar errores
        clearError: () => setError(null)
    };
};