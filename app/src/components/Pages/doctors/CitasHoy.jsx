import React from 'react';
import { useCitasHoyDoctor, useFormatCita } from '../../../hooks/useGestionMedica';
import { Calendar, Clock, User, Phone, AlertCircle, History, Plus, FileText, X, Activity, Stethoscope } from 'lucide-react';
import LoadingSpinner from '../../Common/LoadingSpinner';

const CitasHoy = () => {
    const {
        citasHoy,
        isLoading,
        error,
        selectedCita,
        showPatientInfo,
        handleCitaClick,
        closePatientInfo,
        verHistorial,
        asignarDiagnostico,
        asignarCita
    } = useCitasHoyDoctor();

    const { getEstadoClassName } = useFormatCita();

    if (isLoading) {
        return (
            <LoadingSpinner></LoadingSpinner>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-red-100 border border-red-400 rounded-lg p-6 max-w-md mx-4 shadow-md">
                    <div className="flex items-center space-x-4">
                        <div className="bg-red-500 rounded-full p-3">
                            <AlertCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-red-800 font-bold text-lg">Error del Sistema</h3>
                            <p className="text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className="my-8 mx-auto p-5 mt-18  mb-10">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            <h2 className="text-xl font-semibold">Citas del día</h2>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Visualiza y gestiona tus citas con pacientes</p>
                    </div>
                    <div className="hidden md:flex items-center space-x-2 0 rounded-lg px-4 py-2" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary-color) " }}>
                        <Activity className="h-5 w-5 " />
                        <span className=" font-medium">{new Date().toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                </div>
            </div>

            {showPatientInfo && selectedCita ? (
                <div className="bg-white rounded-lg shadow-md border overflow-hidden">
                    {/* Patient Info Header */}
                    <div className="px-6 py-4" style={{ backgroundColor: "var(--primary-color)", color: "var(--primary-color) " }} >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white/20 rounded-lg p-2">
                                    <Stethoscope className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Información del Paciente</h3>
                                    <p className="text-blue-100">Detalles de la consulta médica</p>
                                </div>
                            </div>
                            <button
                                onClick={closePatientInfo}
                                className="cursor-pointer hover:bg-white/30 rounded-lg p-2 transition-all duration-300 hover:scale-105">
                                <X className="h-5 w-5 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">

                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                                <Clock className="h-5 w-5 text-blue-600" />
                                <span>Datos de la Cita</span>
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg p-3 shadow-sm flex items-center">
                                    <span className="text-sm font-medium text-gray-600 mr-2">Hora:</span>
                                    <p className="text-gray-800 font-medium text-sm">{selectedCita.hora_inicio} - {selectedCita.hora_fin}</p>
                                </div>
                                <div className="flex items-center justify-end">
                                    <span className="text-sm font-medium text-gray-600 mr-2">Estado:</span>
                                    <span className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${getEstadoClassName(selectedCita.estado)}`}>
                                        {selectedCita.estado}
                                    </span>
                                </div>
                                <div className="bg-white rounded-lg p-3 shadow-sm md:col-span-2">
                                    <span className="text-sm font-medium text-gray-600">Motivo:</span>
                                    <p className="text-gray-800 font-medium mt-1">{selectedCita.nombre}</p>
                                </div>
                            </div>
                        </div>


                        {selectedCita.paciente ? (
                            <div className="space-y-6">
                                {/* Patient Details */}
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                                        <User className="h-5 w-5 text-gray-600" />
                                        <span>Datos del Paciente</span>
                                    </h4>
                                    <div className="grid gap-4">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-sm font-medium text-gray-600">Nombre:</span>
                                                <p className="text-gray-800 font-bold">
                                                    {selectedCita.paciente.usuario.nombre} {selectedCita.paciente.usuario.apellido1} {selectedCita.paciente.usuario.apellido2}
                                                </p>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-sm font-medium text-gray-600">Género:</span>
                                                <p className="text-gray-800 font-medium">{selectedCita.paciente.genero}</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-sm font-medium text-gray-600">Fecha de Nacimiento:</span>
                                                <p className="text-gray-800 font-medium">{selectedCita.paciente.fecha_nacimiento}</p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-sm font-medium text-gray-600">Teléfono:</span>
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="h-4 w-4 text-blue-600" />
                                                    <span className="text-gray-800 font-medium">{selectedCita.paciente.telefono}</span>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-sm font-medium text-gray-600">Alergias:</span>
                                                <p className="text-gray-800 font-medium">{selectedCita.paciente.alergias}</p>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg p-4 shadow-sm">
                                            <span className="text-sm font-medium text-gray-600 mb-2 block">Historial Médico:</span>
                                            <div className="bg-gray-50 rounded-lg p-3 min-h-[120px]">
                                                <p className="text-gray-800 font-medium leading-relaxed">{selectedCita.paciente.historial}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <h4 className="text-lg font-bold text-gray-800 mb-4">Acciones Disponibles</h4>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => verHistorial(selectedCita.paciente_id)}
                                            className="group cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105" style={{ backgroundColor: "var(--warning-color)" }}>
                                            <History className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                                            <span>Ver Datos del paciente</span>
                                        </button>
                                        <button
                                            onClick={() => asignarDiagnostico(selectedCita.id_cita, selectedCita.paciente_id)}
                                            className="group cursor-pointer flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                                            <FileText className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                                            <span>Asignar Diagnóstico</span>
                                        </button>
                                        <button
                                            onClick={() => asignarCita(selectedCita.paciente_id)}
                                            className="group cursor-pointer flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                                            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                                            <span>Asignar Nueva Cita</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-red-100 border border-red-400 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-red-500 rounded-full p-2">
                                        <AlertCircle className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-red-800 font-bold">Error de Datos</h4>
                                        <p className="text-red-700">No se pudieron cargar los datos del paciente</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md  overflow-hidden">
                    {citasHoy.length === 0 ? (
                        <div className="text-center py-16 px-6">
                            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                <Calendar className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-600 mb-3">No hay citas programadas</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                No tienes citas programadas para hoy. Disfruta de tu día libre.
                            </p>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                                    <Clock className="h-6 w-6 text-blue-600" />
                                    <span>Lista de Citas del Día</span>
                                </h3>
                                <div className=" rounded-lg px-3 py-1" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary-color) " }}>
                                    <span className=" font-medium">{citasHoy.length} cita{citasHoy.length !== 1 ? 's' : ''}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {citasHoy.map((cita, index) => (
                                    <div key={cita.id_cita} className="group bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-100 transition-all duration-300 hover:shadow-md">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">

                                                        <div>
                                                            <h4 className="text-lg font-bold text-gray-800">
                                                                {cita.nombre}
                                                            </h4>
                                                            <div className="flex items-center space-x-2">
                                                                <span className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${getEstadoClassName(cita.estado)}`}>
                                                                    {cita.estado}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-lg p-3 shadow-sm w-1/2">
                                                    <div className="flex items-center space-x-2 text-gray-600">
                                                        <Clock className="h-4 mw-2 text-blue-600" />
                                                        <span className="font-medium">Horario:</span>
                                                        <span className="font-bold text-gray-800 text-sm">{cita.hora_inicio} - {cita.hora_fin}</span>
                                                    </div>
                                                </div>

                                                
                                            </div>

                                            <button
                                                onClick={() => handleCitaClick(cita)}
                                                className=" text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2" style={{ backgroundColor: "var(--primary-color)" }}
                                            >
                                                <span>Ver Detalles</span>
                                                <div className="group-hover:translate-x-1 transition-transform duration-300">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

    );
};

export default CitasHoy;