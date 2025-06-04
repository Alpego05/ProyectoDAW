import { useState } from "react";
import { getDoctorById } from "../../services/apiDoctor";
import { getDiagnosticosByCitaId } from "../../services/apiDiagnosticos";
import { getRecetasByDiagnosticoId } from "../../services/apiRecetas";

export const useCitaPDF = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const obtenerDatosPDF = async (cita) => {
        try {
            setLoading(true);
            setError(null);

            if (!cita) {
                throw new Error('No se proporcionó información de la cita');
            }

            // Debug: Log the cita object to see its structure
            console.log('Estructura de la cita:', cita);

            // Obtener información del doctor
            let doctor = null;
            if (cita.id_doctor || cita.doctor_id) {
                try {
                    const doctorId = cita.id_doctor || cita.doctor_id;
                    doctor = await getDoctorById(doctorId);
                } catch (doctorError) {
                    console.warn('No se pudo obtener información del doctor:', doctorError);
                    // Usar información del doctor desde la cita si está disponible
                    if (cita.doctor) {
                        doctor = cita.doctor;
                    }
                }
            }

            let diagnostico = null;
            let recetasAdicionales = [];

            if (cita.id_cita || cita.id) {
                try {
                    const citaId = cita.id_cita || cita.id;
                    diagnostico = await getDiagnosticosByCitaId(citaId);
                    
                    // Si hay diagnóstico, cargar sus recetas
                    if (diagnostico && diagnostico.id_diagnostico) {
                        try {
                            const recetas = await getRecetasByDiagnosticoId(diagnostico.id_diagnostico);
                            diagnostico.recetas = Array.isArray(recetas) ? recetas : [];
                        } catch (recetasError) {
                            console.warn('No se pudieron cargar las recetas del diagnóstico:', recetasError);
                            diagnostico.recetas = [];
                        }
                    }
                } catch (diagnosticosError) {
                    console.warn('No se pudo obtener el diagnóstico:', diagnosticosError);
                    diagnostico = null;
                }
            }

            // Manejar información del paciente de múltiples estructuras posibles
            let pacienteInfo = null;
            
            if (cita.paciente) {
                // Estructura: cita.paciente.usuario.nombre
                if (cita.paciente.usuario) {
                    pacienteInfo = {
                        nombre: cita.paciente.usuario.nombre,
                        apellido1: cita.paciente.usuario.apellido1,
                        apellido2: cita.paciente.usuario.apellido2,
                        email: cita.paciente.usuario.email,
                        telefono: cita.paciente.usuario.telefono,
                        ...cita.paciente
                    };
                } else {
                    // Estructura: cita.paciente.nombre directamente
                    pacienteInfo = cita.paciente;
                }
            } else if (cita.Paciente) {
                // Estructura alternativa con 'Paciente' mayúscula
                if (cita.Paciente.usuario) {
                    pacienteInfo = {
                        nombre: cita.Paciente.usuario.nombre,
                        apellido1: cita.Paciente.usuario.apellido1,
                        apellido2: cita.Paciente.usuario.apellido2,
                        email: cita.Paciente.usuario.email,
                        telefono: cita.Paciente.usuario.telefono,
                        ...cita.Paciente
                    };
                } else {
                    pacienteInfo = cita.Paciente;
                }
            } else {
                // Intentar obtener información del paciente desde las propiedades directas de la cita
                console.warn('No se encontró información del paciente en la estructura esperada');
                pacienteInfo = {
                    nombre: 'Paciente no especificado',
                    apellido1: '',
                    apellido2: '',
                    email: '',
                    telefono: ''
                };
            }

            // Debug: Log paciente info
            console.log('Información del paciente procesada:', pacienteInfo);

            // Estructura de datos para el PDF
            const datosPDF = {
                cita: {
                    ...cita,
                    paciente: pacienteInfo
                },
                doctor: doctor || {
                    nombre: cita.doctor?.nombre || cita.doctor?.name || 'Doctor no especificado',
                    apellido1: cita.doctor?.apellido1 || '',
                    especialidad: cita.doctor?.especialidad || 'No especificada'
                },
                diagnostico,
                recetasAdicionales
            };

            console.log('Datos PDF finales:', datosPDF);

            setLoading(false);
            return datosPDF;

        } catch (err) {
            console.error('Error completo en obtenerDatosPDF:', err);
            setError(err.message || 'Error al obtener datos para el PDF');
            setLoading(false);
            throw err;
        }
    };

    const clearError = () => {
        setError(null);
    };

    const puedeGenerarPDF = (cita) => {
        return !!(cita && (cita.id_cita || cita.id));
    };

    return {
        obtenerDatosPDF,
        loading,
        error,
        clearError,
        puedeGenerarPDF
    };
};