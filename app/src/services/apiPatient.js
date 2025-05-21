const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};


// Obtener paciente por ID
export const getPatientById = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener paciente");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar paciente:", error);
        throw error;
    }
};

// Actualizar un paciente
export const updatePatient = async (id, patientData) => {

    try {
        const response = await fetch(`${API_BASE_URL}/patients/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(patientData)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar paciente");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al actualizar paciente:", error);
        throw error;
    }
};

export default {
    getPatientById,
    updatePatient
}