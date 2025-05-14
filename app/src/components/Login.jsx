
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Phone, MapPin, Clock, Menu, X, Eye, EyeOff, Calendar, HeartPulse, Stethoscope, Users, ChevronRight, CheckCircle2, CircleAlert, Activity } from 'lucide-react';
import Footer from "./Footer";
import "./../index.css"
import InstalacionesImg from './../assets/images/Instalaciones.jpg';
import EquipoImg from './../assets/images/Equipo.jpg';
import Logo from './../assets/images/logo.png'


function Login() {
    const navigate = useNavigate();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [dni, setDni] = useState("");
    const [clave, setClave] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const toggleLoginAside = () => {
        setIsLoginOpen(!isLoginOpen);
        // Reset form when closing
        if (isLoginOpen) {
            setDni("");
            setClave("");
            setError(null);
        }
    };

    const toggleMobileNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ dni, clave }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 404) {
                    setError("Usuario no encontrado");
                } else if (response.status === 401) {
                    setError("Contraseña incorrecta");
                } else if (response.status === 400) {
                    setError("DNI y contraseña son requeridos");
                } else {
                    setError(extractErrorMessage(data.message) || "Error al iniciar sesión");
                }
                return;
            }

            if (!data.token) {
                setError("Error en la autenticación: No se recibió token");
                return;
            }

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userId", data.user);
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("loginTime", Date.now().toString());

            navigate("/Home");
        } catch (err) {
            console.error("Error de conexión:", err);

            if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
                setError("No se pudo conectar al servidor. Verifique su conexión a internet o contacte al administrador.");
            } else {
                setError("Error de conexión. Por favor, intente nuevamente.");
            }
        }
    };


    // Función para extraer mensajes específicos de error
    const extractErrorMessage = (message) => {
        if (!message) return null;

        // Extraer mensajes específicos
        if (message.includes("Usuario no encontrado")) {
            return "Usuario no encontrado";
        }
        if (message.includes("Contraseña incorrecta")) {
            return "Contraseña incorrecta";
        }
        if (message.includes("Dni y contraseña son requeridos")) {
            return "DNI y contraseña son requeridos";
        }

        return message;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="dni" className="block text-sm font-medium" style={{ color: "var(--text-medium)" }}>
                                DNI
                            </label>
                            <input
                                id="dni"
                                type="text"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                placeholder="Ingrese su DNI"
                                required
                                className="w-full px-4 py-3 rounded-md focus:outline-none"
                                style={{
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid var(--border-color)",
                                    transition: "var(--transition)"
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium" style={{ color: "var(--text-medium)" }}>
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={clave}
                                    onChange={(e) => setClave(e.target.value)}
                                    placeholder="Ingrese su contraseña"
                                    required
                                    className="w-full px-4 py-3 rounded-md focus:outline-none"
                                    style={{
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--border-color)",
                                        transition: "var(--transition)"
                                    }}
                                />

                                {error && (
                                    <div className="flex items-center gap-3 pt-4 pl-3 rounded-md"
                                        style={{
                                            backgroundColor: "var(--danger-color, #ef4444)/10"
                                        }}>
                                        <CircleAlert style={{ color: "var(--danger-color, #ef4444)" }} />
                                        <p className="text-sm" style={{ color: "var(--danger-color, #ef4444)" }}>{error}</p>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    style={{ color: "var(--text-medium)" }}
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            className="w-full font-semibold py-3 px-4 rounded-md cursor-pointer"
                            style={{
                                backgroundColor: "var(--primary-color)",
                                color: "white",
                                transition: "var(--transition)"
                            }}
                        >
                            Iniciar Sesión
                        </button>
                    </form>



    );
}

export default Login;