import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Pill, WormIcon as Virus, AlertCircle, Filter, ChevronRight, ChevronLeft } from "lucide-react"
import LoadingSpinner from "../../../Common/LoadingSpinner"
import useMedicamentos from "../../../../hooks/useMedicamentos"
import useFilters from "../../../../hooks/useFilters"
import TarjetaMedicamento from "./TarjetaMedicamento"
import TarjetaEnfermedad from "./TarjetaEnfermedad"

const Glosario = () => {
  const navigate = useNavigate()
  const { medicamentos, enfermedades, isLoading, error, cargarDatosIniciales } = useMedicamentos()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("medicamentos")
  const [filtroForma, setFiltroForma] = useState("todas")
  const [filtroCatMed, setFiltroCatMed] = useState("todas")
  const [filtroCatEnf, setFiltroCatEnf] = useState("todas")

  const {
    paginaActualMedicamentos,
    setPaginaActualMedicamentos,
    paginaActualEnfermedades,
    setPaginaActualEnfermedades,
    ELEMENTOS_POR_PAGINA,
    medicamentosFiltrados,
    enfermedadesFiltradas,
    medicamentosPaginados,
    enfermedadesPaginados,
    totalPaginasMedicamentos,
    totalPaginasEnfermedades
  } = useFilters(
    medicamentos,
    enfermedades,
    searchTerm,
    filtroForma,
    filtroCatMed,
    filtroCatEnf
  )

  useEffect(() => {
    cargarDatosIniciales()
  }, [])

  const formas = ["todas", ...new Set(medicamentos.map(m => m.forma_via).filter(Boolean))]
  const catMed = ["todas", ...new Set(medicamentos.map(m => m.categoria).filter(Boolean))]
  const catEnf = ["todas", ...new Set(enfermedades.map(e => e.categoria).filter(Boolean))]

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        {/* Encabezado */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Glosario Médico</h2>
          <p className="text-gray-500 text-sm mt-1">
            Consulta información sobre medicamentos y enfermedades
          </p>
        </div>

        {/* Buscador y filtros */}
        <div className="p-4 border-b space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border rounded-md shadow-sm"
              placeholder="Buscar por nombre o CIE..."
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            {activeTab === "medicamentos" ? (
              <>
                <select value={filtroForma} onChange={(e) => setFiltroForma(e.target.value)} className="border rounded-md p-2">
                  {formas.map((op) => <option key={op} value={op}>{op === "todas" ? "Todas las formas/vías" : op}</option>)}
                </select>
                <select value={filtroCatMed} onChange={(e) => setFiltroCatMed(e.target.value)} className="border rounded-md p-2">
                  {catMed.map((op) => <option key={op} value={op}>{op === "todas" ? "Todas las categorías" : op}</option>)}
                </select>
              </>
            ) : (
              <select value={filtroCatEnf} onChange={(e) => setFiltroCatEnf(e.target.value)} className="border rounded-md p-2">
                {catEnf.map((op) => <option key={op} value={op}>{op === "todas" ? "Todas las categorías" : op}</option>)}
              </select>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => { setActiveTab("medicamentos"); setFiltroForma("todas"); setFiltroCatMed("todas"); setPaginaActualMedicamentos(1) }}
            className={`px-4 py-2 font-medium text-sm ${activeTab === "medicamentos" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          >
            <Pill className="inline h-4 w-4 mr-1" /> Medicamentos
          </button>
          <button
            onClick={() => { setActiveTab("enfermedades"); setFiltroCatEnf("todas"); setPaginaActualEnfermedades(1) }}
            className={`px-4 py-2 font-medium text-sm ${activeTab === "enfermedades" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          >
            <Virus className="inline h-4 w-4 mr-1" /> Enfermedades
          </button>
        </div>

        {/* Contenido principal */}
        <div className="p-4">
          {isLoading ? (
            <LoadingSpinner message="Cargando datos del glosario..." />
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          ) : activeTab === "medicamentos" ? (
            <>
              <h3 className="text-lg font-medium mb-4">Medicamentos ({medicamentosFiltrados.length})</h3>
              {medicamentosPaginados.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {medicamentosPaginados.map(med => (
                      <TarjetaMedicamento
                        key={med.id_medicamento}
                        medicamento={med}
                        onClick={() => navigate(`/Home/medicamentos/${med.id_medicamento}`)}
                      />
                    ))}
                  </div>
                  {/* Aquí puedes incluir la paginación simplificada si quieres */}
                </>
              ) : (
                <p className="text-gray-500 text-center mt-8">No se encontraron medicamentos</p>
              )}
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-4">Enfermedades ({enfermedadesFiltradas.length})</h3>
              {enfermedadesPaginados.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enfermedadesPaginados.map(enf => (
                      <TarjetaEnfermedad
                        key={enf.id_enfermedad}
                        enfermedad={enf}
                        onClick={() => navigate(`/Home/enfermedades/${enf.id_enfermedad}`)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-center mt-8">No se encontraron enfermedades</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Glosario
