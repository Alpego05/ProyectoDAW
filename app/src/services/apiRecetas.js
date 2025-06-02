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
        const response = await fetch(`${API_BASE_URL}/recetas/bypatient/${pacienteId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener recetas del paciente");
        }

        const data = await response.json();
        console.log(data)
        return data.data;
    } catch (error) {
        console.error("Error al cargar recetas del paciente:", error);
        throw error;
    }
};




export const getRecetasByCitaId = async (citaId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/recetas/bycita/${citaId
            }`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });
        if (!response.ok) {
            throw new Error("Error al obtener recetas del paciente");
        }
        const data = await response.json();
        console.log(data)
        return data.data;
    } catch (error) {
        console.error("Error al obtener recetas del paciente:", error);
        throw error;
    }
};



export const getRecetasByDiagnosticoId = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/recetas/bydiagnostico/${id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `${getToken()}`
                }
            }
        );
        if (!response.ok) {
            throw new Error("Error al obtener recetas del paciente");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al obtener recetas del paciente:", error);
        throw error;
    }
}

//crear un diagnostico
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
                console.error( errorData);
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
    getRecetasByCitaId,
    getRecetasByDiagnosticoId,
    createReceta
}