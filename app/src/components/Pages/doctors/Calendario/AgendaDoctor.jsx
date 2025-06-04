import { useState, useEffect } from "react"
import Calendario from "../../../Common/Calendario"
import { RefreshCw, Calendar, AlertCircle } from "lucide-react"
import CitasHoy from "./CitasHoy"
import LoadingScreen from "../../../Common/LoadingScreen"

const AgendaDoctor = () => {
  const [Citas, setCitas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCitas = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const doctorId = localStorage.getItem("userId")
      const token = localStorage.getItem("authtoken")

      if (!doctorId) {
        throw new Error("No se encontró el ID del doctor en localStorage")
      }

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
      setCitas(data.data)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Error desconocido al obtener las citas")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCitas()
  }, [])

  const handleCitasClick = (Citas) => {
    console.log("Cita seleccionada:", Citas)
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
              <Calendar className="h-7 w-7 "   style={{ color: "var(--primary-color)" }}/>
            <h2 className="text-xl font-semibold">Agenda</h2>
          </div>
          <p className="text-gray-500 text-sm mt-1">Visualiza y gestiona tus citas con pacientes</p>
        </div>
        <div className="p-4">
          {isLoading ? (
            <LoadingScreen message="Cargando citas..." />
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
              citas={Citas}
              onCitaClick={handleCitasClick}
              viewType="doctor"
            />
          )}
        </div>
      </div>

      <CitasHoy></CitasHoy>
    </div>
  )
}

export default AgendaDoctor
