const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

// === USUARIOS ===
// función para obtener todos los usuarios
export const getAllUsers = async () => {

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
        return data.data;
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
        throw error;
    }
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

// función para eliminar un usuario
export const deleteUser = async (id) => {
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

// === DIAGNÓSTICOS ===
// Obtener todos los diagnósticos
export const getAllDiagnosticos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener diagnósticos");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar diagnósticos:", error);
        throw error;
    }
};

// Obtener diagnóstico por ID
export const getDiagnosticoById = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener diagnóstico");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar diagnóstico:", error);
        throw error;
    }
};

// Obtener diagnóstico por ID de cita
export const getDiagnosticoByCitaId = async (citaId) => {

    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos/byCita/${citaId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener diagnóstico por cita");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar diagnóstico por cita:", error);
        throw error;
    }
};

// Crear un diagnóstico
export const createDiagnostico = async (diagnosticoData) => {

    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(diagnosticoData)
        });

        if (!response.ok) {
            throw new Error("Error al crear diagnóstico");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al crear diagnóstico:", error);
        throw error;
    }
};

// Actualizar un diagnóstico
export const updateDiagnostico = async (id, diagnosticoData) => {

    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(diagnosticoData)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar diagnóstico");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al actualizar diagnóstico:", error);
        throw error;
    }
};

// Eliminar un diagnóstico
export const deleteDiagnostico = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar diagnóstico");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar diagnóstico:", error);
        throw error;
    }
};

// === CITAS ===
// Obtener todas las citas
export const getAllCitas = async () => {

    try {
        const response = await fetch(`${API_BASE_URL}/citas`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener citas");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar citas:", error);
        throw error;
    }
};

// Obtener citas por paciente
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

// Obtener citas por doctor
export const getCitaByDoctor = async (doctorId) => {

    try {
        const response = await fetch(`${API_BASE_URL}/citas/bydoctor/${doctorId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener citas del doctor");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar citas del doctor:", error);
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

