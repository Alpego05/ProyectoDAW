const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

export const getMedById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/med/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener medicamento");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar medicamento:", error);
        throw error;
    }
};

export const getEnfById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/enf/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener enfermedad");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar enfermedad:", error);
        throw error;
    }
};

export default {
    getMedById,
    getEnfById,
}