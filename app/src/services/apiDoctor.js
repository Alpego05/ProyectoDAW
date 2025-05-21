const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};


export const getDoctorById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });
        if (!response.ok) {
            throw new Error("Error al obtener doctor");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al obtener doctor:", error);
        throw error;
    }
}

export default {
    getDoctorById,
}