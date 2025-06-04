import { Clock, User, FileText, CheckCircle, Stethoscope, Pill, AlertCircle, Calendar, Activity, Folder, Tablets, TestTube, } from "lucide-react";
import { useFormatCita } from "../../../../hooks/medical/useFormatCita";
import LoadingSpinner from "../../../Common/LoadingSpinner";

const DetallesCita = ({ cita, onClose, citaDetails, loadingDetails, detailsError }) => {
    const { formatDate, formatTime, getEstadoClassName } = useFormatCita();
    const { doctor, diagnostico, recetas } = citaDetails || { doctor: null, diagnostico: null, recetas: [] };

    if (!cita) return null;

    // Estado de cita personalizado con los nuevos colores
    const getEstadoClass = (estado) => {
        switch (estado?.toLowerCase()) {
            case 'completada':
                return 'bg-emerald-100 text-emerald-800 border-emerald-300';
            case 'pendiente':
                return 'bg-amber-100 text-amber-800 border-amber-300';
            case 'cancelada':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="mt-6 bg-slate-50 rounded-lg border border-slate-200 shadow-md overflow-hidden animate-fadeIn">
            {/* Encabezado */}
            <div className="bg-sky-700 text-white px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Folder className="h-5 w-5" />
                    Detalles Completos de la Cita
                </h3>
                <button
                    onClick={onClose}
                    className="text-sky-100 hover:text-white transition-colors"
                    aria-label="Cerrar detalles"
                >
                </button>
            </div>

            {/* Contenido */}
            <div className="p-6">
                {loadingDetails ? (
                    <div className="flex justify-center py-8">
                        <LoadingSpinner message="Cargando información detallada..." />
                    </div>
                ) : detailsError ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
                        <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                            <div>
                                <p className="text-red-700 text-sm font-medium">{detailsError}</p>
                                <p className="text-red-600 text-xs mt-1">Se muestra información básica disponible</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Panel de información principal */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Información de la cita */}
                            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
                                <h4 className="font-semibold text-sky-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                                    <Clock className="h-4 w-4" />
                                    Información de la Cita
                                </h4>

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-slate-500 text-sm block mb-1">Tipo de consulta:</span>
                                        <span className="font-medium text-slate-800">{cita.nombre}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-slate-500 text-sm block mb-1">Fecha:</span>
                                            <span className="font-medium text-slate-800">{formatDate(cita.fecha)}</span>
                                        </div>

                                        <div>
                                            <span className="text-slate-500 text-sm block mb-1">Estado:</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${getEstadoClass(cita.estado)}`}>
                                                <CheckCircle className="h-3 w-3 inline mr-1" />
                                                {cita.estado}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-slate-500 text-sm block mb-1">Hora inicio:</span>
                                            <span className="font-medium text-slate-800 flex items-center gap-1">
                                                <Clock className="h-4 w-4 text-sky-500" />
                                                {formatTime(cita.hora_inicio)}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-slate-500 text-sm block mb-1">Hora fin:</span>
                                            <span className="font-medium text-slate-800 flex items-center gap-1">
                                                <Clock className="h-4 w-4 text-sky-500" />
                                                {formatTime(cita.hora_fin)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Información del doctor */}
                            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
                                <h4 className="font-semibold text-sky-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                                    <User className="h-4 w-4" />
                                    Información del Doctor
                                </h4>

                                {!doctor ? (
                                    <div className="h-40 flex items-center justify-center text-slate-400">
                                        Cargando información del doctor...
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-slate-500 text-sm block mb-1">Doctor:</span>
                                            <span className="font-medium text-slate-800 flex items-center gap-1">
                                                <User className="h-4 w-4 text-sky-500" />
                                                Dr. {doctor.usuario.nombre} {doctor.usuario.apellido1}
                                            </span>
                                        </div>

                                        {doctor.especialidad && (
                                            <div>
                                                <span className="text-slate-500 text-sm block mb-1">Especialidad:</span>
                                                <span className="font-medium text-slate-800">{doctor.especialidad}</span>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {doctor.telefono && (
                                                <div>
                                                    <span className="text-slate-500 text-sm block mb-1">Teléfono:</span>
                                                    <span className="font-medium text-slate-800">{doctor.telefono}</span>
                                                </div>
                                            )}

                                            {doctor.email && (
                                                <div>
                                                    <span className="text-slate-500 text-sm block mb-1">Email:</span>
                                                    <span className="font-medium text-slate-800">{doctor.email}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sección de diagnóstico */}
                        {diagnostico && (
                            <div className="mt-6">
                                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
                                    <h4 className="font-semibold text-sky-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                                        <Stethoscope className="h-4 w-4" />
                                        Diagnóstico
                                    </h4>

                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-slate-500 text-sm block mb-1">Diagnóstico:</span>
                                            <span className="font-medium text-slate-800">{diagnostico.nombre}</span>
                                        </div>

                                        <div>
                                            <span className="text-slate-500 text-sm block mb-1">Síntomas:</span>
                                            <p className="text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">{diagnostico.sintomas}</p>
                                        </div>

                                        {diagnostico.observaciones && (
                                            <div>
                                                <span className="text-slate-500 text-sm block mb-1">Observaciones médicas:</span>
                                                <p className="text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">{diagnostico.observaciones}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sección de recetas */}
                        {recetas && recetas.length > 0 && (
                            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                                <h4 className="font-semibold text-sky-800 flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                                    <Pill className="h-5 w-5 text-sky-600" />
                                    <span>Recetas médicas</span>
                                    <span className="ml-1 bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                        {recetas.length}
                                    </span>
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {recetas.map((receta) => (
                                        <div
                                            key={receta.id_receta || `receta-${Math.random()}`}
                                            className="bg-sky-50 rounded-lg p-5 border border-sky-100 hover:shadow-md transition-shadow duration-200"
                                        >
                                            <div className="space-y-4">
                                                

                                                <div className="flex items-start gap-3">
                                                    <Tablets className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <span className="text-slate-500 text-sm block mb-1">Medicamento:</span>
                                                        <span className="font-medium text-slate-800">{receta.medicamento.nombre}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <TestTube className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <span className="text-slate-500 text-sm block mb-1">Dosis:</span>
                                                        <span className="font-medium text-slate-800">{receta.dosis}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <Clock className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <span className="text-slate-500 text-sm block mb-1">Duración:</span>
                                                        <span className="font-medium text-slate-800">{receta.duracion}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <Calendar className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <span className="text-slate-500 text-sm block mb-1">Fecha receta:</span>
                                                        <span className="font-medium text-slate-800">
                                                            {new Date(receta.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                {receta.instrucciones && (
                                                    <div className="flex items-start gap-3 pt-2 mt-2 border-t border-sky-100">
                                                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                                        <div className="flex-1">
                                                            <span className="text-slate-500 text-sm block mb-1">Instrucciones:</span>
                                                            <span className="font-medium text-slate-800">{receta.instrucciones}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Botón de cerrar en el footer */}
                <div className="mt-6 pt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors font-medium text-sm shadow-sm"
                    >
                        Cerrar detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetallesCita;