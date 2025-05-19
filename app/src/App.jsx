import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./components/Login"

// rutas páginas
import Dashboard from "./components/Dashboard";
import AgendaPaciente from './components/patients/AgendaPaciente'
import HistorialPaciente from './components/patients/HistorialPaciente'
import RecetasPaciente from './components/patients/RecetasPaciente'
import Perfil from './components/Perfil'
import SolicitarCita from './components/patients/SolicitarCita'
import DashboardCitas from './components/admins/DashboardCitas'
import DashboardUsuarios from './components/admins/DashboardUsuarios'
import DashboardDiagnosticos from './components/admins/DashboardDiagnosticos'
import Calendario from './components/doctors/Calendario'
import Glosario from './components/doctors/Glosario'
import Pacientes from './components/doctors/Pacientes'



function App() {
  const rol = localStorage.getItem("rol")

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        {/* Protegemos la ruta revisando el rol */}
        <Route
          path='/Home'
          element={rol ? <Layout /> : <Navigate to='/' />}
        >

          {/* rutas pacientes */}
          {rol === "paciente" && (
              <>
              <Route index element={<Dashboard />} />
              <Route path='Agenda' element={<AgendaPaciente />} />
              <Route path='Historial' element={<HistorialPaciente />} />
              <Route path='Recetas' element={< RecetasPaciente/>} />
              <Route path='SolicitarCita' element={<SolicitarCita/>} />
            </>
            
          )}

          {/* Rutas Doctores */}
          {rol === "doctor" && (
            <>
            <Route index element={<Dashboard />} />
            <Route path='Calendario' element={<Calendario/>} />
            <Route path='Glosario' element={<Glosario/>} />
            <Route path='Pacientes' element={<Pacientes/>} />
            </>
            


          )}

          {/* Rutas Admins */}
          {rol === "admin" && (
            <>
            <Route index element={<Dashboard />} />
            <Route path='DashboardCitas' element={< DashboardCitas/>} />
            <Route path='DashboardUsuarios' element={<DashboardUsuarios/>} />
            <Route path='DashboardDiagnosticos' element={<DashboardDiagnosticos/>} />
            </>
            

          )}

          {/* rutas comunes */}
          <Route path='Perfil' element={<Perfil/>} />


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
