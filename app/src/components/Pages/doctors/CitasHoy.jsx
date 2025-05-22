import React from 'react';
import { useCitasHoyDoctor } from '../../../hooks/useGestionMedica';

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

    if (isLoading) {
        return <div>Cargando citas del día...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Citas de Hoy</h2>
            
            {showPatientInfo && selectedCita ? (
                <div>
                    <h3>Información del Paciente</h3>
                    <button onClick={closePatientInfo}>Cerrar</button>
                    
                    <div>
                        <h4>Datos de la Cita:</h4>
                        <p><strong>Cita #:</strong> {selectedCita.id_cita}</p>
                        <p><strong>Hora:</strong> {selectedCita.hora}</p>
                        <p><strong>Estado:</strong> {selectedCita.estado}</p>
                        <p><strong>Motivo:</strong> {selectedCita.motivo}</p>
                    </div>

                    {selectedCita.paciente ? (
                        <div>
                            <h4>Datos del Paciente:</h4>
                            <p><strong>Nombre:</strong> {selectedCita.paciente.usuario.nombre} {selectedCita.paciente.usuario.apellido1} {selectedCita.paciente.usuario.apellido2}</p>
                            <p><strong>Genero:</strong> {selectedCita.paciente.genero}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {selectedCita.paciente.fecha_nacimiento}</p>
                            <p><strong>Telefono:</strong> {selectedCita.paciente.telefono}</p>
                            <p><strong>Alergias:</strong> {selectedCita.paciente.alergias}</p>
                            <p><strong>Historial:</strong> {selectedCita.paciente.historial}</p>
                            
                            <div>
                                <h4>Acciones:</h4>
                                <button onClick={() => verHistorial(selectedCita.paciente_id)}>
                                    Ver Historial
                                </button>
                                <button onClick={() => asignarDiagnostico(selectedCita.id_cita, selectedCita.paciente_id)}>
                                    Asignar Diagnóstico
                                </button>
                                <button onClick={() => asignarCita(selectedCita.paciente_id)}>
                                    Asignar Nueva Cita
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>No se pudieron cargar los datos del paciente</p>
                    )}
                </div>
            ) : (
                <div>
                    {citasHoy.length === 0 ? (
                        <p>No hay citas programadas para hoy</p>
                    ) : (
                        <div>
                            <h3>Lista de Citas:</h3>
                            {citasHoy.map((cita) => (
                                <div key={cita.id_cita}>
                                    <p><strong>Razón:</strong> {cita.nombre} </p>
                                    <p><strong>Hora:</strong> {cita.hora_inicio} - {cita.hora_fin}</p>
                                    <p><strong>Estado:</strong> {cita.estado}</p>
                                    <p><strong>Paciente:</strong> {cita.paciente ? `${cita.paciente.nombre} ${cita.paciente.apellido}` : 'No disponible'}</p>
                                    <button onClick={() => handleCitaClick(cita)}>
                                        Ver Detalles
                                    </button>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CitasHoy;