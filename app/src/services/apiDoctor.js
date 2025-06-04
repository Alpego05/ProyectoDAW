const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

// Obtener todos los doctores
export const getAllDoctors = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/doctors`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Handle different possible response structures
        if (Array.isArray(data)) {
            return data;
        } else if (data && Array.isArray(data.data)) {
            return data.data;
        } else if (data && data.data) {
            return [data.data];
        } else {
            throw new Error("Unexpected API response structure");
        }
    } catch (error) {
        console.error("Error fetching doctors:", error);
        throw error;
    }
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
            throw new Error("Error ");
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
    getAllDoctors
}