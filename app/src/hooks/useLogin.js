import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authservices";

export const useLogin = () => {
    const navigate = useNavigate();
    const [dni, setDni] = useState("");
    const [clave, setClave] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setError(null);
        setIsLoading(true);

        try {
            const response = await login({ dni, clave });
            console.log("Login ok:", response);
            
            if (response && response.token) {
                localStorage.setItem('authToken', response.token);
            }
            
            if (response && response.user) {
                localStorage.setItem('userData', JSON.stringify(response.user));
            }
            
            setTimeout(() => {
                console.log("timeout delay 0.1 /Home");
                navigate("/Home", { replace: true });
            }, 100);
            
        } catch (err) {
            console.error("Error durante el login:", err);
            
            if (err.status === 404) {
                setError("Usuario no encontrado");
            } else if (err.status === 401) {
                setError("Contraseña incorrecta");
            } else if (err.status === 400) {
                setError("DNI y contraseña son requeridos");
            } else if (err.response && err.response.status) {
                // Manejo para errores con response
                switch (err.response.status) {
                    case 404:
                        setError("Usuario no encontrado");
                        break;
                    case 401:
                        setError("Contraseña incorrecta");
                        break;
                    case 400:
                        setError("DNI y contraseña son requeridos");
                        break;
                    case 500:
                        setError("Error interno del servidor");
                        break;
                    default:
                        setError("Error al iniciar sesión");
                }
            } else {
                setError(err.message || "Error de conexión. Verifique su internet.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const clearError = () => {
        setError(null);
    };

    const clearForm = () => {
        setDni("");
        setClave("");
        setError(null);
        setShowPassword(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate("/login", { replace: true });
    };

    return {
        dni,
        setDni,
        clave,
        setClave,
        showPassword,
        error,
        isLoading,
        handleSubmit,
        togglePasswordVisibility,
        clearError,
        clearForm,
        handleLogout
    };
};