import React from 'react'
import usePatientRegister from '../../../hooks/users/usePatientRegister'

const RegistrarPaciente = () => {
  const {
    formData,
    loading,
    error,
    success,
    handleUserChange,
    handlePatientChange,
    submitPatient,
    resetForm
  } = usePatientRegister()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitPatient()
      alert('Paciente registrado exitosamente')
    } catch (error) {
      console.error('Error:', error)
      alert('Error al registrar paciente')
    }
  }

  return (
    <div>
      <h2>Registrar Paciente</h2>
      
      {error && <div style={{color: 'red'}}>Error: {error}</div>}
      {success && <div style={{color: 'green'}}>¡Paciente registrado exitosamente!</div>}
      
      <form onSubmit={handleSubmit}>
        <h3>Datos de Usuario</h3>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.user.nombre}
            onChange={handleUserChange}
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Primer Apellido:</label>
          <input
            type="text"
            name="apellido1"
            value={formData.user.apellido1}
            onChange={handleUserChange}
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Segundo Apellido:</label>
          <input
            type="text"
            name="apellido2"
            value={formData.user.apellido2}
            onChange={handleUserChange}
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.user.email}
            onChange={handleUserChange}
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label>DNI:</label>
          <input
            type="text"
            name="dni"
            value={formData.user.dni}
            onChange={handleUserChange}
            required
            disabled={loading}
          />
        </div>

        <h3>Datos de Paciente</h3>
        <div>
          <label>Género:</label>
          <select
            name="genero"
            value={formData.patient.genero}
            onChange={handlePatientChange}
            required
            disabled={loading}
          >
            <option value="">Seleccionar</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.patient.fecha_nacimiento}
            onChange={handlePatientChange}
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.patient.direccion}
            onChange={handlePatientChange}
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.patient.telefono}
            onChange={handlePatientChange}
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Tipo de Sangre:</label>
          <select
            name="tipo_sangre"
            value={formData.patient.tipo_sangre}
            onChange={handlePatientChange}
            required
            disabled={loading}
          >
            <option value="">Seleccionar</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        
        <div>
          <label>Alergias:</label>
          <textarea
            name="alergias"
            value={formData.patient.alergias}
            onChange={handlePatientChange}
            placeholder="Ejemplo: Penicilina, Frutos secos"
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Paciente'}
        </button>
        
        <button type="button" onClick={resetForm} disabled={loading}>
          Limpiar Formulario
        </button>
      </form>
    </div>
  )
}

export default RegistrarPaciente