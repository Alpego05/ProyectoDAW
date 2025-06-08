import { useState, useEffect } from "react"
import { getDoctorById } from "../../services/apiDoctor"
import useFormat from "../useFormat"
import { getUserById } from "../../services/apiUser"
import { getCitasByDoctor } from "../../services/apiCitas"
import { getPatientById } from "../../services/apiPatient"

export const useDoctores = () => {
    const [doctor, setDoctor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarDoctor = async (doctorId) => {
        if (!doctorId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const datosDoctor = await getDoctorById(doctorId);
            setDoctor(datosDoctor || null);
        } catch (err) {
            console.error("Error al obtener doctor:", err);
            setError("Error desconocido al obtener doctor");
            setDoctor(null);
        } finally {
            setIsLoading(false);
        }
    };

    const resetDoctor = () => {
        setDoctor(null);
        setError(null);
        setIsLoading(false);
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("rol");

        if (userId && userRole === "doctor") {
            cargarDoctor(userId);
        } else {
            setIsLoading(false);
        }
    }, []);

    return {
        doctor,
        isLoading,
        error,
        cargarDoctor,
        resetDoctor,
    };
};

export const useDoctorData = (doctorId) => {
    const { formatDate, formatDay, formatDateTime } = useFormat();

    const [estado, setEstado] = useState({
        usuario: null,
        doctor: null,
        citas: [],
        pacientes: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!doctorId) {
                setEstado((prev) => ({ ...prev, loading: false }));
                return;
            }

            try {
                setEstado((prev) => ({ ...prev, loading: true, error: null }));

                const datosUsuario = await getUserById(doctorId).catch(() => null);
                const datosDoctor = await getDoctorById(doctorId).catch(() => null);
                const citasDoctor = await getCitasByDoctor(doctorId).catch(() => []);

                const pacientesMap = new Map();
                const pacientesPromises = [];

                if (Array.isArray(citasDoctor)) {
                    citasDoctor.forEach((cita) => {
                        if (cita && cita.paciente_id && !pacientesMap.has(cita.paciente_id)) {
                            pacientesMap.set(cita.paciente_id, null);
                            pacientesPromises.push(
                                getPatientById(cita.paciente_id)
                                    .then((pacienteData) => {
                                        if (pacienteData) {
                                            pacientesMap.set(cita.paciente_id, pacienteData);
                                            cita.paciente = pacienteData;
                                        }
                                        return pacienteData;
                                    })
                                    .catch(() => null)
                            );
                        }
                    });
                }

                await Promise.allSettled(pacientesPromises);
                const pacientesData = Array.from(pacientesMap.values()).filter(Boolean);

                setEstado({
                    usuario: datosUsuario,
                    doctor: datosDoctor,
                    citas: Array.isArray(citasDoctor) ? citasDoctor : [],
                    pacientes: pacientesData,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                console.error("Error al cargar datos del doctor:", error);
                setEstado((prev) => ({
                    ...prev,
                    loading: false,
                    error: "Error al cargar los datos",
                }));
            }
        };

        fetchData();
    }, [doctorId]);

    const getProximasCitas = () => {
        if (!Array.isArray(estado.citas) || estado.citas.length === 0) return [];

        try {
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            return estado.citas
                .filter((cita) => {
                    if (!cita || !cita.fecha) return false;
                    try {
                        const fechaCita = new Date(cita.fecha);
                        if (isNaN(fechaCita.getTime())) return false;
                        fechaCita.setHours(0, 0, 0, 0);
                        return fechaCita > hoy && cita.estado === "Pendiente";
                    } catch {
                        return false;
                    }
                })
                .sort((a, b) => {
                    try {
                        return new Date(a.fecha) - new Date(b.fecha);
                    } catch {
                        return 0;
                    }
                })
                .slice(0, 5);
        } catch {
            return [];
        }
    };

    const getCitasHoy = () => {
        if (!Array.isArray(estado.citas) || estado.citas.length === 0) return [];

        try {
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            return estado.citas
                .filter((cita) => {
                    if (!cita || !cita.fecha) return false;
                    try {
                        const fechaCita = new Date(cita.fecha);
                        if (isNaN(fechaCita.getTime())) return false;
                        fechaCita.setHours(0, 0, 0, 0);
                        return fechaCita.getTime() === hoy.getTime() && cita.estado === "Pendiente";
                    } catch {
                        return false;
                    }
                })
                .sort((a, b) => {
                    try {
                        const horaA = a.hora_inicio || "";
                        const horaB = b.hora_inicio || "";
                        return horaA.localeCompare(horaB);
                    } catch {
                        return 0;
                    }
                });
        } catch {
            return [];
        }
    };

    return {
        ...estado,
        formatDate,
        formatDay,
        formatDateTime,
        getProximasCitas,
        getCitasHoy,
    };
};