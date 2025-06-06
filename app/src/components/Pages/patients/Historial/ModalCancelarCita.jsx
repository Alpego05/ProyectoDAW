import { X, AlertTriangle, Calendar, Clock, User, Loader2 } from "lucide-react"

const ModalCancelarCita = ({ cita, onClose, onConfirm, formatDate, formatHour, loading = false }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="rounded-xl bg-white shadow-lg w-full max-w-md transform transition-all duration-300 scale-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-100">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1f2937]">Cancelar Cita</h3>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl p-2 hover:bg-[#f9fafb] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X className="h-5 w-5 text-[#6b7280]" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Warning message */}
                    <div className="mb-6">
                        <p className="text-[#1f2937] mb-4">¿Estás seguro de que deseas cancelar esta cita?</p>
                        <p className="text-sm text-red-600 bg-red-50 p-3">Esta acción no se puede deshacer.</p>
                    </div>

                    {/* Cita details */}
                    <div className="bg-[#f9fafb] p-4 mb-6">
                        <h4 className="text-sm font-medium text-[#1f2937] mb-3">Detalles de la cita:</h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <Calendar className="h-4 w-4 text-[#6b7280]" />
                                <span className="text-[#1f2937]">{formatDate(cita.fecha)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Clock className="h-4 w-4 text-[#6b7280]" />
                                <span className="text-[#1f2937]">
                                    {formatHour(cita.hora_inicio)} - {formatHour(cita.hora_fin)}
                                </span>
                            </div>
                            {cita.motivo && (
                                <div className="text-sm">
                                    <span className="text-[#6b7280]">Motivo:</span>
                                    <span className="text-[#1f2937] ml-1">{cita.motivo}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-xl cursor-pointer px-4 py-2 text-[#6b7280] hover:text-[#1f2937] hover:bg-[#f9fafb] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            No, mantener cita
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="rounded-xl cursor-pointer px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                            {loading ? "Cancelando..." : "Sí, cancelar cita"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCancelarCita
