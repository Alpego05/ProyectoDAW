const API_BASE_URL = "http://localhost:3000";

// función para obtener el token
const getToken = () => {
  return localStorage.getItem("authToken") || "";
};

export const getHorarioByDoctorId = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}/horarios/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener horario");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al cargar horario:", error);
        throw error;
    }
};



export default {
    getHorarioByDoctorId

}