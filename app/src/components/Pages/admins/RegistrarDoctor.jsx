import { UserPlus, User, Mail, CreditCard, Stethoscope, MapPin, FileText, AlertCircle, CheckCircle } from "lucide-react"
import useDoctorRegister from "../../../hooks/users/useDoctorRegister"

const RegistrarDoctor = () => {
  const { formData, loading, error, success, handleUserChange, handleDoctorChange, submitDoctor, resetForm } =
    useDoctorRegister()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await submitDoctor()
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-[#f9fafb]">
    

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <p className="text-sm text-green-700">¡Doctor registrado exitosamente!</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Datos Personales */}
            <div className="bg-white shadow-sm border border-[#e5e7eb]">
              <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-[#00629B]" />
                  <h2 className="text-lg font-semibold text-[#1f2937]">Datos Personales</h2>
                </div>
              </div>

              <div className="px-6 py-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1f2937] mb-2">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.user.nombre}
                      onChange={handleUserChange}
                      className="w-full px-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent"
                      placeholder="Ingrese el nombre"
                      disabled={loading}
                      
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1f2937] mb-2">
                        Primer Apellido <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="apellido1"
                        value={formData.user.apellido1}
                        onChange={handleUserChange}
                        className="w-full px-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent"
                        placeholder="Primer apellido"
                        disabled={loading}
                        
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f2937] mb-2">
                        Segundo Apellido <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="apellido2"
                        value={formData.user.apellido2}
                        onChange={handleUserChange}
                        className="w-full px-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent"
                        placeholder="Segundo apellido"
                        disabled={loading}
                       
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f2937] mb-2">
                      Correo Electrónico <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.user.email}
                        onChange={handleUserChange}
                        className="w-full pl-10 pr-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent"
                        placeholder="ejemplo@hospital.com"
                        disabled={loading}
                        
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f2937] mb-2">
                      DNI <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="dni"
                        value={formData.user.dni}
                        onChange={handleUserChange}
                        className="w-full pl-10 pr-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent"
                        placeholder="12345678A"
                        disabled={loading}
                        maxLength="9"
                        
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Información Profesional */}
            <div className="bg-white shadow-sm border border-[#e5e7eb]">
              <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
                <div className="flex items-center space-x-3">
                  <Stethoscope className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-[#1f2937]">Información Profesional</h2>
                </div>
              </div>

              <div className="px-6 py-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1f2937] mb-2">
                      Especialidad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="especialidad"
                      value={formData.doctor.especialidad}
                      onChange={handleDoctorChange}
                      className="w-full px-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent"
                      placeholder="Ej: Cardiología, Traumatología"
                      disabled={loading}
                      
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f2937] mb-2">
                      Sala Asignada <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="sala_asignada"
                        value={formData.doctor.sala_asignada}
                        onChange={handleDoctorChange}
                        className="w-full pl-10 pr-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent"
                        placeholder="Ej: 2A Edificio B, Consulta 15"
                        disabled={loading}
                        
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f2937] mb-2">
                      Número de Licencia <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="numero_licencia"
                        value={formData.doctor.numero_licencia}
                        onChange={handleDoctorChange}
                        className="w-full pl-10 pr-3 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent"
                        placeholder="Ej: 2334244"
                        disabled={loading}
                        
                      />
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-3">
                    <p className="text-xs text-green-800">
                      <strong>Nota:</strong> Los campos marcados con (*) son obligatorios. 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className=" px-6 py-4">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-[#4b5563] bg-white border border-[#e5e7eb] hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00629B]"
                disabled={loading}>
                Limpiar Formulario
              </button>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer group flex items-center justify-center space-x-2 bg-green-100 text-green-800 hover:bg-green-600 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-md">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Registrando...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>Registrar Doctor</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrarDoctor

