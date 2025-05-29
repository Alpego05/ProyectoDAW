import { useState } from "react"
import { useDoctorData } from "../../hooks/useUsuarios"
import { Calendar, Clock, User, Users, FileText, ClipboardList } from "lucide-react"
import LoadingSpinner from "../Common/LoadingSpinner"
import HospitalInfo from "./HospitalInfo"

const DoctorDashboard = ({ doctorId }) => {
    const { usuario, doctor, citas, pacientes, loading, error, formatDate, getProximasCitas, getCitasHoy } =
        useDoctorData(doctorId)

    const [activeTab, setActiveTab] = useState("hoy")

    if (loading) {
        return <LoadingSpinner message="Cargando datos del médico..." />
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-lg mt-10">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )
    }

    if (!usuario || !doctor) {
        return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mx-auto max-w-lg mt-10">
                <p>No se encontraron datos del médico</p>
            </div>
        )
    }

    const proximasCitas = getProximasCitas()
    const citasHoy = getCitasHoy()
    const totalPacientes = pacientes.length
    const totalCitas = citas.length
    const citasPendientes = citas.filter((cita) => cita.estado === "Pendiente").length

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Encabezado del dashboard */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Dr. {usuario.nombre} {usuario.apellido1}
                            </h1>
                            <p className="text-gray-600">{usuario.email}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span
                                className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full text-sm font-medium"
                                style={{ color: "var(--primary-color)" }}
                            >
                                <User className="w-4 h-4 mr-1" />
                                Médico
                            </span>
                        </div>
                    </div>
                </div>

                

                {/* Acciones rápidas */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button className="cursor-pointer flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                            <Calendar className="h-6 w-6 text-blue-600 mb-2" />
                            <span className="text-sm font-medium text-gray-700">Calendario</span>
                        </button>
                        <button className="cursor-pointer flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                            <FileText className="h-6 w-6 text-green-600 mb-2" />
                            <span className="text-sm font-medium text-gray-700">Glosario</span>
                        </button>
                        <button className="cursor-pointer flex flex-col items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                            <Users className="h-6 w-6 text-yellow-600 mb-2" />
                            <span className="text-sm font-medium text-gray-700 ">Ver Pacientes</span>
                        </button>
                    </div>
                </div>

                {/* Información del médico y citas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Información Profesional</h3>
                            <span
                                className="text-xs font-medium bg-indigo-100 px-2.5 py-0.5 rounded"
                                style={{ color: "var(--primary-color)" }}>
                                Médico
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-800 mb-1">Especialidad</h4>
                                <p className="text-sm text-gray-600">{doctor.especialidad || "No especificada"}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-800 mb-1">Sala Asignada</h4>
                                <p className="text-sm text-gray-600">{doctor.sala_asignada || "No asignada"}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-800 mb-1">Número de Licencia</h4>
                                <p className="text-sm text-gray-600">{doctor.numero_licencia || "No especificado"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Citas */}
                    <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Agenda de Citas</h3>
                            <div className="flex space-x-2">
                                <button onClick={() => setActiveTab("hoy")} className={`px-3 py-1 text-xs font-medium rounded-full ${activeTab === "hoy" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`} style={activeTab === "hoy" ? { backgroundColor: "var(--primary-color)" } : {}}>
                                    Hoy
                                </button>
                                <button
                                    onClick={() => setActiveTab("proximas")}
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${activeTab === "proximas" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                                    style={activeTab === "proximas" ? { backgroundColor: "var(--primary-color)" } : {}}
                                >
                                    Próximas
                                </button>
                            </div>
                        </div>

                        {activeTab === "hoy" ? (
                            citasHoy.length > 0 ? (
                                <div className="space-y-4">
                                    {citasHoy.map((cita, index) => (
                                        <div
                                            key={cita.id_cita || index}
                                            className="flex justify-between border-l-4 border-green-400 bg-green-50 p-3 rounded"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{cita.nombre || "Consulta médica"}</p>
                                                <p className="text-xs text-gray-600">Paciente: { }</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-gray-900">{formatDate(cita.fecha)}</p>
                                                <p className="text-xs text-gray-600">
                                                    {cita.hora_inicio} - {cita.hora_fin}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">No hay citas programadas para hoy</p>
                                </div>
                            )
                        ) : proximasCitas.length > 0 ? (
                            <div className="space-y-4">
                                {proximasCitas.map((cita, index) => (
                                    <div
                                        key={cita.id_cita || index}
                                        className="flex justify-between border-l-4 border-blue-400 bg-blue-50 p-3 rounded"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{cita.nombre || "Consulta médica"}</p>
                                            <p className="text-xs text-gray-600">Paciente: </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{formatDate(cita.fecha)}</p>
                                            <p className="text-xs text-gray-600">
                                                {cita.hora_inicio} - {cita.hora_fin}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No hay citas programadas próximamente</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <HospitalInfo />
        </div>
    )
}

export default DoctorDashboard

