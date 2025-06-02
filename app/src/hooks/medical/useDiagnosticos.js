import { useState, useEffect } from 'react';
import { getDiagnosticosByPacienteId } from '../../services/apiDiagnosticos';

export const useDiagnosticos = (pacienteIdProp = null) => {
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDiagnostico, setSelectedDiagnostico] = useState(null);

    const cargarDiagnosticos = async (pacienteId = null) => {
        setIsLoading(true);
        setError(null);

        try {
            const id = pacienteId || pacienteIdProp || localStorage.getItem("userId");
            
            if (!id) {
                throw new Error("No se encontró el ID del paciente. Por favor, inicia sesión nuevamente.");
            }

            const data = await getDiagnosticosByPacienteId(id);
            setDiagnosticos(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error al obtener diagnósticos:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al obtener los diagnósticos");
            setDiagnosticos([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarDiagnosticos();
    }, [pacienteIdProp]); 

    const handleDiagnosticoClick = (diagnostico) => {
        if (!diagnostico) return;
        setSelectedDiagnostico(diagnostico);
    };

    const closeDetails = () => {
        setSelectedDiagnostico(null);
    };

    const recargarDiagnosticos = () => {
        cargarDiagnosticos();
    };

    const buscarDiagnosticoPorCita = (citaId) => {
        if (!citaId) return null;
        return diagnosticos.find(d => d.cita_id === citaId) || null;
    };

    const filtrarDiagnosticosPorFecha = (fechaInicio, fechaFin) => {
        if (!fechaInicio || !fechaFin) return diagnosticos;
        
        return diagnosticos.filter(diagnostico => {
            if (!diagnostico.fecha) return false;
            const fechaDiagnostico = new Date(diagnostico.fecha);
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);
            return fechaDiagnostico >= inicio && fechaDiagnostico <= fin;
        });
    };

    return {
        diagnosticos,
        isLoading,
        error,
        selectedDiagnostico,
        cargarDiagnosticos,
        handleDiagnosticoClick,
        closeDetails,
        recargarDiagnosticos,
        buscarDiagnosticoPorCita,
        filtrarDiagnosticosPorFecha
    };
};