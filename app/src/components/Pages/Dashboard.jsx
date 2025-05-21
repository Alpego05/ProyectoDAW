import React from 'react';
import { getData } from '../../hooks/useUsuarios';
import { Check, CircleUserRound, CircleX, User } from 'lucide-react';
import instalaciones from '../../assets/images/instalaciones.jpg';
import LoadingSpinner from '../Common/LoadingSpinner';

const Dashboard = () => {
  const usuarioId = localStorage.getItem("userId");
  const tipoUsuario = localStorage.getItem("rol");

  const {
    usuario,
    paciente,
    recetas,
    diagnosticos,
    formatDate,
    loading,
    error,
    getProximasCitas
  } = getData(usuarioId, tipoUsuario);

  if (loading) {
    return (
      <LoadingSpinner message="Cargando citas..." />
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-lg mt-10">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mx-auto max-w-lg mt-10">
        <p>No se encontraron datos del usuario</p>
      </div>
    );
  }

  // Componente que solo muestra el dashboard de paciente
  const PatientDashboard = () => {
    const proximasCitas = getProximasCitas();

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Encabezado del dashboard */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Bienvenido, {usuario.nombre} {usuario.apellido1}</h1>
                <p className="text-gray-600" >{usuario.email}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full text-sm font-medium" style={{ color: "var(--primary-color)" }}>
                  <User className="w-4 h-4 mr-1" />
                  Paciente
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-20">
            {/* Información del paciente */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
                <span className="text-xs font-medium bg-indigo-100  px-2.5 py-0.5 rounded" style={{ color: "var(--primary-color)" }}>General</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Datos personales</h4>
                  <p className="text-sm text-gray-600">Género: {paciente?.genero || 'No especificado'}</p>
                  <p className="text-sm text-gray-600">Fecha de nacimiento: {formatDate(paciente?.fecha_nacimiento) || 'No especificada'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Contacto</h4>
                  <p className="text-sm text-gray-600">Teléfono: {paciente?.telefono || 'No especificado'}</p>
                  <p className="text-sm text-gray-600">Dirección: {paciente?.direccion || 'No especificada'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Alergias</h4>
                  <p className="text-sm text-gray-600">{paciente?.alergias || 'No se han registrado alergias'}</p>
                </div>

              </div>
            </div>

            {/* Próximas Citas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Próximas Citas</h3>
                <span className="text-xs font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded">Programadas</span>
              </div>

              {proximasCitas.length > 0 ? (
                <div className="space-y-4">
                  {proximasCitas.map((cita, index) => (
                    <div key={cita.id_cita || index} className="flex justify-between border-l-4 border-blue-400 bg-blue-50 p-3 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{cita.nombre || 'Cita médica'}</p>

                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatDate(cita.fecha)}</p>
                        <p className="text-xs text-gray-600">{cita.hora_inicio} - {cita.hora_fin}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No tienes citas programadas</p>
                </div>
              )}

              <div className="mt-4 text-center">
                <button className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" style={{ backgroundColor: "var(--primary-color)" }}>
                  Solicitar nueva cita
                </button>
              </div>
            </div>

            {/* Historial Médico */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800" >Historial Médico</h3>
                <span className="text-xs font-medium bg-blue-100  px-2.5 py-0.5 rounded" style={{ color: "var(--primary-color)" }}>Diagnósticos</span>
              </div>

              {diagnosticos && diagnosticos.length > 0 ? (
                <div className="space-y-3">
                  {diagnosticos.map((diagnostico, index) => (
                    <div key={diagnostico.id_diagnostico || index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5">
                        <Check />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{diagnostico.nombre}</p>
                        <p className="text-xs text-gray-500">Enfermedad: {diagnostico.enfermedad.nombre}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No hay diagnósticos registrados</p>
                </div>
              )}
            </div>

            {/* Recetas */}
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recetas Médicas</h3>
                <span className="text-xs font-medium bg-indigo-100  px-2.5 py-0.5 rounded" style={{ color: "var(--primary-color)" }}>Medicamentos</span>
              </div>

              {recetas && recetas.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicamento</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosis</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recetas.map((receta, index) => (
                        <tr key={receta.id_receta || index}>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receta.medicamento.nombre}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receta.dosis}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receta.duración || receta.duracion}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Activa
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No hay recetas médicas registradas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {tipoUsuario === 'paciente' ? (
        <PatientDashboard />
      ) : tipoUsuario === 'admin' ? (
        <h1>Panel de administrador</h1>

      ) : tipoUsuario === 'doctor' ? (
        <h1>Panel de doctor</h1>

      ) : (
        <div className="text-center p-10">
          <p className="text-xl text-red-500">Tipo de usuario no reconocido</p>
        </div>
      )}


      <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold  mb-4" style={{ color: "var(--primary-color)" }}>Hospital Medinet</h2>
            <p className="text-gray-700 text-lg mb-6">
              El Hospital Medinet es un centro médico de referencia, comprometido con la salud y el bienestar de nuestros pacientes desde hace más de 30 años.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Emergencias 24/7</li>
              <li>Unidad de cuidados intensivos (UCI)</li>
              <li>Laboratorio clínico y diagnóstico por imágenes</li>
              <li>Atención especializada en más de 20 disciplinas médicas</li>
            </ul>
          </div>
          <div>
            <img
              src={instalaciones}
              alt="Hospital"
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;