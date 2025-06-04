const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

//obtener todos los diagnosticos
export const getAllDiagnosticos = async () => {
    const response = await fetch(`${API_BASE_URL}/diagnosticos`, {
        method: "GET",
        headers: {
            'Authorization': `${getToken()}`
        }
    });
    const data = await response.json();
    return data.data;
};

//conseguir diagnosticos por paciente
export const getDiagnosticosByPacienteId = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos/byPatient/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener diagnósticos por paciente");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar diagnosticos por paciente:", error);
        throw error;
    }
};

//crear un diagnostico - Enhanced with debugging
export const createDiagnostico = async (diagnosticoData) => {
    try {
        const token = getToken();
        const response = await fetch(`${API_BASE_URL}/diagnosticos/create`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`
            },
            body: JSON.stringify(diagnosticoData)
        });
        const responseText = await response.text();
        if (!response.ok) {
            let errorMessage = "Error al crear diagnostico";
            
            try {
                const errorData = JSON.parse(responseText);
                errorMessage = errorData.message || errorData.error || errorMessage;
                console.error("Server error:", errorData);
            } catch (parseError) {
                console.error(" error:", responseText);
            }
            
            throw new Error(errorMessage);
        }
        
        const data = JSON.parse(responseText);
        return data.data;
        
    } catch (error) {
        console.error(" Error:", error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error("No se pudo conectar al servidor.");
        }
        
        throw error;
    }
};


// Obtener diagnósticos por ID de cita
export const getDiagnosticosByCitaId = async (citaId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos/byCita/${citaId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener diagnósticos por cita");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar diagnosticos por cita:", error);
        throw error;
    }
};

export default {
    getDiagnosticosByPacienteId,
    getAllDiagnosticos,
    createDiagnostico,
    getDiagnosticosByCitaId
}