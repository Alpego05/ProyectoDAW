import { CircleAlert, Eye, EyeOff, Heart, Users, Award, Clock, MapPin, Phone, Mail, Shield, Star, Activity } from 'lucide-react';
import { useLogin } from '../../hooks/useLogin';
import Logo from './../../assets/images/logo.png';
import Footer from "../Footer/Footer";

function Login() {
    const {
        dni,
        setDni,
        clave,
        setClave,
        showPassword,
        error,
        isLoading,
        handleSubmit,
        togglePasswordVisibility,
        clearError
    } = useLogin();

    // Función para manejar el soporte por email
    const handleEmailSupport = () => {
        const subject = encodeURIComponent("Ayuda con acceso - Portal Medinet");
        const body = encodeURIComponent(`
Hola equipo de soporte,

Necesito ayuda para acceder a mi cuenta del portal médico.

Detalles:
- DNI: ${dni || '[Por favor, incluye tu DNI aquí]'}
- Problema: No puedo iniciar sesión
- Fecha: ${new Date().toLocaleDateString('es-ES')}
- Hora: ${new Date().toLocaleTimeString('es-ES')}

Información adicional:
        `.trim());

        window.location.href = `mailto:medinettalavera@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header simplificado */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="logo-area">
                            <div className="logo-wrapper">
                                <img src={Logo} alt="Medinet Logo" className="logo-image" />
                            </div>
                            <div className="brand-text">
                                <h1>Medinet</h1>
                                <span>Centro Médico</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Columna Izquierda - Información simplificada */}
                    <div className="space-y-8">
                        {/* Hero Section */}
                        <section className="text-center lg:text-left">
                            <h1 className="text-3xl text-slate-800 mb-4">
                                Bienvenido a <span className="font-medium" style={{ color: "var(--primary-color)" }}>Medinet</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Atención médica de calidad con más de 50 años de experiencia
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                                <div className="flex items-center space-x-2 bg-sky-50 px-3 py-2 rounded-lg border border-sky-100">
                                    <Award size={16} style={{ color: "var(--primary-color)" }} />
                                    <span className="text-sm" style={{ color: "var(--primary-color)" }}>Acreditado JCI</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                                    <Shield className="text-emerald-500" size={16} />
                                    <span className="text-emerald-700 text-sm">ISO 9001</span>
                                </div>
                            </div>
                        </section>

                        {/* Estadísticas simplificadas */}
                        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-white rounded-xl border border-slate-100">
                                <Users className="mx-auto mb-3" style={{ color: "var(--primary-color)" }} size={24} />
                                <div className="text-xl font-medium text-slate-800">250+</div>
                                <div className="text-sm text-slate-500">Profesionales</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl border border-slate-100">
                                <Heart className="mx-auto mb-3 text-rose-400" size={24} />
                                <div className="text-xl font-medium text-slate-800">50K+</div>
                                <div className="text-sm text-slate-500">Pacientes/año</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl border border-slate-100">
                                <Activity className="mx-auto mb-3 text-emerald-400" size={24} />
                                <div className="text-xl font-medium text-slate-800">30+</div>
                                <div className="text-sm text-slate-500">Especialidades</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl border border-slate-100">
                                <Clock className="mx-auto mb-3 text-violet-400" size={24} />
                                <div className="text-xl font-medium text-slate-800">24/7</div>
                                <div className="text-sm text-slate-500">Urgencias</div>
                            </div>
                        </section>

                        {/* Servicios simplificados */}
                        <section>
                            <h2 className="text-xl font-medium text-slate-800 mb-4">Servicios Principales</h2>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-slate-100">
                                    <Heart className="text-rose-400 mt-1" size={18} />
                                    <div>
                                        <h3 className="font-medium text-slate-800">Cardiología</h3>
                                        <p className="text-sm text-slate-600">Cuidado cardiovascular especializado</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-slate-100">
                                    <Activity className="mt-1" size={18} style={{ color: "var(--primary-color)" }} />
                                    <div>
                                        <h3 className="font-medium text-slate-800">Neurología</h3>
                                        <p className="text-sm text-slate-600">Atención del sistema nervioso</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-slate-100">
                                    <Users className="text-emerald-400 mt-1" size={18} />
                                    <div>
                                        <h3 className="font-medium text-slate-800">Pediatría</h3>
                                        <p className="text-sm text-slate-600">Cuidado integral infantil</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-slate-100">
                                    <Shield className="text-violet-400 mt-1" size={18} />
                                    <div>
                                        <h3 className="font-medium text-slate-800">Cirugía</h3>
                                        <p className="text-sm text-slate-600">Procedimientos especializados</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contacto simplificado */}
                        <section className="bg-sky-50 p-6 rounded-xl border border-sky-100">
                            <h2 className="text-lg font-medium text-slate-800 mb-4">Contacto</h2>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <MapPin style={{ color: "var(--primary-color)" }} size={16} />
                                    <span className="text-slate-700 text-sm">Talavera de la Reina, Toledo</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone style={{ color: "var(--primary-color)" }} size={16} />
                                    <span className="text-slate-700 text-sm">+34 666 666 666</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail style={{ color: "var(--primary-color)" }} size={16} />
                                    <span className="text-slate-700 text-sm">medinettalavera@gmail.com</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Columna Derecha - Formulario simplificado */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl text-slate-800 mb-2" style={{ color: "var(--primary-color)" }}>
                                    Iniciar Sesión
                                </h2>
                                <p className="text-slate-500 text-sm">
                                    Accede a tu portal médico
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Campo DNI */}
                                <div>
                                    <label
                                        htmlFor="dni"
                                        className="block text-sm font-medium text-slate-700 mb-2"
                                    >
                                        DNI
                                    </label>
                                    <input
                                        id="dni"
                                        type="text"
                                        value={dni}
                                        onChange={(e) => {
                                            setDni(e.target.value);
                                            if (error) clearError();
                                        }}
                                        placeholder="Ingrese su DNI"
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                    />
                                </div>

                                {/* Campo Contraseña */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-slate-700 mb-2"
                                    >
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={clave}
                                            onChange={(e) => {
                                                setClave(e.target.value);
                                                if (error) clearError();
                                            }}
                                            placeholder="Ingrese su contraseña"
                                            required
                                            className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                        />
                                        <button
                                            type="button"
                                            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Mensaje de Error */}
                                {error && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <CircleAlert className="text-red-500 flex-shrink-0" size={16} />
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                )}

                                {/* Botón de Login */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="cursor-pointer w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    style={{ backgroundColor: "var(--primary-color)" }}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        "Iniciar Sesión"
                                    )}
                                </button>
                            </form>

                            {/* Footer del Form */}
                            <div className="mt-6 text-center">
                                <p className="text-xs text-slate-500">
                                    ¿Problemas para acceder?{' '}
                                    <button
                                        onClick={handleEmailSupport}
                                        className="cursor-pointer hover:text-sky-600 underline transition-colors"
                                        style={{ color: "var(--primary-color)" }}
                                    >
                                        ¿Necesitas ayuda? Escríbenos
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* Testimonio simplificado */}
                        <div className="mt-6 bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-xl border border-sky-100">
                            <div className="flex items-center space-x-2 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="text-amber-400 fill-current" size={14} />
                                ))}
                                <span className="text-sm text-slate-600">4.8/5</span>
                            </div>
                            <p className="text-sm text-slate-700 italic">
                                "Excelente atención y tecnología avanzada."
                            </p>
                            <p className="text-xs text-slate-500 mt-2">- Abraham Mateo</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Login;