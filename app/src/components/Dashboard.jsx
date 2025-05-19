import React, { useEffect, useState } from 'react';
import { getUserById } from './../services/apiClient';

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usuarioId = localStorage.getItem("userId");
  const tipoUsuario = localStorage.getItem("rol");

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        setLoading(true);
        const datos = await getUserById(usuarioId);
        setUsuario(datos);
        setError(null);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setError('No se pudo cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };

    if (usuarioId) {
      fetchUsuario();
    } else {
      setLoading(false);
      setError('No se encontró ID de usuario');
    }
  }, [usuarioId]);

  if (loading) {
    return <div>Cargando información del usuario...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!usuario) {
    return <div>No se encontraron datos del usuario</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Nombre: {usuario.nombre} {usuario.apellido1} </p>
      <p>email: {usuario.email}</p>

      {tipoUsuario === 'admin' && (
        <div>
          <h1>Panel de administrador</h1>
        </div>
      )}

      {tipoUsuario === 'paciente' && (
        <div>
          <h1>Panel de paciente</h1>
          <div class="max-w-6xl mx-auto px-4 py-6">
            <div class="max-w-6xl mx-auto px-4 py-6">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Historial Médico */}
                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Historial Médico</h3>
                    <span class="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">Actualizado</span>
                  </div>
                  <div class="space-y-3">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">Hipertensión</p>
                        <p class="text-xs text-gray-500">Diagnóstico: 15/03/2022</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 text-amber-500 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">Diabetes Tipo 2</p>
                        <p class="text-xs text-gray-500">Diagnóstico: 23/07/2021</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 text-purple-500 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">Alergia a la penicilina</p>
                        <p class="text-xs text-gray-500">Registrado: 10/01/2020</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">Hipotiroidismo</p>
                        <p class="text-xs text-gray-500">Diagnóstico: 08/09/2023</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Próximas Citas */}
                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Próximas Citas</h3>
                    <span class="text-xs font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded">Programadas</span>
                  </div>
                  <div class="space-y-4">
                    <div class="flex justify-between border-l-4 border-blue-400 bg-blue-50 p-3 rounded">
                      <div>
                        <p class="text-sm font-medium text-gray-900">Consulta general</p>
                        <p class="text-xs text-gray-600">Dr. García Martínez</p>
                      </div>
                      <div class="text-right">
                        <p class="text-sm font-medium text-gray-900">20/05/2025</p>
                        <p class="text-xs text-gray-600">10:00 AM</p>
                      </div>
                    </div>
                    <div class="flex justify-between border-l-4 border-purple-400 bg-purple-50 p-3 rounded">
                      <div>
                        <p class="text-sm font-medium text-gray-900">Control de presión arterial</p>
                        <p class="text-xs text-gray-600">Dra. López Sánchez</p>
                      </div>
                      <div class="text-right">
                        <p class="text-sm font-medium text-gray-900">02/06/2025</p>
                        <p class="text-xs text-gray-600">09:30 AM</p>
                      </div>
                    </div>
                    <div class="flex justify-between border-l-4 border-amber-400 bg-amber-50 p-3 rounded">
                      <div>
                        <p class="text-sm font-medium text-gray-900">Control de diabetes</p>
                        <p class="text-xs text-gray-600">Dr. Rodríguez Gómez</p>
                      </div>
                      <div class="text-right">
                        <p class="text-sm font-medium text-gray-900">15/06/2025</p>
                        <p class="text-xs text-gray-600">11:15 AM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información Médica */}
                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Información Médica</h3>
                    <span class="text-xs font-medium bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded">General</span>
                  </div>
                  <div class="space-y-4">
                    <div class="bg-gray-50 p-3 rounded-lg">
                      <h4 class="text-sm font-medium text-gray-800 mb-2">Grupo Sanguíneo</h4>
                      <p class="text-sm text-gray-600">A Positivo</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg">
                      <h4 class="text-sm font-medium text-gray-800 mb-2">Alergias Conocidas</h4>
                      <p class="text-sm text-gray-600">Penicilina, Sulfamidas</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg">
                      <h4 class="text-sm font-medium text-gray-800 mb-2">Tratamiento Crónico</h4>
                      <p class="text-sm text-gray-600">Metformina, Enalapril, Levotiroxina</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg">
                      <h4 class="text-sm font-medium text-gray-800 mb-2">Vacunas</h4>
                      <p class="text-sm text-gray-600">Gripe (12/11/2024), COVID-19 (15/02/2025)</p>
                    </div>
                  </div>
                </div>

               {/* Solicitar Cita  */}
                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Solicitar Cita</h3>
                    <span class="text-xs font-medium bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">Online</span>
                  </div>
                   <button className="appointment-button">Solicitar cita</button>
                </div>

                {/*  Recetas  */}
                <div class="bg-white rounded-lg shadow p-6 lg:col-span-2">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Recetas</h3>
                    <span class="text-xs font-medium bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded">Activas</span>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicamento</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha prescripción</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posología</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Metformina 850mg</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05/03/2025</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 comp c/12h con comidas</td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activa</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Enalapril 10mg</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10/03/2025</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 comp c/día en la mañana</td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activa</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Levotiroxina 50mcg</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/03/2025</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 comp c/día en ayunas</td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activa</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Atorvastatina 20mg</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20/02/2025</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 comp c/día por la noche</td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Renovar pronto</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Ibuprofeno 600mg</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18/04/2025</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 comp c/8h si dolor</td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activa</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      )}

      {tipoUsuario === 'doctor' && (
        <div>
          <h1>Panel de doctor</h1>
        </div>
      )}

    </div>
  );
};

export default Dashboard;