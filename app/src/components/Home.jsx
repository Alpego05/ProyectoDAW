import Header from "./Header"
import Footer from "./Footer"
import "./Home.css"

function Home() {
    return (
        <div className="app">
            <Header />

            <main className="main-content">
                <section className="hero">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Cuidamos de su salud con excelencia y calidez</h1>
                            <p>
                                En Medinet nos dedicamos a brindar atención médica de calidad con tecnología de vanguardia y un equipo
                                de profesionales altamente calificados.
                            </p>
                            <div className="hero-buttons">
                                <button className="btn-primary">Solicitar Cita</button>
                                <button className="btn-secondary">Conocer Servicios</button>
                            </div>
                        </div>
                        <div className="hero-image">
                            {/* Placeholder para imagen */}
                            <img src="/placeholder.svg?height=400&width=500&text=Imagen+Principal" alt="Médicos de Medinet" />
                        </div>
                    </div>
                </section>

                {/* Aquí iría el resto del contenido */}
                <div className="placeholder-content">
                    <p>Contenido principal de la página...</p>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Home
