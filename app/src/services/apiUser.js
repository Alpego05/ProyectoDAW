const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

// función para obtener un usuario por id
export const getUserById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener usuario");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar usuario:", error);
        throw error;
    }
};

// función para editar un usuario
export const updateUser = async (id, userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar usuario");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
    }
};

export default {
    getUserById,
    updateUser
}