const API_BASE_URL = "http://localhost:3000/";

// función para obtener el token
const getToken = () => {
    return sessionStorage.getItem("token") || "";
};

// === USUARIOS ===
// función para obtener todos los usuarios
export const getAllUsers = async () => {
    if (!verificarSesion()) return;

    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener usuarios");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
        throw error;
    }
};

// función para obtener un usuario por id
export const getUserById = async (id) => {
    if (!verificarSesion()) return;

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
        return data;
    } catch (error) {
        console.error("Error al cargar usuario:", error);
        throw error;
    }
};

// función para editar un usuario
export const updateUser = async (id, userData) => {
    if (!verificarSesion()) return;

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
        return data;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
    }
};

// función para eliminar un usuario
export const deleteUser = async (id) => {
    if (!verificarSesion()) return;

    try {
        const response = await fetch(`${API_BASE_URL}/users/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar usuario");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
};