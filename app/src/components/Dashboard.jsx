import React, { useEffect, useState } from 'react';
import { getUserById } from './../services/apiClient';

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usuarioId = localStorage.getItem("userId");

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
      <h1>Dashboard</h1>
      <p>Nombre: {usuario.nombre}</p>
      
    </div>
  );
};

export default Dashboard;