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
                
               
            </div>
            <HospitalInfo />
        </div>
    )
}

export default AdminDashboard
