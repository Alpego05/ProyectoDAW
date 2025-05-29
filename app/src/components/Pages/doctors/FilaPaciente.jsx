import React from 'react'
import { Eye, Edit } from 'lucide-react'

const FilaPaciente = ({ paciente, index, onVerDetalles, onEditarPaciente }) => {
    return (
        <tr
            key={index}
            className="hover:bg-gray-50 transition-colors duration-150"
        >
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-4">
                        {paciente.usuario.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {paciente.usuario.nombre} {paciente.usuario.apellido1} {paciente.usuario.apellido2}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {paciente.telefono || 'No disponible'}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {paciente.fecha_nacimiento || 'No disponible'}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">
                    {paciente.direccion || 'No disponible'}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onVerDetalles(paciente)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver Detalles
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default FilaPaciente