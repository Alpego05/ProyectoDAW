import React from 'react'
import useDoctorRegister from '../../../hooks/users/useDoctorRegister'

const RegistrarDoctor = () => {
  const {
    formData,
    loading,
    error,
    success,
    handleUserChange,
    handleDoctorChange,
    submitDoctor,
    resetForm
  } = useDoctorRegister()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitDoctor()
      alert('Doctor registrado exitosamente')
    } catch (error) {
      console.error('Error:', error)
      alert('Error al registrar doctor')
    }
  }

  return (
    <div>
      <h2>Registrar Doctor</h2>
      
      {error && <div style={{color: 'red'}}>Error: {error}</div>}
      {success && <div style={{color: 'green'}}>¡Doctor registrado exitosamente!</div>}
      
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

        <h3>Datos de Doctor</h3>
        <div>
          <label>Especialidad:</label>
          <input
            type="text"
            name="especialidad"
            value={formData.doctor.especialidad}
            onChange={handleDoctorChange}
            placeholder="Ejemplo: traumatologia"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Sala Asignada:</label>
          <input
            type="text"
            name="sala_asignada"
            value={formData.doctor.sala_asignada}
            onChange={handleDoctorChange}
            placeholder="Ejemplo: 2A Edificio B"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Número de Licencia:</label>
          <input
            type="text"
            name="numero_licencia"
            value={formData.doctor.numero_licencia}
            onChange={handleDoctorChange}
            placeholder="Ejemplo: 2334244"
            required
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Doctor'}
        </button>
        
        <button type="button" onClick={resetForm} disabled={loading}>
          Limpiar Formulario
        </button>
      </form>
    </div>
  )
}

export default RegistrarDoctor