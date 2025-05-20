import { Clock, User, FileText, CheckCircle } from "lucide-react";
import { useFormatCita } from "./../../../hooks/useCitas"

const DetallesCita = ({ cita, onClose }) => {
    const { formatDate, formatTime, getEstadoClassName } = useFormatCita();

    if (!cita) return null;

    return (
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-700">
                <FileText className="h-5 w-5" />
                Detalles de la Cita
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <div>
                        <span className="text-gray-500 text-sm block">Nombre:</span>
                        <span className="font-medium">{cita.nombre}</span>
                    </div>

                    <div>
                        <span className="text-gray-500 text-sm block">Fecha:</span>
                        <span className="font-medium">{formatDate(cita.fecha)}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div>
                            <span className="text-gray-500 text-sm block">Hora inicio:</span>
                            <span className="font-medium flex items-center gap-1">
                                <Clock className="h-4 w-4 text-blue-500" />
                                {formatTime(cita.hora_inicio)}
                            </span>
                        </div>

                        <div>
                            <span className="text-gray-500 text-sm block">Hora fin:</span>
                            <span className="font-medium flex items-center gap-1">
                                <Clock className="h-4 w-4 text-blue-500" />
                                {formatTime(cita.hora_fin)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <span className="text-gray-500 text-sm block">Doctor ID:</span>
                        <span className="font-medium flex items-center gap-1">
                            <User className="h-4 w-4 text-blue-500" />
                            {cita.doctor_id}
                        </span>
                    </div>

                    <div>
                        <span className="text-gray-500 text-sm block">Estado:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block mt-1 ${getEstadoClassName(cita.estado)}`}>
                            <CheckCircle className="h-3 w-3 inline mr-1" />
                            {cita.estado}
                        </span>
                    </div>

                    <div>
                        <span className="text-gray-500 text-sm block">ID de la cita:</span>
                        <span className="font-medium">{cita.id_cita}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-200 flex justify-end">
                <button
                    onClick={onClose}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    Cerrar detalles
                </button>
            </div>
        </div>
    );
};

export default DetallesCita;