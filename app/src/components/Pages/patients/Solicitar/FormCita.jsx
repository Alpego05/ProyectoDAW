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
    Folder,
    AlertCircle
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
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}


                {/* Main Form Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    {/* Form Header */}
                    <div className="bg-[#0077b6] px-6 py-4 text-white">
                        <h1 className="text-2xl font-semibold flex items-center gap-2">
                            <Folder className="h-5 w-5" />
                            Solicitar nueva cita
                        </h1>
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Alert Messages */}
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-5 flex items-start space-x-4 shadow-sm">
                                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-red-800">Error</h4>
                                    <p className="text-red-700 mt-1">{error}</p>
                                </div>
                            </div>
                        )}

                        {showSuccess && (
                            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-8 flex items-start">
                                <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">¡Cita agendada!</p>
                                    <p className="text-sm">Su cita ha sido solicitada correctamente.</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={onSubmit} className="space-y-8">
                            {/* Doctor Selection Section */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-[#1e293b] border-b pb-2 border-[#e6f3f8]">
                                    <User className="inline mr-2 w-5 h-5 text-[#0077b6]" />
                                    Selección de Médico
                                </h3>

                                <div className="space-y-3">
                                    <label htmlFor="doctor" className="block text-sm font-medium text-[#475569]">
                                        Seleccionar Doctor *
                                    </label>

                                    {loadingDoctors ? (
                                        <div className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-[#e6f3f8] flex items-center justify-center">
                                            <div className="flex items-center text-[#0077b6]">
                                                <Loader2 className="animate-spin h-5 w-5 mr-3" />
                                                <span className="text-sm">Cargando doctores...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <select
                                            id="doctor"
                                            value={selectedDoctorId}
                                            onChange={(e) => onDoctorChange(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48cae4] focus:border-transparent transition-all duration-200 hover:border-gray-300 text-[#1e293b]"
                                            required
                                        >
                                            <option value="" disabled className="text-[#64748b]">Seleccione un doctor</option>
                                            {doctores.length > 0 ? (
                                                doctores.map((doctor) => (
                                                    <option
                                                        key={doctor.usuario_id}
                                                        value={doctor.usuario_id}
                                                        className="py-2 hover:bg-[#e6f3f8]"
                                                    >
                                                        Dr. {doctor.usuario?.nombre || 'N/A'} {doctor.usuario?.apellido1 || ''} - {doctor.especialidad}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled className="text-[#64748b]">No hay doctores disponibles</option>
                                            )}
                                        </select>
                                    )}
                                </div>

                                {/* Doctor Information Card */}
                                {selectedDoctor && (
                                    <div className="bg-[#e6f3f8] border border-[#0077b6]/20 p-6 rounded-lg">
                                        <div className="flex items-start space-x-4">
                                            

                                            <div className="flex-1">
                                                <h3 className="font-semibold text-[#005b8a] text-lg mb-1">Doctor Seleccionado</h3>
                                                <p className="text-[#0077b6] font-medium">
                                                    Dr. {selectedDoctor.usuario.nombre || 'N/A'} {selectedDoctor.usuario.apellido1 || ''} {selectedDoctor.usuario.apellido2 || ''}
                                                    <span className="text-[#0077b6]  text-sm mt-1 ml-20">{selectedDoctor.especialidad}</span>
                                                </p>
                                                
                                                

                                                {horarioDisponible && horarioDisponible.length > 0 && (
                                                    <div className="mt-4 space-y-4">
                                                        <div>
                                                            <div className="flex items-center">
                                                                <Calendar className="w-4 h-4 text-[#0077b6] mr-2" />
                                                                <span className="text-sm font-medium text-[#005b8a]">Días de atención:</span>
                                                            </div>
                                                            <p className="text-sm text-[#0077b6] ml-6">{formatAvailableDays()}</p>
                                                        </div>

                                                        <div>
                                                            <div className="flex items-center mb-2">
                                                                <Clock className="w-4 h-4 text-[#0077b6] mr-2" />
                                                                <span className="text-sm font-medium text-[#005b8a]">Horarios:</span>
                                                            </div>
                                                            <div className="ml-6 space-y-1">
                                                                {horarioDisponible.map((horario, index) => (
                                                                    <div key={index} className="flex justify-between text-sm text-[#0077b6] max-w-sm">
                                                                        <span className="capitalize font-medium">{horario.dia_semana}:</span>
                                                                        {formatHour(horario.hora_inicio)} - {formatHour(horario.hora_fin)}
                                                                    </div>

                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Appointment Details Section */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-[#1e293b] border-b pb-2 border-[#e6f3f8]">
                                    <CalendarCheck className="inline mr-2 w-5 h-5 text-[#0077b6]" />
                                    Detalles de la Cita
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Date Selection */}
                                    <div className="space-y-3">
                                        <label htmlFor="fecha" className="block text-sm font-medium text-[#475569]">
                                            Fecha de la Cita *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                id="fecha"
                                                value={selectedDate}
                                                onChange={(e) => onDateChange(e.target.value)}
                                                min={getMinDate()}
                                                max={getMaxDate()}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48cae4] focus:border-transparent transition-all duration-200 hover:border-gray-300 text-[#1e293b]"
                                                required
                                                disabled={!selectedDoctorId}
                                            />
                                        </div>
                                        {selectedDoctorId && (
                                            <p className="text-xs text-[#64748b] flex items-center mt-1">
                                                <Info className="w-4 h-4 mr-1 text-[#64748b]" />
                                                Solo puede agendar citas hasta 30 días en el futuro
                                            </p>
                                        )}
                                    </div>

                                    {/* Time Selection */}
                                    <div className="space-y-3">
                                        <label htmlFor="hora" className="block text-sm font-medium text-[#475569]">
                                            Hora Disponible *
                                        </label>

                                        {loading && selectedDate && (
                                            <div className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-[#e6f3f8] flex items-center justify-center">
                                                <div className="flex items-center text-[#0077b6]">
                                                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                                                    <span className="text-sm">Cargando horarios disponibles...</span>
                                                </div>
                                            </div>
                                        )}

                                        {selectedDate && horariosLibres.length === 0 && !loading && (
                                            <div className="bg-amber-50 border-l-4 border-amber-400 text-amber-700 p-4 rounded-lg">
                                                <div className="flex items-start">
                                                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                                                    <div>
                                                        <p className="font-medium">No hay horarios disponibles</p>
                                                        <p className="text-sm mt-1">
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
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48cae4] focus:border-transparent transition-all duration-200 hover:border-gray-300 text-[#1e293b] appearance-none"
                                                    required
                                                >
                                                    <option value="" disabled className="text-[#64748b]">Seleccione una hora</option>
                                                    {horariosLibres.map((hora) => (
                                                        <option key={hora} value={hora} className="py-2 hover:bg-[#e6f3f8]">
                                                            {hora} (30 minutos)
                                                        </option>
                                                    ))}
                                                </select>
                                                <Clock className="absolute right-3 top-3.5 h-5 w-5 text-[#64748b] pointer-events-none" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Consultation Reason */}
                                <div className="space-y-3">
                                    <label htmlFor="motivo" className="block text-sm font-medium text-[#475569]">
                                        Motivo de la Consulta
                                    </label>
                                    <textarea
                                        id="motivo"
                                        value={motivo}
                                        onChange={(e) => onMotivoChange(e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48cae4] focus:border-transparent resize-none transition-all duration-200 hover:border-gray-300 text-[#1e293b]"
                                        placeholder="Describa brevemente el motivo de su consulta (opcional)"
                                        maxLength={30}
                                    />

                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading || !selectedDoctorId || !selectedDate || !selectedTime}
                                    className="w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white py-4 px-6 rounded-lg hover:from-[#005b8a] hover:to-[#0077b6] focus:outline-none focus:ring-2 focus:ring-[#48cae4] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <Loader2 className="animate-spin h-5 w-5 mr-3" />
                                            Procesando solicitud...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <CalendarCheck className="w-5 h-5 mr-2" />
                                            Solicitar Cita
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Additional Information Section */}
                <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="bg-[#0077b6] px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Información Importante</h2>
                    </div>
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-[#e6f3f8] p-3 rounded-lg flex-shrink-0">
                                    <Clock className="w-6 h-6 text-[#0077b6]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1e293b] mb-2">Horarios de Atención</h3>
                                    <p className="text-sm text-[#475569]">
                                        Nuestros doctores atienden de lunes a viernes de 8:00 am a 6:00 pm, y los sábados de 9:00 am a 1:00 pm.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-[#e6f3f8] p-3 rounded-lg flex-shrink-0">
                                    <Info className="w-6 h-6 text-[#0077b6]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1e293b] mb-2">Políticas de Cancelación</h3>
                                    <p className="text-sm text-[#475569]">
                                        Puede cancelar o reprogramar su cita hasta 24 horas antes sin costo alguno.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-[#e6f3f8] p-3 rounded-lg flex-shrink-0">
                                    <User className="w-6 h-6 text-[#0077b6]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1e293b] mb-2">Preparación para la Cita</h3>
                                    <p className="text-sm text-[#475569]">
                                        Llegue 15 minutos antes y traiga su identificación y documentos médicos relevantes.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-[#e6f3f8] p-3 rounded-lg flex-shrink-0">
                                    <FileText className="w-6 h-6 text-[#0077b6]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1e293b] mb-2">Documentación Requerida</h3>
                                    <p className="text-sm text-[#475569]">
                                        Recuerde traer su identificación y seguro médico (si aplica) a su cita.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCita;