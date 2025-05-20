"use client"

import { useState, useEffect } from "react"
import Calendario from "./../Calendario"
import { RefreshCw, Calendar, AlertCircle } from "lucide-react"
import LoadingSpinner from "../../Common/LoadingSpinner"

const AgendaDoctor = () => {
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAppointments = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Obtener el ID del doctor del localStorage
      const doctorId = localStorage.getItem("userId")
      const token = localStorage.getItem("authtoken")

      if (!doctorId) {
        throw new Error("No se encontró el ID del doctor en localStorage")
      }

      // Hacer la llamada a la API para obtener citas por doctor
      const response = await fetch(`http://localhost:3000/citas/bydoctor/${doctorId}`, {

        method: 'GET',
        headers: {
          'Authorization': `${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error al obtener las citas: ${response.statusText}`)
      }

      const data = await response.json()
      setAppointments(data.data)
    } catch (err) {
      console.error("Error fetching appointments:", err)
      setError(err instanceof Error ? err.message : "Error desconocido al obtener las citas")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleAppointmentClick = (appointment) => {
    console.log("Cita seleccionada:", appointment)
    // Aquí puedes implementar la lógica para mostrar detalles o acciones
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Agenda del Doctor</h2>
          </div>
          <p className="text-gray-500 text-sm mt-1">Visualiza y gestiona tus citas con pacientes</p>
        </div>
        <div className="p-4">
          {isLoading ? (
            <LoadingSpinner message="Cargando citas..." />
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <h3 className="text-red-800 font-medium">Error</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <Calendario
              appointments={appointments}
              onAppointmentClick={handleAppointmentClick}
              viewType="doctor" // Indicar que es vista de doctor
            />
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={fetchAppointments}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" style={{ backgroundColor: "var(--primary-color)" }} />
                  Actualizar citas
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgendaDoctor
