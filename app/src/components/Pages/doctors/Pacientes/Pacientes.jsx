import React, { useState, useMemo } from 'react'
import { useTodosPacientes } from '../../../../hooks/users/usePacientes'
import { Search, Users, Phone, Calendar, MapPin, User, Loader2, AlertCircle, Settings } from 'lucide-react'
import FilaPaciente from './FilaPaciente'

const Pacientes = () => {
  const { pacientes, loading, error } = useTodosPacientes()
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar pacientes por nombre y apellido
  const pacientesFiltrados = useMemo(() => {
    if (!pacientes || !searchTerm.trim()) return pacientes || []

    return pacientes.filter(paciente => {
      const nombreCompleto = `${paciente.usuario.nombre} ${paciente.usuario.apellido1} ${paciente.usuario.apellido2}`.toLowerCase()
      return nombreCompleto.includes(searchTerm.toLowerCase())
    })
  }, [pacientes, searchTerm])

  // Handlers para los botones
  const handleVerDetalles = (paciente) => {
    console.log('Ver detalles del paciente:', paciente)
  }
  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">

        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Lista de Pacientes</h2>
          <p className="text-gray-500 text-sm mt-1">
            Gestiona y consulta la información de todos los pacientes registrados
          </p>
        </div>

        <div className="p-4 border-b">
          <div className="flex flex-col gap-4">

            {/* Barra de busqueda */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar por nombre o apellido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2 text-blue-600">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-lg font-medium">Cargando pacientes...</span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <h3 className="text-red-800 font-medium">Error</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Tabla de pacientes */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Paciente</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Teléfono</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Fecha Nacimiento</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>Dirección</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Acciones</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pacientesFiltrados && pacientesFiltrados.length > 0 ? (
                      pacientesFiltrados.map((paciente, index) => (
                        <FilaPaciente
                          key={index}
                          paciente={paciente}
                          index={index}
                          onVerDetalles={handleVerDetalles}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                {searchTerm ? 'No se encontraron pacientes' : 'No hay pacientes disponibles'}
                              </p>
                              <p className="text-gray-500 text-sm mt-1">
                                {searchTerm
                                  ? `No hay resultados para "${searchTerm}"`
                                  : 'Los pacientes aparecerán aquí cuando estén disponibles'
                                }
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {pacientesFiltrados && pacientesFiltrados.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <p>
                      Mostrando {pacientesFiltrados.length} de {pacientes?.length || 0} pacientes
                    </p>
                    {searchTerm && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Filtrado por: "{searchTerm}"
                      </span>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pacientes