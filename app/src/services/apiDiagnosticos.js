const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

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

export default {
    getDiagnosticosByPacienteId,
    getAllDiagnosticos
}