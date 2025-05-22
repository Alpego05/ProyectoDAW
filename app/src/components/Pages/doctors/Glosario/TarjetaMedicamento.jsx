import { Pill, ChevronRight } from "lucide-react"

const TarjetaMedicamento = ({ medicamento, onClick }) => (
    <div
        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
    >
        <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
                <Pill className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className="font-medium">{medicamento.nombre}</h4>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-1">{medicamento.categoria || "Sin categoría"}</p>
                <p className="text-sm mt-2 line-clamp-2">{medicamento.desc || "Sin descripción disponible"}</p>
                <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {medicamento.forma_via || "No especificada"}
                    </span>
                </div>
                <p className="text-xs text-blue-600 mt-2 flex items-center">
                    Ver eficacia y detalles
                    <ChevronRight className="h-3 w-3 ml-1" />
                </p>
            </div>
        </div>
    </div>
)

export default TarjetaMedicamento