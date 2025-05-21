import DoctorDashboard from "./DoctorDashboard.jsx"
import AdminDashboard from "./AdminDashboard"
import PatientDashboard from "./PatientDashboard"


const Dashboard = () => {
  const usuarioId = localStorage.getItem("userId")
  const tipoUsuario = localStorage.getItem("rol")

  if (tipoUsuario === "paciente") {
    return <PatientDashboard usuarioId={usuarioId} />
  } else if (tipoUsuario === "doctor") {
    return <DoctorDashboard doctorId={usuarioId} />
  } else if (tipoUsuario === "admin") {
    return <AdminDashboard />
  } else {
    return (
      <div className="text-center p-10">
        <p className="text-xl text-red-500">Tipo de usuario no reconocido</p>
      </div>
    )
  }

  
}

export default Dashboard