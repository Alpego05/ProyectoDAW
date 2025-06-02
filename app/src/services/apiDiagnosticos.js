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

//crear un diagnostico
export const createDiagnostico = async (diagnosticoData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(diagnosticoData)
        });
        if (!response.ok) {
            throw new Error("Error al crear diagnostico");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al crear diagnostico:", error);
        throw error;
    }
};


export default {
    getDiagnosticosByPacienteId,
    getAllDiagnosticos,
    createDiagnostico
}