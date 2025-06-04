const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

export const getAllCitas = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/citas`, {
            method: "GET",
            headers: {
                'Authorization': `${getToken()}`
            },
        });
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCitasByPatient = async (patientId) => {
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
        return data.data || []; 
    } catch (error) {
        console.error("Error al cargar citas del paciente:", error);
        return []; 
    }
};

export const getCitasByDoctor = async (doctorId) => {
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

// ver si existe una cita para un paciente con un doctor específico
export const checkExistingCita = async (patientId, doctorId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/citas/check/${patientId}/${doctorId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al verificar citas existentes");
        }

        const data = await response.json();
        return data.exists || false;
    } catch (error) {
        console.error("Error al verificar citas existentes:", error);
        //  asumimos que no existe 
        return false;
    }
};


export const createCita = async (citaData) => {
    try {
        const fecha = new Date(citaData.fecha);
        const horaInicio = citaData.hora || '10:00';
        const [horas, minutos] = horaInicio.split(':');
        
        const fechaFin = new Date(fecha);
        fechaFin.setHours(parseInt(horas), parseInt(minutos) + 30);
        
        const payload = {
            doctor_id: citaData.doctorId.toString(),
            nombre: citaData.motivo || "Consulta médica",
            paciente_id: citaData.patientId.toString(),
            fecha: fecha.toISOString().split('T')[0], // YYYY-MM-DD
            hora_inicio: `${horaInicio}:00`,
            hora_fin: fechaFin.toTimeString().split(' ')[0], // HH:MM:SS
            estado: "Pendiente"
        };

        const response = await fetch(`${API_BASE_URL}/citas/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al crear cita");
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
    getCitasByPatient,
    getCitasByDoctor,
    createCita,
    updateCita,
    deleteCita,
    getAllCitas,
    checkExistingCita
};