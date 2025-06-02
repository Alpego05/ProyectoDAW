import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, User, Phone, History, FileText, Plus, TriangleAlert, ClipboardPlus } from 'lucide-react';
import { useFormatCita } from '../../../hooks/useGestionMedica';
import { useNavigate } from "react-router-dom";
import useFormat from '../../../hooks/useFormat';
import DiagnosticoModal from './DiagnosticoModal';
import { generateCitaPDF } from '../../Common/pdfcreator';

const CitaCard = ({
    cita,
    asignarCita,
    marcarComoCompletada,
    marcarComoNoAsistida,
}) => {
    const { getEstadoClassName } = useFormatCita();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDiagnosticoModal, setShowDiagnosticoModal] = useState(false);
    const navigate = useNavigate();
    const { formatHour } = useFormat();

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleAsignarDiagnostico = () => {
        setShowDiagnosticoModal(true);
    };

    const handleGeneratePDF = async () => {
        try {
            // if (!cita.diagnosticos || cita.diagnosticos.length === 0) {
            //     alert('Esta cita no tiene diagnósticos registrados');
            //     return;
            // }
            
            await generateCitaPDF(cita, formatHour);
        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Ocurrió un error al generar el PDF: ' + error.message);
        }
    };

    const isCompleted = cita.estado === 'Completada' || cita.estado === 'No asistida';

    return (
        <>
            <div
                className={`bg-white rounded-xl border shadow-sm transition-all duration-200 ${isExpanded ? 'border-gray-300' : 'border-gray-200 hover:border-gray-300'
                    } ${isCompleted ? 'opacity-70 bg-gradient-to-r from-gray-50 to-gray-100' : ''}`}
            >
                {/* Encabezado de la cita */}
                <div className="p-4 sm:p-6 cursor-pointer" onClick={toggleExpand}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 lg:space-x-6 min-w-0 flex-1">
                            <div className={`rounded-xl p-3 lg:p-4 shadow-sm flex-shrink-0 ${isCompleted ? 'bg-gray-200' : 'bg-blue-400'
                                }`}>
                                <Clock className={`h-5 w-5 lg:h-6 lg:w-6 ${isCompleted ? 'text-gray-500' : 'text-white'
                                    }`} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 truncate">
                                    {cita.nombre}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {formatHour(cita.hora_inicio)} - {formatHour(cita.hora_fin)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
                            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getEstadoClassName(cita.estado)
                                }`}>
                                {cita.estado}
                            </span>

                            <div className="flex items-center gap-2">
                                {!isCompleted && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                marcarComoCompletada(cita.id_cita);
                                            }}
                                            className="group cursor-pointer p-2 lg:p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md"
                                            title="Marcar como completada"
                                        >
                                            <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 group-hover:rotate-12 transition-transform duration-300" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                marcarComoNoAsistida(cita.id_cita);
                                            }}
                                            className="cursor-pointer group p-2 lg:p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md"
                                            title="Marcar como no asistida"
                                        >
                                            <XCircle className="h-4 w-4 lg:h-5 lg:w-5 group-hover:rotate-12 transition-transform duration-300" />
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExpand();
                                    }}
                                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                >
                                    {isExpanded ? (
                                        <ChevronUp className="h-5 w-5" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detalles desplegables */}
                {isExpanded && (
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 border-t border-gray-200 transition-all duration-300">
                        <div className="pt-4 space-y-6">
                            {cita.paciente ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <User className="h-4 w-4 text-gray-600" />
                                                <p className="text-sm font-medium text-gray-700">Paciente</p>
                                            </div>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {cita.paciente?.usuario.nombre} {cita.paciente?.usuario.apellido1}
                                            </p>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Phone className="h-4 w-4 text-gray-600" />
                                                <p className="text-sm font-medium text-gray-700">Teléfono</p>
                                            </div>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {cita.paciente.telefono}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Sección de acciones */}
                                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                            Acciones Disponibles
                                        </h4>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            {/* Ver Historial */}
                                            <button
                                                onClick={() => navigate(`/Home/Paciente/${cita.paciente_id}`)}
                                                className="cursor-pointer group flex items-center justify-center space-x-2 bg-purple-200 text-purple-700 hover:bg-purple-300 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-md">
                                                <History className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                                                <span>Ver Historial</span>
                                            </button>

                                            {/* Nuevo Diagnóstico */}
                                            <button
                                                onClick={handleAsignarDiagnostico}
                                                className="cursor-pointer group flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-500 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-md">
                                                <ClipboardPlus className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                                                <span>Nuevo Diagnóstico</span>
                                            </button>

                                            {/* Nueva Cita */}
                                            <button
                                                onClick={() => asignarCita(cita.paciente_id)}
                                                className="cursor-pointer group flex items-center justify-center space-x-2 bg-sky-100 text-sky-800 hover:bg-sky-500 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-md">
                                                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                                                <span>Nueva Cita</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Sección de exportación */}
                                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                            Exportar Información
                                        </h4>
                                        <button
                                            onClick={handleGeneratePDF}
                                            className="cursor-pointer group flex items-center justify-center space-x-2 bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FileText className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                                            <span>Generar PDF</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-red-100 rounded-full p-3">
                                            <TriangleAlert className="h-6 w-6 text-red-600" ></TriangleAlert>
                                        </div>
                                        <div>
                                            <h4 className="text-red-800 font-semibold text-lg">Error de Datos</h4>
                                            <p className="text-red-700">
                                                No se pudieron cargar los datos del paciente
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Diagnóstico */}
            <DiagnosticoModal
                isOpen={showDiagnosticoModal}
                onClose={() => setShowDiagnosticoModal(false)}
                citaId={cita.id_cita}
                pacienteId={cita.paciente_id}
                
            />
        </>
    );
};

export default CitaCard;