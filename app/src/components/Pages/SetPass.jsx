import React from 'react';
import { CircleAlert, Eye, EyeOff, CheckCircle, ArrowRight, Shield, Key, Lock } from 'lucide-react';
import { useSetPass } from '../../hooks/useSetPass';
import Logo from './../../assets/images/logo.png';
import Footer from "../Footer/Footer";
import { useNavigate } from 'react-router-dom';

function SetPass() {
    const {
        dni,
        setDni,
        tempPassword,
        setTempPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        showTempPassword,
        showNewPassword,
        showConfirmPassword,
        error,
        isLoading,
        isSuccess,
        handleSubmit,
        toggleTempPasswordVisibility,
        toggleNewPasswordVisibility,
        toggleConfirmPasswordVisibility,
        clearError,
    } = useSetPass();

    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/')
    };

    const handleEmailSupport = () => {
        const subject = encodeURIComponent("Ayuda para establecer contraseña - Portal Medinet");
        const body = encodeURIComponent(`
Hola equipo de soporte,

Necesito ayuda para establecer mi contraseña en el portal médico.

Detalles:
- DNI: ${dni || '[Por favor, incluye tu DNI aquí]'}
- Problema: No puedo establecer mi nueva contraseña
- Fecha: ${new Date().toLocaleDateString('es-ES')}
- Hora: ${new Date().toLocaleTimeString('es-ES')}

Información adicional:
        `.trim());

        window.location.href = `mailto:medinettalavera@gmail.com?subject=${subject}&body=${body}`;
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50">
                {/* Header */}
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

                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <div className="mb-6">
                            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="text-emerald-600" size={32} />
                            </div>
                            <h2 className="text-2xl font-medium text-slate-800 mb-2">
                                ¡Contraseña establecida correctamente!
                            </h2>
                            <p className="text-slate-600">
                                Tu nueva contraseña ha sido configurada exitosamente. Ya puedes acceder a tu cuenta.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={handleGoToLogin}
                                className="cursor-pointer w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                style={{ backgroundColor: "var(--primary-color)" }}
                            >
                                Iniciar Sesión
                                <ArrowRight size={18} />
                            </button>

                            
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
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

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Columna Izquierda - Información */}
                    <div className="space-y-8">
                        {/* Hero Section */}
                        <section className="text-center lg:text-left">
                            <h1 className="text-3xl text-slate-800 mb-4">
                                Establece tu <span className="font-medium" style={{ color: "var(--primary-color)" }}>Contraseña</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Configura tu nueva contraseña para acceder de forma segura a tu portal médico
                            </p>
                        </section>

                        {/* Instrucciones */}
                        <section className="bg-sky-50 p-6 rounded-xl border border-sky-100">
                            <h2 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
                                <Shield style={{ color: "var(--primary-color)" }} size={20} />
                                Instrucciones
                            </h2>
                            <div className="space-y-3 text-sm text-slate-700">
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-medium text-sky-700">1</span>
                                    </div>
                                    <p>Ingresa tu DNI registrado en el sistema</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-medium text-sky-700">2</span>
                                    </div>
                                    <p>Escribe la contraseña temporal que recibiste</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-medium text-sky-700">3</span>
                                    </div>
                                    <p>Crea una nueva contraseña segura (mínimo 6 caracteres)</p>
                                </div>
                            </div>
                        </section>

                        {/* Consejos de seguridad */}
                        <section>
                            <h2 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
                                <Key style={{ color: "var(--primary-color)" }} size={20} />
                                Consejos para una contraseña segura
                            </h2>
                            <div className="grid gap-3">
                                <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-slate-100">
                                    <Lock className="text-emerald-400 mt-1" size={16} />
                                    <div>
                                        <p className="text-sm text-slate-700">Usa al menos 6 caracteres</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-slate-100">
                                    <Lock className="text-blue-400 mt-1" size={16} />
                                    <div>
                                        <p className="text-sm text-slate-700">Combina letras, números y símbolos</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-slate-100">
                                    <Lock className="text-violet-400 mt-1" size={16} />
                                    <div>
                                        <p className="text-sm text-slate-700">Evita información personal obvia</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Columna Derecha - Formulario */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl text-slate-800 mb-2" style={{ color: "var(--primary-color)" }}>
                                    Nueva Contraseña
                                </h2>
                                <p className="text-slate-500 text-sm">
                                    Establece tu contraseña de acceso
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

                                {/* Campo Contraseña Temporal */}
                                <div>
                                    <label
                                        htmlFor="tempPassword"
                                        className="block text-sm font-medium text-slate-700 mb-2"
                                    >
                                        Contraseña Temporal
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="tempPassword"
                                            type={showTempPassword ? "text" : "password"}
                                            value={tempPassword}
                                            onChange={(e) => {
                                                setTempPassword(e.target.value);
                                                if (error) clearError();
                                            }}
                                            placeholder="Contraseña temporal recibida"
                                            required
                                            className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                        />
                                        <button
                                            type="button"
                                            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                            onClick={toggleTempPasswordVisibility}
                                        >
                                            {showTempPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Campo Nueva Contraseña */}
                                <div>
                                    <label
                                        htmlFor="newPassword"
                                        className="block text-sm font-medium text-slate-700 mb-2"
                                    >
                                        Nueva Contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="newPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                if (error) clearError();
                                            }}
                                            placeholder="Nueva contraseña (mín. 6 caracteres)"
                                            required
                                            className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                        />
                                        <button
                                            type="button"
                                            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                            onClick={toggleNewPasswordVisibility}
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Campo Confirmar Contraseña */}
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-slate-700 mb-2"
                                    >
                                        Confirmar Nueva Contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                if (error) clearError();
                                            }}
                                            placeholder="Confirme su nueva contraseña"
                                            required
                                            className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                        />
                                        <button
                                            type="button"
                                            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

                                {/* Botón de Establecer Contraseña */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="cursor-pointer w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    style={{ backgroundColor: "var(--primary-color)" }}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Estableciendo contraseña...
                                        </>
                                    ) : (
                                        <>
                                            <Shield size={18} />
                                            Establecer Contraseña
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Footer del Form */}
                            <div className="mt-6 text-center space-y-2">
                                <p className="text-xs text-slate-500">
                                    ¿Problemas para establecer tu contraseña?{' '}
                                    <button
                                        onClick={handleEmailSupport}
                                        className="cursor-pointer hover:text-sky-600 underline transition-colors"
                                        style={{ color: "var(--primary-color)" }}
                                    >
                                        Contacta con soporte
                                    </button>
                                </p>
                                <p className="text-xs text-slate-500">
                                    ¿Ya tienes contraseña?{' '}
                                    <button
                                        onClick={handleGoToLogin}
                                        className="cursor-pointer hover:text-sky-600 underline transition-colors"
                                        style={{ color: "var(--primary-color)" }}
                                    >
                                        Iniciar sesión
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default SetPass;