"use client"

import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import "./Footer.css"
import Map from "./../assets/images/map.png"
import Logo from './../assets/images/logo.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-info">
                        <div className="footer-logo">
                            <img src={Logo} alt="Medinet Logo" className="footer-logo-img" />
                            <div className="footer-logo-text">
                                <h2>Medinet</h2>
                                <span>Centro Médico Especializado</span>
                            </div>
                        </div>
                        <p className="footer-description">
                            Brindando atención médica de excelencia desde 1995. Nuestro compromiso es cuidar de su salud con los más
                            altos estándares de calidad y calidez humana.
                        </p>
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-links-column">
                            <h3>Enlaces Rápidos</h3>
                            <ul>
                                <li>
                                    <a href="#">Inicio</a>
                                </li>
                                <li>
                                    <a href="#">Sobre Nosotros</a>
                                </li>
                                <li>
                                    <a href="#">Servicios</a>
                                </li>
                                <li>
                                    <a href="#">Especialidades</a>
                                </li>
                                <li>
                                    <a href="#">Médicos</a>
                                </li>
                                <li>
                                    <a href="#">Contacto</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-links-column">
                            <h3>Servicios</h3>
                            <ul>
                                <li>
                                    <a href="#">Consultas Médicas</a>
                                </li>
                                <li>
                                    <a href="#">Laboratorio Clínico</a>
                                </li>
                                <li>
                                    <a href="#">Diagnóstico por Imágenes</a>
                                </li>
                                <li>
                                    <a href="#">Cirugía Ambulatoria</a>
                                </li>
                                <li>
                                    <a href="#">Urgencias</a>
                                </li>
                                <li>
                                    <a href="#">Telemedicina</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-links-column">
                            <h3>Contacto</h3>
                            <ul className="contact-list">

                                <li>
                                    <Phone size={16} />
                                    <span>666-66-66</span>
                                </li>
                                <li>
                                    <Mail size={16} />
                                    <span>medinettalavera@gmail.com</span>
                                </li>
                                <li>
                                    <Clock size={16} />
                                    <span>Lun-Vie: 8:00 - 20:00</span>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Medinet Centro Médico. Todos los derechos reservados.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Términos y Condiciones</a>
                        <a href="#">Política de Privacidad</a>
                    </div>
                </div>
            </div>

            {/* Decoración visual */}
            <div className="footer-decoration">
                {/* <div className="decoration-wave"></div>
        <div className="decoration-dots"></div> */}
            </div>
        </footer>
    )
}

export default Footer

