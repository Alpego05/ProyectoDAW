import { useState, useEffect } from "react"
import Calendario from "./../Calendario"
import { RefreshCw, Calendar, AlertCircle } from "lucide-react"
import { getCitaByPatient } from "./../../../services/apiPatientClient";


const AgendaPaciente = () => {
   const [citas, setCitas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarCitas = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const userId = localStorage.getItem("userId")
      if (!userId) throw new Error("No se encontró el ID del usuario en localStorage")

      const data = await getCitaByPatient(userId)
      setCitas(data)
    } catch (err) {
      console.error("Error al obtener citas:", err)
      setError(err instanceof Error ? err.message : "Error desconocido al obtener las citas")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    cargarCitas()
  }, [])


  const handleCitaClick = (cita) => {
    console.log(cita)
    // Aquí puedes implementar la lógica para mostrar detalles o acciones
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Mi Agenda Médica</h2>
          </div>
          <p className="text-gray-500 text-sm mt-1">Visualiza y gestiona tus citas médicas</p>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
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
            <Calendario citas={citas} onCitaClick={handleCitaClick} />
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={cargarCitas}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
                isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
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

export default AgendaPaciente

