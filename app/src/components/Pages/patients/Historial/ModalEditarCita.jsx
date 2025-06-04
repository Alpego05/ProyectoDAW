import React from 'react';
import { X, Calendar, Clock } from 'lucide-react';

const ModalEditarCita = ({ cita, onClose, onSubmit, formatDate }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        onSubmit(
            formData.get('fecha'),
            formData.get('hora_inicio'),
            formData.get('hora_fin')
        );
    };

    return (
        <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Cambiar Horario de Cita
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                        {/* Información actual */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Horario actual:</h4>
                            <p className="text-sm text-gray-600">
                                {formatDate(cita.fecha)} • {cita.hora_inicio} - {cita.hora_fin}
                            </p>
                        </div>

                        </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEditarCita;