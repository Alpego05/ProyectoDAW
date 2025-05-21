import { RefreshCw, Calendar, AlertCircle } from "lucide-react"
import Calendario from "../../Common/Calendario"
import LoadingSpinner from "./../../Common/LoadingSpinner"
import { useCitas } from "./../../../hooks/useGestionMedica"
import DetallesCita from "./DetallesCita"


const AgendaPaciente = () => {
  const {
    citas,
    isLoading,
    error,
    selectedCita,
    citaDetails,
    loadingDetails,
    detailsError,
    cargarCitas,
    handleCitaClick,
    closeDetails
  } = useCitas();

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
            <Calendario citas={citas} onCitaClick={handleCitaClick} />
          )}

          {selectedCita && (
            <DetallesCita cita={selectedCita} onClose={closeDetails} citaDetails={citaDetails} loadingDetails={loadingDetails} detailsError={detailsError}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgendaPaciente