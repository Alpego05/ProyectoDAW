const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};


export const getCitaByPatient = async (patientId) => {

    try {
        const response = await fetch(`${API_BASE_URL}/citas/bypatient/${patientId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener citas del paciente");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar citas del paciente:", error);
        throw error;
    }
};

// Crear una cita
export const createCita = async (citaData) => {

    try {
        const response = await fetch(`${API_BASE_URL}/citas/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(citaData)
        });

        if (!response.ok) {
            throw new Error("Error al crear cita");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al crear cita:", error);
        throw error;
    }
};

// Actualizar una cita
export const updateCita = async (id, citaData) => {

    try {
        const response = await fetch(`${API_BASE_URL}/citas/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(citaData)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar cita");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al actualizar cita:", error);
        throw error;
    }
};

// Eliminar una cita
export const deleteCita = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}/citas/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar cita");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar cita:", error);
        throw error;
    }
};
export default {
    getCitaByPatient,
    createCita,
    updateCita,
    deleteCita
};