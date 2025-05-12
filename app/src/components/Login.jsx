import React, { useState } from 'react';
import './Login.css'; // Asegúrate de tener el archivo de estilo importado.

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            setErrorMessage('Por favor, complete todos los campos.');
        } else {
            console.log('Usuario:', username);
            console.log('Contraseña:', password);

        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="username">DNI</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Introduce tu DNI"
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="password">Clave</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu clave de acceso"
                    />
                </div>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <button type="submit" className="login-button">
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default Login;
