import { useState, useEffect } from "react"
import { Menu, X, Phone, Calendar, LogOut, CalendarCheck, FileText, Pill, User } from 'lucide-react'
import "./Header.css"
import Logo from './../assets/images/logo.png'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [rol, setRol] = useState(null)

  useEffect(() => {
    const storedRol = localStorage.getItem("rol")
    setRol(storedRol)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const renderNavItems = () => {
    switch (rol) {
      case "admin":
        return (
          <>
            <li className="nav-item"><a href="#" className="nav-link">Citas</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Usuarios</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Diagnosticos</a></li>
          </>
        )
      case "doctor":
        return (
          <>
            <li className="nav-item"><a href="#" className="nav-link"><CalendarCheck size={18} /> Calendario</a></li>
            <li className="nav-item"><a href="#" className="nav-link"><FileText size={18} /> Glosario</a></li>
            <li className="nav-item"><a href="#" className="nav-link"><Pill size={18} /> Asignar</a></li>
          </>
        )
      case "paciente":
        return (
          <>
            <li className="nav-item"><a href="#" className="nav-link"><CalendarCheck size={18} /> Citas</a></li>
            <li className="nav-item"><a href="#" className="nav-link"><FileText size={18} /> Historial</a></li>
            <li className="nav-item"><a href="#" className="nav-link"><Pill size={18} /> Recetas</a></li>
          </>
        )
      default:
        return null
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-area">
          <div className="logo-wrapper">
            <img src={Logo} alt="Medinet Logo" className="logo-image" />
          </div>
          <div className="brand-text">
            <h1>Medinet</h1>
            <span>Centro Médico</span>
          </div>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            <Phone size={35} className="contact-icon" />
            <div className="contact-text">
              <span className="contact-label">Emergencias 24/7</span>
              <span className="contact-value">666-66-66</span>
            </div>
          </div>
          <div className="contact-item">
            <Calendar size={35} className="contact-icon" />
            <div className="contact-text">
              <span className="contact-label">Horario de atención</span>
              <span className="contact-value">Lun-Vie: 8:00 - 20:00</span>
            </div>
          </div>
        </div>

        <button className="appointment-button">Solicitar cita</button>

        <button className="mobile-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`}>
        <div className="nav-container">
          <div className="mobile-nav-header">
            <div className="mobile-brand">
              <img src="/placeholder.svg?height=40&width=40" alt="Medinet Logo" className="mobile-logo" />
              <span>Medinet</span>
            </div>
            <button className="mobile-close" onClick={toggleMobileMenu}>
              <X size={24} />
            </button>
          </div>

          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link active">Inicio</a>
            </li>
            {renderNavItems()}
            <li className="nav-item">
              <a href="#" className="nav-link"><User size={18} /> Perfil</a>
            </li>
            <li className="nav-item logout">
              <a href="#" className="nav-link-2"><LogOut size={18} /> Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && <div className="mobile-overlay" onClick={toggleMobileMenu}></div>}
    </header>
  )
}

export default Header
