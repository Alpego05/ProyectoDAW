const API_BASE_URL = "http://localhost:3000"

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken")
}

// función para crear pacientes
const createPatient = async (patientData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register/patient`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `${getToken()}`, 
            },
            body: JSON.stringify(patientData)
        })

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating patient:', error)
        throw error
    }
}

// función para crear doctores
const createDoctor = async (doctorData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register/doctor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `${getToken()}`,
            },
            body: JSON.stringify(doctorData)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating doctor:', error)
        throw error
    }
}

export default {
    createPatient,
    createDoctor
}
