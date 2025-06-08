const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};


export const getAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: "GET",
        headers: {
            'Authorization': `${getToken()}`
        }
    });
    const data = await response.json();
    return data.data;
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

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || "Error al actualizar usuario");
        }
        return data.data;
        
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        
        if (error.name === 'TypeError' || error.name === 'SyntaxError') {
            throw new Error('Error de conexión. Verifique su conexión a internet.');
        }
        throw error;
    }
};

// Nueva función para cambiar contraseña sin token
export const changePassword = async (id, passwordData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/change-password/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwordData)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || "Error al cambiar contraseña");
        }
        return data.data;
        
    } catch (error) {
        console.error("Error al cambiar contraseña:", error);
        
        if (error.name === 'TypeError' || error.name === 'SyntaxError') {
            throw new Error('Error de conexión. Verifique su conexión a internet.');
        }
        throw error;
    }
};
export default {
    getAllUsers,
    getUserById,
    updateUser,
    changePassword
}