import { useState, useEffect } from 'react';
import { getRecetasByPacienteId, getRecetasByDiagnosticoId } from '../../services/apiRecetas';

export const useRecetas = (pacienteIdProp = null, diagnosticoIdProp = null) => {
    const [recetas, setRecetas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReceta, setSelectedReceta] = useState(null);

    const cargarRecetasPorPaciente = async (pacienteId = null) => {
        setIsLoading(true);
        setError(null);

        try {
            const id = pacienteId || pacienteIdProp || localStorage.getItem("userId");
            
            if (!id) {
                throw new Error("No se encontró el ID del paciente. Por favor, inicia sesión nuevamente.");
            }

            const data = await getRecetasByPacienteId(id);
            setRecetas(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error al obtener recetas:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al obtener las recetas");
            setRecetas([]);
        } finally {
            setIsLoading(false);
        }
    };

    const cargarRecetasPorDiagnostico = async (diagnosticoId = null) => {
        const id = diagnosticoId || diagnosticoIdProp;
        
        if (!id) {
            setError('No se proporcionó ID de diagnóstico');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await getRecetasByDiagnosticoId(id);
            setRecetas(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error al obtener recetas por diagnóstico:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al obtener las recetas");
            setRecetas([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (diagnosticoIdProp) {
            cargarRecetasPorDiagnostico();
        } else {
            cargarRecetasPorPaciente();
        }
    }, [pacienteIdProp, diagnosticoIdProp]);

    const handleRecetaClick = (receta) => {
        if (!receta) return;
        setSelectedReceta(receta);
    };

    const closeDetails = () => {
        setSelectedReceta(null);
    };

    const recargarRecetas = () => {
        if (diagnosticoIdProp) {
            cargarRecetasPorDiagnostico();
        } else {
            cargarRecetasPorPaciente();
        }
    };

    const filtrarRecetasPorEstado = (estado) => {
        if (!estado) return recetas;
        return recetas.filter(receta => 
            receta.estado?.toLowerCase() === estado.toLowerCase()
        );
    };

    //sin usar, si se quita tenemos un problema
    const filtrarRecetasActivas = () => {
        const hoy = new Date();
        return recetas.filter(receta => {
            if (!receta.fecha_fin) return true; 
            const fechaFin = new Date(receta.fecha_fin);
            return fechaFin >= hoy;
        });
    };

    const filtrarRecetasVencidas = () => {
        const hoy = new Date();
        return recetas.filter(receta => {
            if (!receta.fecha_fin) return false;
            const fechaFin = new Date(receta.fecha_fin);
            return fechaFin < hoy;
        });
    };

    const buscarRecetasPorMedicamento = (nombreMedicamento) => {
        if (!nombreMedicamento) return recetas;
        const busqueda = nombreMedicamento.toLowerCase();
        return recetas.filter(receta => 
            receta.medicamento?.toLowerCase().includes(busqueda) ||
            receta.nombre_medicamento?.toLowerCase().includes(busqueda)
        );
    };

    return {
        recetas,
        isLoading,
        error,
        selectedReceta,
        cargarRecetasPorPaciente,
        cargarRecetasPorDiagnostico,
        handleRecetaClick,
        closeDetails,
        recargarRecetas,
        filtrarRecetasPorEstado,
        filtrarRecetasActivas,
        filtrarRecetasVencidas,
        buscarRecetasPorMedicamento
    };
};