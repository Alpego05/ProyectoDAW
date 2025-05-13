import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./components/Login"
import PatientDashboard from "./components/patients/Dashboard";
import DoctorDashboard from "./components/doctors/Dashboard";
import AdminDashboard from "./components/admins/Dashboard";
import { logout , isSessionExpired } from './services/authservices';

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

          {/* Rutas Pacientes */}
          {rol === "paciente" && (
            <Route index element={<PatientDashboard />} />

          )}

          {/* Rutas Doctores */}
          {rol === "doctor" && (
            <Route index element={<DoctorDashboard />} />

          )}

          {/* Rutas Admins */}
          {rol === "admin" && (
            <Route index element={<AdminDashboard />} />

          )}


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
