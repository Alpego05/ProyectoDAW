import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Pill, WormIcon as Virus, AlertCircle, Filter } from "lucide-react"
import { MedEnfsContext } from "../../../../context/MedEnfsContext"
import useFilters from "../../../../hooks/useFilters"
import TabMedicamentos from "./TabMedicamentos"
import TabEnfermedades from "./TabEnfermedades"
import LoadingScreen from "../../../Common/LoadingScreen"

const Glosario = () => {
  const navigate = useNavigate()
  const { medicamentos, enfermedades } = useContext(MedEnfsContext)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("medicamentos")
  const [filtroFormaMedicamento, setFiltroFormaMedicamento] = useState("todas")
  const [filtroCategoriaMedicamento, setFiltroCategoriaMedicamento] = useState("todas")
  const [filtroCategoriaEnfermedad, setFiltroCategoriaEnfermedad] = useState("todas")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const {
    paginaActualMedicamentos,
    setPaginaActualMedicamentos,
    paginaActualEnfermedades,
    setPaginaActualEnfermedades,
    ELEMENTOS_POR_PAGINA,
    medicamentosFiltrados,
    enfermedadesFiltradas,
    medicamentosPaginados,
    enfermedadesPaginadas,
    totalPaginasMedicamentos,
    totalPaginasEnfermedades
  } = useFilters(
    medicamentos,
    enfermedades,
    searchTerm,
    filtroFormaMedicamento,
    filtroCategoriaMedicamento,
    filtroCategoriaEnfermedad
  )


  const handleMedicamentoClick = (medicamento) => {
    navigate(`/Home/medicamentos/${medicamento.id_medicamento}`)
  }

  const handleEnfermedadClick = (enfermedad) => {
    navigate(`/Home/enfermedades/${enfermedad.id_enfermedad}`)
  }

  const handleTabChange = (newTab) => {
    setActiveTab(newTab)
    if (newTab === "medicamentos") {
      setFiltroFormaMedicamento("todas")
      setFiltroCategoriaMedicamento("todas")
      setPaginaActualMedicamentos(1)
    } else {
      setFiltroCategoriaEnfermedad("todas")
      setPaginaActualEnfermedades(1)
    }
  }

  // Obtener opciones de filtros
  const formasViaMedicamentos = ["todas", ...new Set(medicamentos.map((med) => med.forma_via).filter(Boolean))]
  const categoriasMedicamentos = ["todas", ...new Set(medicamentos.map((med) => med.categoria).filter(Boolean))]
  const categoriasEnfermedades = ["todas", ...new Set(enfermedades.map((enf) => enf.categoria).filter(Boolean))]

  // Función para obtener páginas visibles en paginación
  const obtenerPaginasVisibles = (paginaActual, totalPaginas) => {
    const paginas = []
    const rango = 2

    if (paginaActual > rango + 2) {
      paginas.push(1)
      if (paginaActual > rango + 3) {
        paginas.push('...')
      }
    }
    const inicio = Math.max(1, paginaActual - rango)
    const fin = Math.min(totalPaginas, paginaActual + rango)

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i)
    }

    if (paginaActual < totalPaginas - rango - 1) {
      if (paginaActual < totalPaginas - rango - 2) {
        paginas.push('...')
      }
      paginas.push(totalPaginas)
    }

    return paginas
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">

        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Glosario Médico</h2>
          <p className="text-gray-500 text-sm mt-1">
            Consulta información sobre medicamentos y enfermedades
          </p>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="p-4 border-b">
          <div className="flex flex-col gap-4">

            {/* Barra de búsqueda */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar por nombre o código CIE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4">
              {activeTab === "medicamentos" ? (
                <>
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={filtroFormaMedicamento}
                      onChange={(e) => setFiltroFormaMedicamento(e.target.value)}
                    >
                      {formasViaMedicamentos.map((option) => (
                        <option key={option} value={option}>
                          {option === "todas" ? "Todas las formas/vías" : option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={filtroCategoriaMedicamento}
                      onChange={(e) => setFiltroCategoriaMedicamento(e.target.value)}
                    >
                      {categoriasMedicamentos.map((option) => (
                        <option key={option} value={option}>
                          {option === "todas" ? "Todas las categorías" : option}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={filtroCategoriaEnfermedad}
                    onChange={(e) => setFiltroCategoriaEnfermedad(e.target.value)}
                  >
                    {categoriasEnfermedades.map((option) => (
                      <option key={option} value={option}>
                        {option === "todas" ? "Todas las categorías" : option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pestañas */}
        <div className="flex border-b">
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm ${activeTab === "medicamentos"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => handleTabChange("medicamentos")}
            style={activeTab === "medicamentos" ? { borderColor: "var(--primary-color)", color: "var(--primary-color)" } : {}}
          >
            <Pill className="h-4 w-4" />
            Medicamentos
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm ${activeTab === "enfermedades"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => handleTabChange("enfermedades")}
            style={activeTab === "enfermedades" ? { borderColor: "var(--primary-color)", color: "var(--primary-color)" } : {}}
          >
            <Virus className="h-4 w-4" />
            Enfermedades
          </button>
        </div>

        {/* Contenido principal */}
        <div className="p-4">
          {isLoading ? (
            <LoadingScreen  />
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <h3 className="text-red-800 font-medium">Error</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          ) : activeTab === "medicamentos" ? (
            <TabMedicamentos
              medicamentosFiltrados={medicamentosFiltrados}
              medicamentosPaginados={medicamentosPaginados}
              totalPaginasMedicamentos={totalPaginasMedicamentos}
              paginaActualMedicamentos={paginaActualMedicamentos}
              setPaginaActualMedicamentos={setPaginaActualMedicamentos}
              ELEMENTOS_POR_PAGINA={ELEMENTOS_POR_PAGINA}
              handleMedicamentoClick={handleMedicamentoClick}
              obtenerPaginasVisibles={obtenerPaginasVisibles}
            />
          ) : (
            <TabEnfermedades
              enfermedadesFiltradas={enfermedadesFiltradas}
              enfermedadesPaginadas={enfermedadesPaginadas}
              totalPaginasEnfermedades={totalPaginasEnfermedades}
              paginaActualEnfermedades={paginaActualEnfermedades}
              setPaginaActualEnfermedades={setPaginaActualEnfermedades}
              ELEMENTOS_POR_PAGINA={ELEMENTOS_POR_PAGINA}
              handleEnfermedadClick={handleEnfermedadClick}
              obtenerPaginasVisibles={obtenerPaginasVisibles}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Glosario