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
        setIsLoading(false)
        return
      }

      const response = await fetch(`http://localhost:3000/citas/bydoctor/${doctorId}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token || ''}`
        }
      }).catch(() => null)

      if (!response || !response.ok) {
        setCitas([])
        setIsLoading(false)
        return
      }

      const data = await response.json().catch(() => ({ data: [] }))
      setCitas(Array.isArray(data.data) ? data.data : [])
    } catch (err) {
      console.error("Error al obtener citas:", err)
      setError("Error al cargar las citas")
      setCitas([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCitas()
  }, [])

  const handleCitasClick = (Citas) => {
    if (Citas) {
      console.log("Cita seleccionada:", Citas)
    }
  }

  

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-7 w-7" style={{ color: "var(--primary-color)" }} />
              <h2 className="text-xl font-semibold">Agenda</h2>
            </div>
           
          </div>
          <p className="text-gray-500 text-sm mt-1">Visualiza y gestiona tus citas con pacientes</p>
        </div>
        <div className="p-4">
          {isLoading ? (
            <LoadingScreen message="Cargando citas..." />
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-4 mb-4 flex items-start space-x-3 shadow-sm">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-red-800">Error al cargar citas</h4>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                    <button
                      onClick={handleRefresh}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Intentar nuevamente
                    </button>
                  </div>
                </div>
              )}
              <Calendario
                citas={Citas}
                onCitaClick={handleCitasClick}
                viewType="doctor"
              />
            </>
          )}
        </div>
      </div>

      <CitasHoy />
    </div>
  )
}

export default AgendaDoctor