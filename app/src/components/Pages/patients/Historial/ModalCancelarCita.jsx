import React from 'react';
import { X, AlertTriangle, Calendar, Clock, User, Loader2 } from 'lucide-react';

const ModalCancelarCita = ({ cita, onClose, onConfirm, formatDate, formatHour, loading = false }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Cancelar Cita
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Warning message */}
                    <div className="mb-6">
                        <p className="text-gray-700 mb-4">
                            ¿Estás seguro de que deseas cancelar esta cita?
                        </p>
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                            Esta acción no se puede deshacer.
                        </p>
                    </div>

                    {/* Cita details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Detalles de la cita:</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-700">
                                    {formatDate(cita.fecha)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-700">
                                    {formatHour(cita.hora_inicio)} - {formatHour(cita.hora_fin)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-700">
                                    Dr. {cita.doctor?.nombre || cita.doctor?.name || 'No especificado'}
                                </span>
                            </div>
                            {cita.motivo && (
                                <div className="text-sm">
                                    <span className="text-gray-500">Motivo:</span>
                                    <span className="text-gray-700 ml-1">{cita.motivo}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            No, mantener cita
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                            {loading ? 'Cancelando...' : 'Sí, cancelar cita'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCancelarCita;