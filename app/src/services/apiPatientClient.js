const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

// === USUARIOS ===
// función para obtener todos los usuarios

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


// === DIAGNÓSTICOS ===
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




// === CITAS ===
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

// === RECETAS ===
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
        console.log(data)
        return data.data;
    } catch (error) {
        console.error("Error al cargar recetas del paciente:", error);
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
            throw new Error("Error al obtener doctor");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al obtener doctor:", error);
        throw error;
    }
}


export const getRecetasByCitaId = async (citaId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/recetas/bycita/${citaId
            }`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });
        if (!response.ok) {
            throw new Error("Error al obtener recetas del paciente");
        }
        const data = await response.json();
        console.log(data)
        return data.data;
    } catch (error) {
        console.error("Error al obtener recetas del paciente:", error);
        throw error;
    }
};



export const getRecetasByDiagnosticoId = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/recetas/bydiagnostico/${id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `${getToken()}`
                }
            }
        );
        if (!response.ok) {
            throw new Error("Error al obtener recetas del paciente");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al obtener recetas del paciente:", error);
        throw error;
        }
    }


