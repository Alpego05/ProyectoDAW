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

//conseguir diagnosticos por paciente
export const getDiagnosticosByPacienteId = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}/diagnosticos/byPatient/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener diagnósticos por paciente");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar diagnosticos por paciente:", error);
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

// === PACIENTES ===
// Obtener todos los pacientes
export const getAllPatients = async () => {

    try {
        const response = await fetch(`${API_BASE_URL}/patients`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener pacientes");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar pacientes:", error);
        throw error;
    }
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

// Eliminar un paciente
export const deletePatient = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}/patients/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar paciente");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar paciente:", error);
        throw error;
    }
};

// === RECETAS ===
// Obtener todas las recetas
export const getAllRecetas = async () => {

    try {
        const response = await fetch(`${API_BASE_URL}/recetas`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener recetas");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar recetas:", error);
        throw error;
    }
};

// Obtener receta por ID
export const getRecetaById = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}/recetas/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener receta");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar receta:", error);
        throw error;
    }
};

// Obtener recetas por diagnóstico
export const getRecetasByDiagnosticoId = async (diagnosticoId) => {

    try {
        const response = await fetch(`${API_BASE_URL}/recetas/bydiagnostico/${diagnosticoId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener recetas por diagnóstico");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar recetas por diagnóstico:", error);
        throw error;
    }
};

// Obtener recetas por paciente
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
        return data.data;
    } catch (error) {
        console.error("Error al cargar recetas del paciente:", error);
        throw error;
    }
};

// Crear una receta
export const createReceta = async (recetaData) => {

    try {
        const response = await fetch(`${API_BASE_URL}/recetas/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(recetaData)
        });

        if (!response.ok) {
            throw new Error("Error al crear receta");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al crear receta:", error);
        throw error;
    }
};

// Actualizar una receta - Corregí esta función ya que hay un error en recetaRoutes.js
export const updateReceta = async (id, recetaData) => {

    try {
        const response = await fetch(`${API_BASE_URL}/recetas/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(recetaData)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar receta");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al actualizar receta:", error);
        throw error;
    }
};

// Eliminar una receta
export const deleteReceta = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}/recetas/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar receta");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar receta:", error);
        throw error;
    }
};