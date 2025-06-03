import { useState } from "react";
import { getDoctorById } from "../../services/apiDoctor";
import { getDiagnosticosByCitaId } from "../../services/apiDiagnosticos";
import { getRecetasByDiagnosticoId } from "../../services/apiRecetas"; // Asegúrate de importar el servicio de recetas

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

            // Obtener información del doctor
            let doctor = null;
            if (cita.id_doctor || cita.doctor_id) {
                try {
                    const doctorId = cita.id_doctor || cita.doctor_id;
                    doctor = await getDoctorById(doctorId);
                } catch (doctorError) {
                    console.warn('No se pudo obtener información del doctor:', doctorError);
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

            // Estructura de datos para el PDF
            const datosPDF = {
                cita: {
                    ...cita,
                    paciente: cita.paciente || cita.Paciente || {}
                },
                doctor,
                diagnostico,
                recetasAdicionales
            };

            setLoading(false);
            return datosPDF;

        } catch (err) {
            setError(err.message || 'Error al obtener datos para el PDF');
            setLoading(false);
            throw err;
        }
    };

    const clearError = () => {
        setError(null);
    };

    const puedeGenerarPDF = (cita) => {
        return !!(cita && (cita.id_cita || cita.id) && cita.paciente);
    };

    return {
        obtenerDatosPDF,
        loading,
        error,
        clearError,
        puedeGenerarPDF
    };
};