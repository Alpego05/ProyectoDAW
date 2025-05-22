import React, { useState, useEffect } from 'react';
import { getCitasByDoctor } from '../../../services/apiCitas';

const CitasHoy = () => {
    const [citas, setCitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const obtenerFechaHoy = () => {
        const hoy = new Date();
        return hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    };

    const cargarCitasHoy = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const doctorId = localStorage.getItem("userId"); // Asumiendo que el doctor está logueado
            if (!doctorId) {
                throw new Error("No se encontró el ID del doctor");
            }

            const todasLasCitas = await getCitasByDoctor(doctorId);
            const fechaHoy = obtenerFechaHoy();
            
            // Filtrar solo las citas de hoy
            const citasHoy = todasLasCitas.filter(cita => 
                cita.fecha === fechaHoy
            );

            setCitas(citasHoy);
        } catch (err) {
            console.error("Error al cargar citas de hoy:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarCitasHoy();
    }, []);

    if (isLoading) {
        return <div>Cargando citas del día...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Citas de Hoy</h2>
            {citas.length === 0 ? (
                <p>No hay citas programadas para hoy</p>
            ) : (
                <div>
                    {citas.map((cita) => (
                        <div key={cita.id_cita}>
                            <p><strong>Hora:</strong> {cita.hora}</p>
                            <p><strong>Estado:</strong> {cita.estado}</p>
                            <p><strong>Paciente ID:</strong> {cita.paciente_id}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CitasHoy;