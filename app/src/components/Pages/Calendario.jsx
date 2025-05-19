import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { Clock, User, CalendarIcon, UserRound } from "lucide-react"

const Calendario = ({ citas = [], onCitaClick, viewType = "patient" }) => {
  const [date, setDate] = useState(new Date())

  // Agrupar citas por fecha
  const citasPorFecha = {}

  citas.forEach((cita) => {
    if (!citasPorFecha[cita.fecha]) {
      citasPorFecha[cita.fecha] = []
    }
    citasPorFecha[cita.fecha].push(cita)
  })

  // Función para formatear la hora
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    return `${hours}:${minutes}`
  }

  // Renderizar el contenido del día
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null

    const dateStr = date.toISOString().split("T")[0]
    const dayCitas = citasPorFecha[dateStr] || []

    if (dayCitas.length === 0) return null

    return (
      <div className="mt-1">
        {dayCitas.length > 0 && (
          <div className="text-xs">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                dayCitas.some((c) => c.estado === "Pendiente")
                  ? "bg-amber-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {dayCitas.length} {dayCitas.length === 1 ? "cita" : "citas"}
            </span>
          </div>
        )}
      </div>
    )
  }

  // Renderizar la clase del día
  const tileClassName = ({ date, view }) => {
    if (view !== "month") return ""

    const dateStr = date.toISOString().split("T")[0]
    const dayCitas = citasPorFecha[dateStr] || []

    if (dayCitas.length === 0) return ""

    return "font-medium"
  }

  // Mostrar detalles de las citas del día seleccionado
  const selectedDateStr = date.toISOString().split("T")[0]
  const citasSeleccionadas = citasPorFecha[selectedDateStr] || []

  return (
    <div className="cita-calendar">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <Calendar
              onChange={setDate}
              value={date}
              tileContent={tileContent}
              tileClassName={tileClassName}
              locale="es-ES"
              className="border-none w-full"
            />
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="pb-2 border-b mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">
                  Citas para el{" "}
                  {date.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
              </div>
            </div>

            {citasSeleccionadas.length === 0 ? (
              <p className="text-sm text-gray-500">No hay citas programadas para este día.</p>
            ) : (
              <div className="space-y-3">
                {citasSeleccionadas.map((cita) => (
                  <div
                    key={cita.id_cita}
                    className="bg-white border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onCitaClick && onCitaClick(cita)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{cita.nombre}</div>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          cita.estado === "Completada" ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                        }`}
                      >
                        {cita.estado}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-2" />
                        <span>
                          {formatTime(cita.hora_inicio)} - {formatTime(cita.hora_fin)}
                        </span>
                      </div>
                      {viewType === "doctor" ? (
                        <div className="flex items-center">
                          <UserRound className="h-3 w-3 mr-2" />
                          <span>Paciente ID: {cita.paciente_id}</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-2" />
                          <span>Doctor ID: {cita.doctor_id}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .react-calendar {
          width: 100%;
          font-family: inherit;
          border: none;
        }
        .react-calendar__tile {
          position: relative;
          height: 60px;
        }
        .react-calendar__tile--active {
          background: #f0f9ff;
          color: #0369a1;
        }
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: #e0f2fe;
        }
      `}</style>
    </div>
  )
}

export default Calendario

