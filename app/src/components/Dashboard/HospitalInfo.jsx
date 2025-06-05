import instalaciones from "../../assets/images/instalaciones.jpg"

const HospitalInfo = () => {
    return (
        <section className=" py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--primary-color)" }}>
                        Hospital Medinet
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                        El Hospital Medinet es un centro médico de referencia, comprometido con la salud y el bienestar de nuestros
                        pacientes desde hace más de 30 años.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>Emergencias 24/7</li>
                        <li>Unidad de cuidados intensivos (UCI)</li>
                        <li>Laboratorio clínico y diagnóstico por imágenes</li>
                        <li>Atención especializada en más de 20 disciplinas médicas</li>
                    </ul>
                </div>
                <div>
                    <img
                        src={instalaciones || "/placeholder.svg"}
                        alt="Hospital"
                        className="rounded-2xl shadow-lg w-full h-auto object-cover"
                    />
                </div>
            </div>
        </section>
    )
}

export default HospitalInfo
