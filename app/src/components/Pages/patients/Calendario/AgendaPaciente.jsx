import { RefreshCw, Calendar, AlertCircle } from "lucide-react"
import Calendario from "../../../Common/Calendario"
import { useCitas } from "../../../../hooks/medical/useCitas"
import DetallesCita from "./DetallesCita"
import LoadingScreen from "../../../Common/LoadingScreen"


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
    <div className="px-4 py-6 p-4  min-h-screen mt-12">
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
            <LoadingScreen />
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-5 flex items-start space-x-4 shadow-sm">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800">Error</h4>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          ) : (
            <Calendario citas={citas} onCitaClick={handleCitaClick} />
          )}

          {selectedCita && (
            <DetallesCita cita={selectedCita} onClose={closeDetails} citaDetails={citaDetails} loadingDetails={loadingDetails} detailsError={detailsError} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AgendaPaciente