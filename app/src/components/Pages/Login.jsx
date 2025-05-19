import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import { login } from "../../services/authservices"; 
import Logo from './../../assets/images/logo.png';

function Login() {
    const navigate = useNavigate();
    const [dni, setDni] = useState("");
    const [clave, setClave] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await login({ dni, clave });
            navigate("/Home");
        } catch (err) {
            console.error("Error de login:", err);
            
            if (err.status === 404) {
                setError("Usuario no encontrado");
            } else if (err.status === 401) {
                setError("Contraseña incorrecta");
            } else if (err.status === 400) {
                setError("DNI y contraseña son requeridos");
            } else {
                setError(err.message || "Error al iniciar sesión");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <div className="text-center mb-6">
                        <img src={Logo} alt="Logo" className="h-16 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
                    </div>
                    
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

                        {error && (
                            <div className="flex items-center gap-3 p-3 rounded-md"
                                style={{
                                    backgroundColor: "rgba(239, 68, 68, 0.1)"
                                }}>
                                <CircleAlert style={{ color: "var(--danger-color, #ef4444)" }} />
                                <p className="text-sm" style={{ color: "var(--danger-color, #ef4444)" }}>{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full font-semibold py-3 px-4 rounded-md cursor-pointer"
                            style={{
                                backgroundColor: "var(--primary-color)",
                                color: "white",
                                transition: "var(--transition)",
                                opacity: isLoading ? 0.7 : 1
                            }}
                        >
                            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;