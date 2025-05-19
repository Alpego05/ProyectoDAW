import React, { useEffect, useState } from 'react';
import { 
  getUserById, 
  getCitaByPatient, 
  getRecetasByPacienteId, 
  getDiagnosticoByCitaId,
  getPatientById
} from './../services/apiClient';

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [citas, setCitas] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const usuarioId = localStorage.getItem("userId");
  const tipoUsuario = localStorage.getItem("rol");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        //obtener datos del usuario siempre
        const datosUsuario = await getUserById(usuarioId);
        setUsuario(datosUsuario);
        
        //comprobar si es paciente
        if (tipoUsuario === 'paciente') {
          const datosPaciente = await getPatientById(usuarioId);
          setPaciente(datosPaciente);
          
          try {
            //citas del paciente
            const citasPaciente = await getCitaByPatient(usuarioId);
            if (citasPaciente) {
              setCitas(citasPaciente);
              
              //obtener diagnostico por cita
              if (citasPaciente.length > 0) {
                const diagnosticosPromises = citasPaciente.map(cita => 
                  getDiagnosticoByCitaId(cita.id_cita).catch(() => null)
                );
                const diagnosticosResultados = await Promise.all(diagnosticosPromises);
                setDiagnosticos(diagnosticosResultados.filter(d => d !== null));
              }
            }
          } catch (citasError) {
            console.warn('No se pudieron cargar las citas:', citasError);
          }
          
          try {
            //obtener recetas del paciente
            const recetasPaciente = await getRecetasByPacienteId(usuarioId);
            if (recetasPaciente) {
              setRecetas(recetasPaciente);
            }
          } catch (recetasError) {
            console.warn('No se pudieron cargar las recetas:', recetasError);
          }
        }
        
        setError(null);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError('No se pudieron cargar todos los datos correctamente');
      } finally {
        setLoading(false);
      }
    };

    if (usuarioId) {
      fetchData();
    } else {
      setLoading(false);
      setError('No se encontró ID de usuario');
    }
  }, [usuarioId, tipoUsuario]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <p className="mt-2">Cargando información...</p>
        </div>
      </div>
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

  //formateo de fecha 
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  // Componente que solo muestra el dashboard de paciente
  const PatientDashboard = () => {
    //ordenar citas por fecha 
    const citasOrdenadas = [...citas].sort((a, b) => 
      new Date(b.fecha) - new Date(a.fecha) 
    );
    
    //3 primeras citas pendientes
    const proximasCitas = citasOrdenadas
      .filter(cita => cita.estado === 'Pendiente')
      .slice(0, 3);
    
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Encabezado del dashboard */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Bienvenido, {usuario.nombre} {usuario.apellido1}</h1>
                <p className="text-gray-600">{usuario.email}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Paciente
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información médica */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Información Médica</h3>
                <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded">General</span>
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
              
              {proximasCitas && proximasCitas.length > 0 ? (
                <div className="space-y-4">
                  {proximasCitas.map((cita, index) => (
                    <div key={cita.id_cita || index} className="flex justify-between border-l-4 border-blue-400 bg-blue-50 p-3 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{cita.nombre || 'Cita médica'}</p>
                        <p className="text-xs text-gray-600">Doctor ID: {cita.doctor_id}</p>
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
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Solicitar cita
                </button>
              </div>
            </div>

            {/* Historial Médico */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Historial Médico</h3>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">Diagnósticos</span>
              </div>
              
              {diagnosticos && diagnosticos.length > 0 ? (
                <div className="space-y-3">
                  {diagnosticos.map((diagnostico, index) => (
                    <div key={diagnostico.id_diagnostico || index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{diagnostico.nombre}</p>
                        <p className="text-xs text-gray-500">{diagnostico.sintomas}</p>
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

            {/* Recetas - Ocupa 2 columnas */}
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recetas Médicas</h3>
                <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded">Medicamentos</span>
              </div>
              
              {recetas && recetas.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnóstico</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicamento</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosis</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recetas.map((receta, index) => (
                        <tr key={receta.id_receta || index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receta.diagnostico_id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receta.medicamento_id}</td>
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
        <div className="bg-gray-50 min-h-screen p-10">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Panel de administrador</h1>
            <p className="text-gray-600">Implementación pendiente</p>
          </div>
        </div>
      ) : tipoUsuario === 'doctor' ? (
        <div className="bg-gray-50 min-h-screen p-10">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Panel de doctor</h1>
            <p className="text-gray-600">Implementación pendiente</p>
          </div>
        </div>
      ) : (
        <div className="text-center p-10">
          <p className="text-xl text-red-500">Tipo de usuario no reconocido</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;