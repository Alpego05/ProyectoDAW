import React from 'react';
import useFormat from '../../../../hooks/useFormat';

import {
    User,
    Calendar,
    Clock,
    FileText,
    CalendarCheck,
    Info,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Loader2,
    Folder
} from 'lucide-react';

const FormCita = ({
    selectedDoctorId,
    selectedDate,
    selectedTime,
    motivo,
    onDoctorChange,
    onDateChange,
    onTimeChange,
    onMotivoChange,
    onSubmit,
    loading,
    loadingDoctors,
    error,
    showSuccess,
    doctores,
    selectedDoctor,
    horarioDisponible,
    horariosLibres,
    getAvailableDays
}) => {
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const future = new Date();
        future.setDate(future.getDate() + 30);
        return future.toISOString().split('T')[0];
    };

    const formatAvailableDays = () => {
        if (!horarioDisponible || horarioDisponible.length === 0) return '';

        const availableDays = getAvailableDays(horarioDisponible);
        const dayNames = {
            'lunes': 'Lunes',
            'martes': 'Martes',
            'miercoles': 'Miércoles',
            'jueves': 'Jueves',
            'viernes': 'Viernes',
            'sabado': 'Sábado',
            'domingo': 'Domingo'
        };

        return availableDays.map(day => dayNames[day] || day).join(', ');
    };

    const { formatHour } = useFormat();

    return (
        <div className="min-h-screen bg-[#f9fafb] pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Alert Messages */}
                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <XCircle className="h-5 w-5 text-red-400" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">Error al procesar</p>
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {showSuccess && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
                        <div className="flex">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">¡Cita agendada!</p>
                                <p className="text-sm text-green-700">Su cita ha sido solicitada correctamente.</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Main Form */}
                    <div className="bg-white border border-[#e5e7eb] shadow-sm flex-1 md:w-2/3">
                        <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
                            <h2 className="text-lg font-semibold text-[#1f2937] flex items-center space-x-2">
                                <CalendarCheck className="h-5 w-5 text-[#00629B]" />
                                <span>Solicitud de Cita</span>
                            </h2>
                        </div>

                        <form onSubmit={onSubmit} className="p-6 space-y-8">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-2 pb-2 border-b border-[#e5e7eb]">
                                    <User className="h-5 w-5 text-[#00629B]" />
                                    <h3 className="text-lg font-semibold text-[#1f2937]">Selección de Médico</h3>
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="doctor" className="block text-sm font-medium text-[#1f2937]">
                                        Seleccionar Doctor <span className="text-red-500">*</span>
                                    </label>

                                    {loadingDoctors ? (
                                        <div className="w-full px-4 py-3 border border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-center">
                                            <div className="flex items-center text-[#00629B]">
                                                <Loader2 className="animate-spin h-5 w-5 mr-3" />
                                                <span className="text-sm">Cargando doctores...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <select
                                            id="doctor"
                                            value={selectedDoctorId}
                                            onChange={(e) => onDoctorChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent text-[#1f2937]"
                                            required
                                        >
                                            <option value="" disabled className="text-[#6b7280]">
                                                Seleccione un doctor
                                            </option>
                                            {doctores.length > 0 ? (
                                                doctores.map((doctor) => (
                                                    <option key={doctor.usuario_id} value={doctor.usuario_id}>
                                                        Dr. {doctor.usuario?.nombre || "N/A"} {doctor.usuario?.apellido1 || ""} -{" "}
                                                        {doctor.especialidad}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled className="text-[#6b7280]">
                                                    No hay doctores disponibles
                                                </option>
                                            )}
                                        </select>
                                    )}
                                </div>

                                {selectedDoctor && (
                                    <div className="bg-[#f0f8ff] border border-[#00629B]/20 p-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-[#00629B] text-lg">Doctor Seleccionado</h4>
                                                <p className="text-[#1f2937] font-medium">
                                                    Dr. {selectedDoctor.usuario.nombre || "N/A"} {selectedDoctor.usuario.apellido1 || ""}{" "}
                                                    {selectedDoctor.usuario.apellido2 || ""}
                                                </p>
                                                <p className="text-[#6b7280] text-sm">{selectedDoctor.especialidad}</p>
                                            </div>

                                            {horarioDisponible && horarioDisponible.length > 0 && (
                                                <div className="space-y-3">
                                                    <div>
                                                        <div className="flex items-center mb-2">
                                                            <Calendar className="w-4 h-4 text-[#00629B] mr-2" />
                                                            <span className="text-sm font-medium text-[#1f2937]">Días de atención:</span>
                                                        </div>
                                                        <p className="text-sm text-[#6b7280] ml-6">{formatAvailableDays()}</p>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center mb-2">
                                                            <Clock className="w-4 h-4 text-[#00629B] mr-2" />
                                                            <span className="text-sm font-medium text-[#1f2937]">Horarios:</span>
                                                        </div>
                                                        <div className="ml-6 space-y-1">
                                                            {horarioDisponible.map((horario, index) => (
                                                                <div key={index} className="flex justify-between text-sm text-[#6b7280] max-w-sm">
                                                                    <span className="capitalize font-medium">{horario.dia_semana}:</span>
                                                                    <span>
                                                                        {formatHour(horario.hora_inicio)} - {formatHour(horario.hora_fin)}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-2 pb-2 border-b border-[#e5e7eb]">
                                    <CalendarCheck className="h-5 w-5 text-[#00629B]" />
                                    <h3 className="text-lg font-semibold text-[#1f2937]">Detalles de la Cita</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label htmlFor="fecha" className="block text-sm font-medium text-[#1f2937]">
                                            Fecha de la Cita <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="fecha"
                                            value={selectedDate}
                                            onChange={(e) => onDateChange(e.target.value)}
                                            min={getMinDate()}
                                            max={getMaxDate()}
                                            className="w-full px-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent text-[#1f2937]"
                                            required
                                            disabled={!selectedDoctorId}
                                        />
                                        {selectedDoctorId && (
                                            <p className="text-xs text-[#6b7280] flex items-center">
                                                <Info className="w-4 h-4 mr-1" />
                                                Solo puede agendar citas hasta 30 días en el futuro
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="hora" className="block text-sm font-medium text-[#1f2937]">
                                            Hora Disponible <span className="text-red-500">*</span>
                                        </label>

                                        {loading && selectedDate && (
                                            <div className="w-full px-4 py-3 border border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-center">
                                                <div className="flex items-center text-[#00629B]">
                                                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                                                    <span className="text-sm">Cargando horarios disponibles...</span>
                                                </div>
                                            </div>
                                        )}

                                        {selectedDate && horariosLibres.length === 0 && !loading && (
                                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                                                <div className="flex">
                                                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-medium text-amber-800">No hay horarios disponibles</p>
                                                        <p className="text-sm text-amber-700 mt-1">
                                                            El doctor no atiende este día o todos los horarios están ocupados.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {horariosLibres.length > 0 && (
                                            <div className="relative">
                                                <select
                                                    id="hora"
                                                    value={selectedTime}
                                                    onChange={(e) => onTimeChange(e.target.value)}
                                                    className="w-full px-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent text-[#1f2937]"
                                                    required
                                                >
                                                    <option value="" disabled className="text-[#6b7280]">
                                                        Seleccione una hora
                                                    </option>
                                                    {horariosLibres.map((hora) => (
                                                        <option key={hora} value={hora}>
                                                            {hora} 
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="motivo" className="block text-sm font-medium text-[#1f2937]">
                                        Motivo de la Consulta
                                    </label>
                                    <textarea
                                        id="motivo"
                                        value={motivo}
                                        onChange={(e) => onMotivoChange(e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent resize-none text-[#1f2937]"
                                        placeholder="Describa brevemente el motivo de su consulta (opcional)"
                                        maxLength={200}
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    // disabled={loading || !selectedDoctorId || !selectedDate || !selectedTime}
                                    className="w-full bg-[#00629B] text-white py-3 px-6 hover:bg-[#005580] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:ring-offset-2 disabled:bg-[#6b7280] disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2">
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin h-5 w-5" />
                                            <span>Procesando solicitud...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CalendarCheck className="w-5 h-5" />
                                            <span>Solicitar Cita</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white border border-[#e5e7eb] shadow-sm md:w-1/3">
                        <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
                            <h2 className="text-lg font-semibold text-[#1f2937]">Información Importante</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f0f8ff] p-3 flex-shrink-0">
                                        <Clock className="w-5 h-5 text-[#00629B]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#1f2937] mb-2">Horarios de Atención</h3>
                                        <p className="text-sm text-[#6b7280]">
                                            Nuestros doctores tienen diferentes horarios de atención, recuerde verificarlos para solicitar su cita.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f0f8ff] p-3 flex-shrink-0">
                                        <Info className="w-5 h-5 text-[#00629B]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#1f2937] mb-2">Políticas de Cancelación</h3>
                                        <p className="text-sm text-[#6b7280]">
                                            Puede cancelar o reprogramar su cita en cualquier momento.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f0f8ff] p-3 flex-shrink-0">
                                        <User className="w-5 h-5 text-[#00629B]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#1f2937] mb-2">Preparación para la Cita</h3>
                                        <p className="text-sm text-[#6b7280]">
                                            Llegue 15 minutos antes y traiga su identificación y documentos médicos relevantes.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f0f8ff] p-3 flex-shrink-0">
                                        <FileText className="w-5 h-5 text-[#00629B]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#1f2937] mb-2">Documentación Requerida</h3>
                                        <p className="text-sm text-[#6b7280]">
                                            Recuerde traer su identificación y seguro médico (si aplica) a su cita.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FormCita;