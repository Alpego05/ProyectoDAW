import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { Clock, NotebookPen } from "lucide-react"
import { useFormatCita } from "../../hooks/medical/useFormatCita"
import "./../../index.css"

const Calendario = ({ citas = [], onCitaClick, viewType = "patient" }) => {
  const [date, setDate] = useState(new Date())
  const { getEstadoClassName, formatTime, formatDate } = useFormatCita()

  // Función para convertir fecha a string local (sin UTC) para el calendario
  const formatDateForCalendar = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // agrupamos citas por fecha
  const citasPorFecha = {}

  citas.forEach((cita) => {
    if (!citasPorFecha[cita.fecha]) {
      citasPorFecha[cita.fecha] = []
    }
    citasPorFecha[cita.fecha].push(cita)
  })

  const getBadgeColor = (dayCitas) => {
    if (dayCitas.some((c) => c.estado === "No asistida")) {
      return "bg-red-500 text-white"
    } else if (dayCitas.some((c) => c.estado === "Pendiente")) {
      return "bg-amber-500 text-white"
    } else {
      return "bg-green-500 text-white"
    }
  }

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null

    const dateStr = formatDateForCalendar(date)
    const dayCitas = citasPorFecha[dateStr] || []

    if (dayCitas.length === 0) return null

    return (
      <div className="mt-1">
        {dayCitas.length > 0 && (
          <div className="text-xs">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getBadgeColor(dayCitas)}`}
            >
              {dayCitas.length}
            </span>
          </div>
        )}
      </div>
    )
  }

  // Renderizar la clase del día
  const tileClassName = ({ date, view }) => {
    if (view !== "month") return ""

    const dateStr = formatDateForCalendar(date)
    const dayCitas = citasPorFecha[dateStr] || []

    if (dayCitas.length === 0) return ""

    return "font-medium"
  }

  const selectedDateStr = formatDateForCalendar(date)
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
                 <NotebookPen className="h-7 w-7 "   style={{ color: "var(--primary-color)" }}/>
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
                    className="bg-white border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all duration-300 hover:border-gray-300"
                    onClick={() => onCitaClick && onCitaClick(cita)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-gray-900">{cita.nombre}</div>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getEstadoClassName(cita.estado)}`}>
                        {cita.estado}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-3 w-3 mr-2" />
                      <span>
                        {formatTime(cita.hora_inicio)} - {formatTime(cita.hora_fin)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
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