import { useState } from "react"
import { useAdmin } from "../../hooks/users/useAdmin"
import { AlertCircle, Calendar, ClipboardList, FileText, Settings, User, Users } from "lucide-react"
import HospitalInfo from "./HospitalInfo"
import { Link } from "react-router-dom"
import LoadingScreen from "../Common/LoadingScreen"
// import useFormat from '../../hooks/useFormat';

const AdminDashboard = () => {
    const { usuarios, doctores, pacientes, citas, diagnosticos, recetas, isLoading, error, cargarDatos } = useAdmin()
    const [activeTab, setActiveTab] = useState("usuarios")

    if (isLoading) {
        return <LoadingScreen message="Cargando datos del sistema..." />
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-5 flex items-start space-x-4 shadow-sm">
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-red-800">Error</h4>
                    <p className="text-red-700 mt-1">{error}</p>
                </div>
            </div>
        )
    }

    const totalUsuarios = usuarios.length
    const totalDoctores = doctores.length
    const totalPacientes = pacientes.length



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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
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

                </div>
                {/* Navegación de pestañas */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex overflow-x-auto space-x-4 pb-2">
                        <button
                            onClick={() => setActiveTab("usuarios")}
                            className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-md ${activeTab === "usuarios" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                            style={activeTab === "usuarios" ? { backgroundColor: "var(--primary-color)" } : {}}>
                            Usuarios
                        </button>
                        <button
                            onClick={() => setActiveTab("doctores")}
                            className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-md ${activeTab === "doctores" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                            style={activeTab === "doctores" ? { backgroundColor: "var(--primary-color)" } : {}}>
                            Médicos
                        </button>
                        <button
                            onClick={() => setActiveTab("pacientes")}
                            className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-md ${activeTab === "pacientes" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                            style={activeTab === "pacientes" ? { backgroundColor: "var(--primary-color)" } : {}}>
                            Pacientes
                        </button>
                    </div>
                </div>

                {/* Contenido de la pestaña */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {activeTab === "usuarios" && (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Gestión de Usuarios</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                                                Nombre
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tipo
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
                                                            }`}>
                                                        {usuario.tipo_usuario}
                                                    </span>
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
                                <Link to={"NuevoDoctor"} ><button
                                    className=" cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    style={{ backgroundColor: "var(--primary-color)" }}>
                                    Nuevo Médico
                                </button></Link>
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
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {doctores.map((doctor) => {
                                            console.log(doctor)
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
                                <Link to={"NuevoPaciente"} ><button
                                    className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    style={{ backgroundColor: "var(--primary-color)" }}>
                                    Nuevo Paciente
                                </button></Link>
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
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>7¡
            <HospitalInfo />
        </div>
    )
}

export default AdminDashboard
