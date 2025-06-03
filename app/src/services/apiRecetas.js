import { getAllCitas } from "./apiCitas";

const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

export const getAllRecetas = async () => {
    const response = await fetch(`${API_BASE_URL}/recetas`, {
        method: "GET",
        headers: {
            'Authorization': `${getToken()}`
        }
    });
    const data = await response.json();
    return data.data;
};

export const getRecetasByPacienteId = async (pacienteId) => {
    try {
        if (!pacienteId) {
            throw new Error('ID de paciente requerido');
        }

        console.log(`Obteniendo recetas para paciente ID: ${pacienteId}`);
        
        const response = await fetch(`${API_BASE_URL}/recetas/bypatient/${pacienteId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log(`No se encontraron recetas para el paciente ${pacienteId}`);
                return [];
            }
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText || 'Error al obtener recetas del paciente'}`);
        }

        const data = await response.json();
        console.log(`Recetas del paciente ${pacienteId}:`, data);
        return data.data || [];
    } catch (error) {
        console.error(`Error al cargar recetas del paciente ${pacienteId}:`, error.message);
        
        // Si es un error de "no encontrado", retornar array vacío en lugar de error
        if (error.message.includes('404') || error.message.includes('No se encontraron')) {
            return [];
        }
        throw new Error(`Error al obtener recetas del paciente: ${error.message}`);
    }
};

export const getRecetasByCitaId = async (citaId) => {
    try {
        if (!citaId) {
            throw new Error('ID de cita requerido');
        }

        console.log(`Obteniendo recetas para cita ID: ${citaId}`);
        
        const response = await fetch(`${API_BASE_URL}/recetas/bycita/${citaId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log(`No se encontraron recetas para la cita ${citaId}`);
                return [];
            }
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText || 'Error al obtener recetas de la cita'}`);
        }

        const data = await response.json();
        console.log(`Recetas de la cita ${citaId}:`, data);
        return data.data || [];
    } catch (error) {
        console.error(`Error al obtener recetas de la cita ${citaId}:`, error.message);
        
        // Si es un error de "no encontrado", retornar array vacío en lugar de error
        if (error.message.includes('404') || error.message.includes('No se encontraron')) {
            return [];
        }
        throw new Error(`Error al obtener recetas de la cita: ${error.message}`);
    }
};

export const getRecetasByDiagnosticoId = async (diagnosticoId) => {
    try {
        if (!diagnosticoId) {
            throw new Error('ID de diagnóstico requerido');
        }

        console.log(`Obteniendo recetas para diagnóstico ID: ${diagnosticoId}`);
        
        const response = await fetch(`${API_BASE_URL}/recetas/bydiagnostico/${diagnosticoId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log(`No se encontraron recetas para el diagnóstico ${diagnosticoId}`);
                return [];
            }
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText || 'Error al obtener recetas del diagnóstico'}`);
        }

        const data = await response.json();
        console.log(`Recetas del diagnóstico ${diagnosticoId}:`, data);
        return data.data || [];
    } catch (error) {
        console.error(`Error al obtener recetas del diagnóstico ${diagnosticoId}:`, error.message);
        
        // Si es un error de "no encontrado", retornar array vacío en lugar de error
        if (error.message.includes('404') || error.message.includes('No se encontraron')) {
            return [];
        }
        throw new Error(`Error al obtener recetas del diagnóstico: ${error.message}`);
    }
};

// Crear una receta - Enhanced with debugging
export const createReceta = async (recetaData) => {
    try {
        const token = getToken();
        const response = await fetch(`${API_BASE_URL}/recetas/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(recetaData)
        });

        const responseText = await response.text();
        if (!response.ok) {
            let errorMessage = "Error al crear la receta";
            try {
                const errorData = JSON.parse(responseText);
                errorMessage = errorData.message || errorData.error || errorMessage;
                console.error(errorData);
            } catch (parseError) {
                console.error(responseText);
            }
            throw new Error(errorMessage);
        }
        const data = JSON.parse(responseText);
        return data.data;
    } catch (error) {
        console.error("Error al crear la receta:", error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error("No se pudo conectar al servidor.");
        }

        throw error;
    }
};

export default {
    getAllRecetas,
    getRecetasByPacienteId,
    getRecetasByCitaId,
    getRecetasByDiagnosticoId,
    createReceta
};