import { WormIcon as Virus, ChevronRight } from "lucide-react"

const TarjetaEnfermedad = ({ enfermedad, onClick }) => (
    <div
        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
    >
        <div className="flex items-start">
            <div className="p-2 rounded-full bg-red-100 mr-3">
                <Virus className="h-5 w-5 text-red-600" />
            </div>
            <div>
                <div className="flex justify-between items-start">
                    <h4 className="font-medium">{enfermedad.nombre}</h4>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center mt-1">
                    <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">
                        CIE: {enfermedad.codigo_cie}
                    </span>
                </div>
                <p className="text-sm mt-2">{enfermedad.desc || "Sin descripción disponible"}</p>
                {enfermedad.sintomas && (
                    <p className="text-sm mt-2">
                        <span className="font-medium">Síntomas:</span> {enfermedad.sintomas}
                    </p>
                )}
                <p className="text-xs text-red-600 mt-2 flex items-center">
                    Ver detalles completos
                    <ChevronRight className="h-3 w-3 ml-1" />
                </p>
            </div>
        </div>
    </div>
)

export default TarjetaEnfermedad