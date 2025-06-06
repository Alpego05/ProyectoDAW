import React from 'react';
import { Calendar, Clock, User, Stethoscope, FileText, Edit3, X } from 'lucide-react';

const CitaCard = ({
    cita,
    tipo,
    diagnosticoAsociado,
    esPendiente,
    formatDate,
    formatHour,
    handleEditarCita,
    handleCancelarCita,
    handleGenerarPDF,
    pdfLoading
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" style={{ color: '#0077b6' }} />
                            <span className="font-medium" style={{ color: '#1e293b' }}>
                                {cita.nombre}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" style={{ color: '#64748b' }} />
                            <span style={{ color: '#475569' }}>
                                {formatDate(cita.fecha)}
                            </span>
                            <span style={{ color: '#64748b' }}>
                                {formatHour(cita.hora_inicio)} - {formatHour(cita.hora_fin)}
                            </span>
                        </div>

                        
                        {cita.motivo && (
                            <p className="text-sm" style={{ color: '#64748b' }}>
                                <strong>Motivo:</strong> {cita.motivo}
                            </p>
                        )}

                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cita.estado === 'Completada' ? 'bg-green-100 text-green-800' :
                                    cita.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                        cita.estado === 'No asistida' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                }`}>
                                {cita.estado || 'Sin estado'}
                            </span>
                        </div>
                    </div>

                    {esPendiente && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEditarCita(cita)}
                                className="cursor-pointer p-2 rounded-full transition-colors"
                                style={{
                                    color: '#0077b6',
                                    ':hover': { backgroundColor: '#e6f3f8' }
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#e6f3f8'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                title="Cambiar horario">
                                <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => handleCancelarCita(cita)}
                                className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Cancelar cita">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>

                {diagnosticoAsociado && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Stethoscope className="h-4 w-4 text-purple-400"  />
                                    <span className="font-medium" style={{ color: '#1e293b' }}>Diagnóstico</span>
                                </div>
                                <h4 className="font-medium" style={{ color: '#1e293b' }}>
                                    {diagnosticoAsociado.nombre || "Sin título"}
                                </h4>
                                {diagnosticoAsociado.sintomas && (
                                    <p className="text-sm line-clamp-2" style={{ color: '#64748b' }}>
                                        {diagnosticoAsociado.sintomas}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => handleGenerarPDF(cita)}
                                disabled={pdfLoading}
                                className="cursor-pointer text-purple-400 flex items-center gap-1 text-sm disabled:opacity-50 transition-colors"
                                style={{ color: '#0077b6' }}
                                onMouseEnter={(e) => !pdfLoading && (e.target.style.color = '#005b8a')}
                                onMouseLeave={(e) => !pdfLoading && (e.target.style.color = '#0077b6')}
                                title="Generar PDF">
                                <FileText className="h-4 w-4" />
                                <span>{pdfLoading ? 'Generando...' : 'PDF'}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

};

export default CitaCard;