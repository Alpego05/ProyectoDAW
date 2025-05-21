const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
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

export default {
    getRecetasByCitaId,
    getRecetasByDiagnosticoId
}