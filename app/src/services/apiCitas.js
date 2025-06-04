const API_BASE_URL = "http://localhost:3000"

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || ""
}

export const getAllCitas = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/citas`, {
            method: "GET",
            headers: {
                Authorization: `${getToken()}`,
            },
        })
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error(error)
    }
}

export const getCitasByPatient = async (patientId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/citas/bypatient/${patientId}`, {
            method: "GET",
            headers: {
                Authorization: `${getToken()}`,
            },
        })

        if (!response.ok) {
            throw new Error("Error al obtener citas del paciente")
        }

        const data = await response.json()
        return data.data || []
    } catch (error) {
        console.error("Error al cargar citas del paciente:", error)
        return []
    }
}

export const getCitasByDoctor = async (doctorId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/citas/bydoctor/${doctorId}`, {
            method: "GET",
            headers: {
                Authorization: `${getToken()}`,
            },
        })

        if (!response.ok) {
            throw new Error("Error al obtener citas del doctor")
        }

        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error al cargar citas del doctor:", error)
        throw error
    }
}


export const createCita = async (citaData) => {
    try {
        console.log( citaData)
        if (!citaData) {
            throw new Error("Los datos de la cita son requeridos")
        }

        const { doctorId, patientId, fecha, hora, motivo } = citaData


        if (!doctorId || !patientId || !fecha || !hora) {
            throw new Error("Faltan campos requeridos: doctorId, patientId, fecha, hora")
        }

        const [hours, minutes] = hora.split(":").map(Number)
        const startTime = new Date()
        startTime.setHours(hours, minutes, 0, 0)

        const endTime = new Date(startTime)
        endTime.setMinutes(endTime.getMinutes() + 30)

        const hora_fin = endTime.toTimeString().slice(0, 5)

        const payload = {
            doctor_id: doctorId.toString(),
            nombre: motivo || "Consulta médica",
            paciente_id: patientId.toString(), 
            fecha: fecha, // YYYY-MM-DD
            hora_inicio: hora,
            hora_fin: hora_fin,
            estado: "Pendiente",
        }



        const response = await fetch(`${API_BASE_URL}/citas/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${getToken()}`,
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error("Error del servidor:", errorData)
            throw new Error(errorData.message || "Error al crear cita")
        }

        const data = await response.json()
        console.log("Cita creada:", data)
        return data.data
    } catch (error) {
        console.error("Error en createCita:", error)
        throw error
    }
}

// Actualizar una cita
export const updateCita = async (id, citaData) => {
    try {

        console.log(citaData)
        const payload = {
            patient_id: citaData.patient_id,
            doctor_id: citaData.doctor_id,
            fecha: citaData.fecha,
            hora_inicio: citaData.hora_inicio,
            hora_fin: citaData.hora_fin,
            estado: citaData.estado || "Pendiente",
        }

        const response = await fetch(`${API_BASE_URL}/citas/edit/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${getToken()}`,
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error("Error del servidor:", errorData)
            throw new Error(errorData.message || "Error al actualizar cita")
        }

        const data = await response.json()
        console.log("Cita actualizada:", data)
        return data.data
    } catch (error) {
        console.error("Error al actualizar cita:", error)
        throw error
    }
}

export const deleteCita = async (citaId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/citas/delete/${citaId}`, {
            method: "DELETE",
            headers: {
                Authorization: `${getToken()}`,
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json()
            return data
        }
        if (response.status === 204 || response.status === 200) {
            return { success: true, message: "Cita eliminada correctamente" }
        }
        const text = await response.text()
        if (text) {
            return { success: true, message: text }
        }

        return { success: true, message: "Cita eliminada correctamente" }
    } catch (error) {
        console.error("Error in deleteCita:", error)
        throw new Error(`Error al eliminar la cita: ${error.message}`)
    }
}

export default {
    getCitasByPatient,
    getCitasByDoctor,
    createCita,
    updateCita,
    deleteCita,
    getAllCitas,
}

