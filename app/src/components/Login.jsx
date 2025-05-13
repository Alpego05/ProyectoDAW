import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';


function Login() {
    const navigate = useNavigate();
    const [dni, setDni] = useState("");
    const [clave, setClave] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Asegúrate de que esta URL coincida con tu endpoint de backend
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ dni, clave }),
            });

            const data = await response.json();

            // Si la respuesta no es exitosa, manejar los diferentes tipos de error
            if (!response.ok) {
                if (response.status === 404) {
                    setError("Usuario no encontrado");
                } else if (response.status === 401) {
                    setError("Contraseña incorrecta");
                } else if (response.status === 400) {
                    setError("DNI y contraseña son requeridos");
                } else {
                    setError( "Error al iniciar sesión");
                }
                return;
            }

            // Si la respuesta es exitosa pero no hay token
            if (!data.token) {
                setError("Error en la autenticación: No se recibió token");
                return;
            }

            // Guardar token en localStorage
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userId", data.user);

            // Redireccionar al home
            navigate("/Home");
        } catch (err) {
            console.error("Error de conexión:", err);
            
            // Verificar si es un error de red o CORS
            if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
                setError("No se pudo conectar al servidor. Verifique su conexión a internet o contacte al administrador.");
            } else {
                setError("Error de conexión. Por favor, intente nuevamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-card">
            <h2>Iniciar Sesión</h2>
            <p className="description">Ingrese sus credenciales para acceder al sistema</p>

            <form onSubmit={handleSubmit} className="login-form">
                {error && (
                    <div className="error-alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <p>{error}</p>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="dni">DNI</label>
                    <input
                        id="dni"
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        placeholder="Ingrese su DNI"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="password-input">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            placeholder="Ingrese su contraseña"
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <EyeOff className="icon" />
                            ) : (
                                <Eye className="icon" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="login-button"
                    disabled={loading}
                >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
            </form>

            <p className="footer-text">
                ¿Olvidó su contraseña? Contacte al administrador
            </p>
        </div>
    );
}

export default Login;