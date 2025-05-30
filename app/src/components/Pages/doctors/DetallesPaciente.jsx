import { useParams } from 'react-router-dom'
import { getData } from "../../../hooks/useUsuarios"
import { Check, User, Calendar, Phone, MapPin, Heart, Pill, FileText, ArrowLeft, Mail, Clock, Activity, Stethoscope, AlertCircle } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from "../../Common/LoadingSpinner"

const DetallesPaciente = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const handleVolver = () => navigate(-1)

    const { usuario, paciente, recetas, diagnosticos, citas, formatDate, loading, error, getProximasCitas } = getData(
        id,
        "paciente",
    )

    if (loading) {
        return <LoadingSpinner message="Cargando datos del paciente..." />
    }

    if (error) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                    <div className="flex items-center space-x-3 text-red-600 mb-4">
                        <AlertCircle className="h-6 w-6" />
                        <h3 className="text-lg font-semibold">Error</h3>
                    </div>
                    <p className="text-gray-700">{error}</p>
                </div>
            </div>
        )
    }

    if (!usuario || !paciente) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                    <div className="flex items-center space-x-3 text-yellow-600 mb-4">
                        <AlertCircle className="h-6 w-6" />
                        <h3 className="text-lg font-semibold">Sin datos</h3>
                    </div>
                    <p className="text-gray-700">No se encontraron datos del paciente</p>
                </div>
            </div>
        )
    }

    const proximasCitas = getProximasCitas()

    // calcular la edad
    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return 'No especificada'
        const hoy = new Date()
        const nacimiento = new Date(fechaNacimiento)
        let edad = hoy.getFullYear() - nacimiento.getFullYear()
        const mes = hoy.getMonth() - nacimiento.getMonth()
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--
        }
        return `${edad} años`
    }

    return (
        <div className="min-h-screen bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-6">
                    {/* Tarjeta principal del paciente */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                                    {usuario.nombre} {usuario.apellido1} {usuario.apellido2}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <User className="w-5 h-5 text-blue-500 mr-2" />
                            Información Personal
                        </h3>

                        <div className="space-y-4">
                            {/* Datos Personales */}
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Datos Personales</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Género:</span>
                                        <span className="text-gray-800">{paciente?.genero || "No especificado"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Fecha de nacimiento:</span>
                                        <span className="text-gray-800">{formatDate(paciente?.fecha_nacimiento) || "No especificada"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Edad:</span>
                                        <span className="text-gray-800">{calcularEdad(paciente?.fecha_nacimiento)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contacto */}
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <Phone className="w-4 h-4 text-blue-500 mr-1" />
                                    Contacto
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Teléfono:</span>
                                        <span className="text-gray-800">{paciente?.telefono || "No especificado"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="text-gray-800 truncate ml-2">{usuario.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Alergias */}
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <Heart className="w-4 h-4 text-blue-500 mr-1" />
                                    Alergias
                                </h4>
                                <p className="text-gray-700 text-sm">{paciente?.alergias || "No se han registrado alergias"}</p>
                            </div>

                            {/* Historial medico */}
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <Activity className="w-4 h-4 text-blue-500 mr-1" />
                                    Historial Médico
                                </h4>
                                <p className="text-gray-700 text-sm">{paciente?.historial || "No se ha registrado historial médico"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Proximas Citas */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                                Próximas Citas
                            </h3>
                        </div>

                        {proximasCitas.length > 0 ? (
                            <div className="space-y-3">
                                {proximasCitas.map((cita, index) => (
                                    <div key={cita.id_cita || index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 text-sm">
                                                    {cita.nombre || "Consulta médica"}
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    Estado: {cita.estado}
                                                </p>
                                            </div>
                                            <div className="text-right text-sm">
                                                <p className="font-semibold text-gray-800">{formatDate(cita.fecha)}</p>
                                                <p className="text-gray-600 flex items-center">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {cita.hora_inicio}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-6 bg-blue-50 rounded-lg">
                                <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">No hay citas programadas</p>
                            </div>
                        )}
                    </div>

                    {/* Diagnosticos */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <FileText className="w-5 h-5 text-blue-500 mr-2" />
                                Diagnósticos
                            </h3>

                        </div>

                        {diagnosticos && diagnosticos.length > 0 ? (
                            <div className="space-y-3">
                                {diagnosticos.map((diagnostico, index) => (
                                    <div key={diagnostico.id_diagnostico || index} className="p-3 bg-blue-50 rounded-lg">
                                        <div className="flex items-start space-x-2">
                                            <Check className="w-4 h-4 text-blue-500 mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-gray-800 text-sm">{diagnostico.nombre}</h4>
                                                <p className="text-xs text-gray-600">
                                                    Enfermedad: {diagnostico.enfermedad?.nombre}
                                                </p>
                                                {diagnostico.descripcion && (
                                                    <p className="text-xs text-gray-500 mt-1">{diagnostico.descripcion}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-6 bg-blue-50 rounded-lg">
                                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">No hay diagnósticos</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recetas Medicas */}
                <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            <Pill className="w-5 h-5 text-blue-500 mr-2" />
                            Recetas Médicas
                        </h3>
                    </div>

                    {recetas && recetas.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Medicamento
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Dosis
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Duración
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recetas.map((receta, index) => (
                                        <tr key={receta.id_receta || index} className="hover:bg-blue-50">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-2">
                                                    <Pill className="w-4 h-4 text-blue-500" />
                                                    <span className="font-medium text-gray-800 text-sm">
                                                        {receta.medicamento?.nombre}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 text-sm">
                                                {receta.dosis}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 text-sm">
                                                {receta.duración || receta.duracion}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-blue-50 rounded-lg">
                            <Pill className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">No hay recetas médicas</p>
                        </div>
                    )}
                </div>

                {/* Historial de Citas */}
                <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                            Historial de Citas
                        </h3>
                    </div>

                    {citas && citas.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Fecha
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Hora
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Motivo
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {citas
                                        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                                        .map((cita, index) => (
                                            <tr key={cita.id_cita || index} className="hover:bg-blue-50">
                                                <td className="px-4 py-3 font-medium text-gray-800 text-sm">
                                                    {formatDate(cita.fecha)}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 text-sm">
                                                    <div className="flex items-center">
                                                        <Clock className="w-3 h-3 mr-1 text-gray-400" />
                                                        {cita.hora_inicio} - {cita.hora_fin}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 text-sm">
                                                    {cita.nombre || "Consulta médica"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${cita.estado === 'Completada' ? 'bg-green-100 text-green-800' :
                                                        cita.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                                            cita.estado === 'No asistida' ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {cita.estado}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-blue-50 rounded-lg">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">No hay historial de citas</p>
                        </div>
                    )}
                </div>
                <div className="pt-4">
                <button
                    onClick={handleVolver}
                    className="cursor-pointer bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-3 border border-gray-200 font-medium"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Volver</span>
                </button>
            </div>
            </div>
        </div>
    )
}

export default DetallesPaciente