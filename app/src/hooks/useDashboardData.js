import { useState, useEffect } from 'react';
import {
    getUserById,
    getCitaByPatient,
    getRecetasByPacienteId,
    getDiagnosticosByPacienteId,
    getPatientById
} from './../services/apiClient';

/**
 * hook personalizado para gestionar todos los datos necesarios para el Dashboard
 */
export const useDashboardData = (userId, userRole) => {
    const [estado, setEstado] = useState({
        usuario: null,
        paciente: null,
        citas: [],
        recetas: [],
        diagnosticos: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setEstado(prev => ({ ...prev, loading: false, error: 'No se encontró ID de usuario' }));
                return;
            }

            try {
                // Obtener datos del usuario siempre
                const datosUsuario = await getUserById(userId);

                // Objeto para almacenar los resultados
                const resultado = {
                    usuario: datosUsuario,
                    paciente: null,
                    citas: [],
                    recetas: [],
                    diagnosticos: [],
                    loading: false,
                    error: null
                };

                // Si es paciente, cargar datos específicos
                if (userRole === 'paciente') {
                    // Cargar datos en paralelo para mejor rendimiento
                    const [
                        datosPaciente,
                        citasPaciente,
                        diagnosticosPaciente,
                        recetasPaciente
                    ] = await Promise.all([
                        getPatientById(userId),
                        getCitaByPatient(userId),
                        getDiagnosticosByPacienteId(userId),
                        getRecetasByPacienteId(userId)
                    ]);

                    resultado.paciente = datosPaciente;
                    resultado.citas = citasPaciente;
                    resultado.diagnosticos = diagnosticosPaciente;
                    resultado.recetas = recetasPaciente;
                }

                setEstado(resultado);
            } catch (error) {
                console.error("Error al cargar datos:", error);
                setEstado(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Error al cargar los datos. Por favor, intente nuevamente.'
                }));
            }
        };

        fetchData();
    }, [userId, userRole]);

    // Funciones auxiliares que podrían ser útiles
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES');
    };

    const getProximasCitas = () => {
        if (!estado.citas.length) return [];

        // Ordenar por fecha y filtrar pendientes
        return [...estado.citas]
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
            .filter(cita => cita.estado === 'Pendiente')
            .slice(0, 3);
    };

    return {
        ...estado,
        formatDate,
        getProximasCitas
    };
};