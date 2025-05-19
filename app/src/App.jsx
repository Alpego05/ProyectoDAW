import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Pages/layout/Layout"
import Login from "./components/Pages/Login"

// rutas páginas
import Dashboard from "./components/Pages/Dashboard";
import AgendaPaciente from './components/Pages/patients/AgendaPaciente'
import HistorialPaciente from './components/Pages/patients/HistorialPaciente'
import RecetasPaciente from './components/Pages/patients/RecetasPaciente'
import Perfil from './components/Pages/Perfil'
import SolicitarCita from './components/Pages/patients/SolicitarCita'
import DashboardCitas from './components/Pages/admins/DashboardCitas'
import DashboardUsuarios from './components/Pages/admins/DashboardUsuarios'
import DashboardDiagnosticos from './components/Pages/admins/DashboardDiagnosticos'
import AgendaDoctor from './components/Pages/doctors/AgendaDoctor'
import Glosario from './components/Pages/doctors/Glosario'
import Pacientes from './components/Pages/doctors/Pacientes'



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
            <Route path='Calendario' element={<AgendaDoctor/>} />
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
