import React from 'react'
import { useTodosPacientes } from '../../../hooks/useUsuarios'

const Pacientes = () => {
  const { pacientes, loading, error } = useTodosPacientes()

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Fecha Nacimiento</th>
            <th>Género</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {pacientes && pacientes.length > 0 ? (
            pacientes.map((paciente) => (
              <tr key={paciente.usuario.nombre}>
                <td>{paciente.usuario.apellido1}</td>
                <td>{paciente.telefono}</td>
                <td>{paciente.fecha_nacimiento}</td>
                <td>{paciente.genero}</td>
                <td>{paciente.direccion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay pacientes encontrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Pacientes