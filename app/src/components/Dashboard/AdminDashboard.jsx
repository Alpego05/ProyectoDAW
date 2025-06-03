import { useState } from "react"
import { useAdmin } from "../../hooks/users/useAdmin"
import { Calendar, ClipboardList, FileText, Settings, User, Users } from "lucide-react"
import LoadingSpinner from "../Common/LoadingSpinner"
import HospitalInfo from "./HospitalInfo"
// import useFormat from '../../hooks/useFormat';

const AdminDashboard = () => {
    const { usuarios, doctores, pacientes, citas, diagnosticos, recetas, isLoading, error, cargarDatos } = useAdmin()
    const [activeTab, setActiveTab] = useState("usuarios")

    if (isLoading) {
        return <LoadingSpinner message="Cargando datos del sistema..." />
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-lg mt-10">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )
    }

    const totalUsuarios = usuarios.length
    const totalDoctores = doctores.length
    const totalPacientes = pacientes.length
    const totalCitas = citas.length
    const totalDiagnosticos = diagnosticos.length
    const totalRecetas = recetas.length

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Encabezado del dashboard */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
                            <p className="text-gray-600">Gestión del sistema hospitalario</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                <Settings className="w-4 h-4 mr-1" />
                                Administrador
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tarjetas de estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-blue-100 mb-2" style={{ color: "var(--primary-color)" }}>
                                <Users className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-600">Usuarios</p>
                            <p className="text-xl font-bold text-gray-800">{totalUsuarios}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600 mb-2">
                                <User className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-600">Médicos</p>
                            <p className="text-xl font-bold text-gray-800">{totalDoctores}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mb-2">
                                <User className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-600">Pacientes</p>
                            <p className="text-xl font-bold text-gray-800">{totalPacientes}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-red-100 text-red-600 mb-2">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-600">Citas</p>
                            <p className="text-xl font-bold text-gray-800">{totalCitas}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mb-2">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-600">Diagnósticos</p>
                            <p className="text-xl font-bold text-gray-800">{totalDiagnosticos}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-pink-100 text-pink-600 mb-2">
                                <FileText className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-600">Recetas</p>
                            <p className="text-xl font-bold text-gray-800">{totalRecetas}</p>
                        </div>
                    </div>
                </div>

                {/* Navegación de pestañas */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex overflow-x-auto space-x-4 pb-2">
                        <button
                            onClick={() => setActiveTab("usuarios")}
                            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "usuarios" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                            style={activeTab === "usuarios" ? { backgroundColor: "var(--primary-color)" } : {}}
                        >
                            Usuarios
                        </button>
                        <button
                            onClick={() => setActiveTab("doctores")}
                            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "doctores" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                            style={activeTab === "doctores" ? { backgroundColor: "var(--primary-color)" } : {}}
                        >
                            Médicos
                        </button>
                        <button
                            onClick={() => setActiveTab("pacientes")}
                            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "pacientes" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                            style={activeTab === "pacientes" ? { backgroundColor: "var(--primary-color)" } : {}}
                        >
                            Pacientes
                        </button>
                        <button
                            onClick={() => setActiveTab("citas")}
                            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "citas" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                            style={activeTab === "citas" ? { backgroundColor: "var(--primary-color)" } : {}}
                        >
                            Citas
                        </button>
                    </div>
                </div>

                {/* Contenido de la pestaña */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {activeTab === "usuarios" && (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Gestión de Usuarios</h3>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    style={{ backgroundColor: "var(--primary-color)" }}
                                >
                                    Nuevo Usuario
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Nombre
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Tipo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {usuarios.map((usuario) => (
                                            <tr key={usuario.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {usuario.nombre} {usuario.apellido1}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{usuario.dni}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${usuario.tipo_usuario === "admin"
                                                            ? "bg-purple-100 text-purple-800"
                                                            : usuario.tipo_usuario === "doctor"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                    >
                                                        {usuario.tipo_usuario}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                        style={{ color: "var(--primary-color)" }}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeTab === "doctores" && (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Gestión de Médicos</h3>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    style={{ backgroundColor: "var(--primary-color)" }}
                                >
                                    Nuevo Médico
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Especialidad
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                                                Sala
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Licencia
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {doctores.map((doctor) => {
                                            // Buscar información adicional del doctor si existe
                                            const doctorInfo = doctor.doctor || {}

                                            return (
                                                <tr key={doctor.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            Dr. {doctor.nombre} {doctor.apellido1}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{doctor.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {doctorInfo.especialidad || "No asignada"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {doctorInfo.sala_asignada || "No asignada"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {doctorInfo.numero_licencia || "No disponible"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                                            style={{ color: "var(--primary-color)" }}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-900">Eliminar</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeTab === "pacientes" && (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Gestión de Pacientes</h3>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    style={{ backgroundColor: "var(--primary-color)" }}
                                >
                                    Nuevo Paciente
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                DNI
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Teléfono
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pacientes.map((paciente) => {
                                            // Buscar información adicional del paciente si existe
                                            const pacienteInfo = paciente.paciente || {}

                                            return (
                                                <tr key={paciente.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {paciente.nombre} {paciente.apellido1}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {pacienteInfo.fecha_nacimiento || "No disponible"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.dni}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {pacienteInfo.telefono || "No disponible"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                                            style={{ color: "var(--primary-color)" }}>
                                                            Ver historial
                                                        </button>
                                                        <button className="text-green-600 hover:text-green-900 mr-3">Nueva cita</button>
                                                        <button className="text-red-600 hover:text-red-900">Eliminar</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeTab === "citas" && (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Gestión de Citas</h3>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    style={{ backgroundColor: "var(--primary-color)" }}>
                                    Nueva Cita
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Paciente
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Médico
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fecha
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Hora
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Estado
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {citas.map((cita) => (
                                            <tr key={cita.id_cita}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {cita.paciente?.nombre || "Paciente"} {cita.paciente?.apellido1 || ""}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Dr. {cita.doctor?.nombre || "Doctor"} {cita.doctor?.apellido1 || ""}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cita.fecha}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatHour(cita.hora_inicio)} - {formatHour(cita.hora_fin)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cita.estado === "Pendiente"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : cita.estado === "Completada"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                            }`}>
                                                        {cita.estado}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                        style={{ color: "var(--primary-color)" }}>
                                                        Editar
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">Cancelar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <HospitalInfo />
        </div>
    )
}

export default AdminDashboard
