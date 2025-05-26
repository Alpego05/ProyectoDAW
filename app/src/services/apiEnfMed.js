const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || "";
};


export const getAllMedicamentos = async () => {
    const response = await fetch(`${API_BASE_URL}/med`, {
        method: "GET",
        headers: {
             'Authorization': `${getToken()}`
        }
    });
    const data = await response.json();
    return data.data;
};

export const getMedicamentoById = async (id) => {
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


export const getAllEnfermedades = async () => {
    const response = await fetch(`${API_BASE_URL}/enf`, {
        method: "GET",
        headers: {
             'Authorization': `${getToken()}`
        }
    });
    const data = await response.json();
    return data.data;
};

export const getEnfermedadById = async (id) => {
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

// Obtener medicamentos para una enfermedad específica
export const getMedicamentosByEnfermedad = async (enfermedadId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enfmed/enf/med/${enfermedadId}`, {
      method: "GET",
      headers: {
        Authorization: `${getToken()}`,
      },
    })
    if (!response.ok) {
      throw new Error("Error al obtener medicamentos para la enfermedad")
    }
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error al obtener medicamentos para la enfermedad:", error)
    throw error
  }
}

// Obtener enfermedades tratadas por un medicamento específico
export const getEnfermedadesByMedicamento = async (medicamentoId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enfmed/med/enf/${medicamentoId}`, {
      method: "GET",
      headers: {
        Authorization: `${getToken()}`,
      },
    })
    if (!response.ok) {
      throw new Error("Error al obtener enfermedades para el medicamento")
    }
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error al obtener enfermedades para el medicamento:", error)
    throw error
  }
}

export default {
    getAllMedicamentos,
    getMedicamentosByEnfermedad,
    getEnfermedadesByMedicamento,
    getAllEnfermedades,
    getMedicamentoById,
    getEnfermedadById,
}