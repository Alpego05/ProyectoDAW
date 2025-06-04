import React from 'react';
import { useCitasHoyDoctor } from '../../../../hooks/medical/useCitasHoyDoctor';
import { Calendar, Stethoscope } from 'lucide-react';
import CitaCard from './CitaCard';
import LoadingScreen from '../../../Common/LoadingScreen';

const CitasHoy = () => {
    const {
        citasHoy,
        isLoading,
        error,
        verHistorial,
        asignarDiagnostico,
        asignarCita,
        marcarComoCompletada,
        marcarComoNoAsistida
    } = useCitasHoyDoctor();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 max-w-md w-full shadow-lg">
                    <div className="flex items-start space-x-3">
                        <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                             <TriangleAlert  className="h-6 w-6 text-red-600" ></TriangleAlert>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-red-800 font-semibold text-sm sm:text-base">Error del Sistema</h3>
                            <p className="text-red-600 text-xs sm:text-sm mt-1 break-words">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
            <div className="mx-auto">
                <div className="p-4 border-b my-5">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="h-7 w-7" style={{ color: "var(--primary-color)" }} />
                        <h2 className="text-xl font-semibold">Citas del día</h2>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                        {new Date().toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                <div className="space-y-4">
                    {citasHoy.length === 0 ? (
                        <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
                            <div className="bg-gradient-to-r from-slate-400 to-gray-400 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2 sm:mb-3 px-4">
                                No hay citas programadas
                            </h3>
                            <p className="text-gray-500 font-medium text-sm sm:text-base px-4">
                                Disfruta de tu día libre
                            </p>
                        </div>
                    ) : (
                        citasHoy.map((cita) => (
                            <CitaCard
                                key={cita.id_cita}
                                cita={cita}
                                verHistorial={verHistorial}
                                asignarDiagnostico={asignarDiagnostico}
                                asignarCita={asignarCita}
                                marcarComoCompletada={marcarComoCompletada}
                                marcarComoNoAsistida={marcarComoNoAsistida}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CitasHoy;