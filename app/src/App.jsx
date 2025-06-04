import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Pages/layout/Layout"
import Login from "./components/Pages/Login"
import SetPass from './components/Pages/SetPass'

// componentes de pacientes
import Dashboard from "./components/Dashboard/Dashboard";
import AgendaPaciente from './components/Pages/patients/Calendario/AgendaPaciente'
import SolicitarCita from './components/Pages/patients/Solicitar/SolicitarCita'
import HistorialPaciente from './components/Pages/patients/Historial/HistorialPaciente'

//componentes de admins
import RegistrarPaciente from './components/Pages/admins/RegistrarPaciente'
import RegistrarDoctor from './components/Pages/admins/RegistrarDoctor'

//componentes de doctores
import AgendaDoctor from './components/Pages/doctors/Calendario/AgendaDoctor'
import Glosario from './components/Pages/doctors/Glosario/Glosario'
import Pacientes from './components/Pages/doctors/Pacientes/Pacientes'
import MedicamentoDetalle from './components/Pages/doctors/Glosario/MedicamentoDetalle'
import EnfermedadDetalle from './components/Pages/doctors/Glosario/EnfermedadDetalle'
import DetallesPaciente from './components/Pages/doctors/Pacientes/DetallesPaciente'

function App() {
  const rol = localStorage.getItem("rol")

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='SetPass' element={<SetPass />} />

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
              {/* <Route path='Recetas' element={< RecetasPaciente/>} /> */}
              <Route path='SolicitarCita' element={<SolicitarCita />} />
              <Route path='Historial' element={<HistorialPaciente />} />
            </>

          )}

          {/* Rutas Doctores */}
          {rol === "doctor" && (
            <>
              <Route index element={<Dashboard />} />
              <Route path='Calendario' element={<AgendaDoctor />} />
              <Route path='Glosario' element={<Glosario />} />
              <Route path="medicamentos/:id" element={<MedicamentoDetalle />} />
              <Route path="enfermedades/:id" element={<EnfermedadDetalle />} />
              <Route path='Paciente/:id' element={<DetallesPaciente></DetallesPaciente>}></Route>
              <Route path='Pacientes' element={<Pacientes />} />
            </>

          )}

          {/* Rutas Admins */}
          {rol === "admin" && (
            <>
              <Route index element={<Dashboard />} />
              <Route path='NuevoPaciente' element={<RegistrarPaciente />} />
              <Route path='NuevoDoctor' element={<RegistrarDoctor />} />

            </>


          )}

          {/* rutas comunes */}
          {/* <Route path='Perfil' element={<Perfil />} /> */}
        


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
