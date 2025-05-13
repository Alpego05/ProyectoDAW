"use client"

import { useEffect, useState } from "react"
function Home() {

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Panel de Control</h1>
                <button>
                    Cerrar Sesión
                </button>
            </header>

            <main className="dashboard-content">
                <div className="welcome-card">
                    <h2>Bienvenido al Sistema</h2>
                    <p>Has iniciado sesión correctamente. Aquí podrás gestionar tu información.</p>
                </div>
            </main>
        </div>
    )
}

export default Home;
