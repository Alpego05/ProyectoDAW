const API_BASE_URL = "http://localhost:3000"

// función para obtener el token
const getToken = () => {
    return localStorage.getItem("authToken") || ""
}

// función para crear pacientes
const createPatient = async (PatientData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register/patient`, {
            method: "POST",
            headers: {
                "Authorization":  `${getToken()}`
            },
            body: JSON.stringify(PatientData)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

//funcion para crear doctores
const createDoctor = async (doctorData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register/doctor`, {
            method: "POST",
            headers: {
                "Authorization": `${getToken()}`
            },
            body: JSON.stringify(doctorData)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}



export default {
    createPatient,
    createDoctor

}