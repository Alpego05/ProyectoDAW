import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Pill, WormIcon as Virus, AlertCircle, Filter, ChevronRight, ChevronLeft } from "lucide-react"
import LoadingSpinner from "../../Common/LoadingSpinner"
import useMedicamentos from "../../../hooks/useMedicamentos"
import useFilters from "../../../hooks/useFilters"

const Glosario = () => {
  const navigate = useNavigate()
  const { medicamentos, enfermedades, isLoading, error, cargarDatosIniciales } = useMedicamentos()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("medicamentos")
  const [filtroFormaMedicamento, setFiltroFormaMedicamento] = useState("todas")
  const [filtroCategoriaMedicamento, setFiltroCategoriaMedicamento] = useState("todas")
  const [filtroCategoriaEnfermedad, setFiltroCategoriaEnfermedad] = useState("todas")

  // Use the useFilters hook
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

  useEffect(() => {
    cargarDatosIniciales()
  }, [])

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

  // Functions to get filter options (kept in Glosario as requested)
  const getFormasViaMedicamentos = () => {
    return ["todas", ...new Set(medicamentos.map((med) => med.forma_via).filter(Boolean))]
  }

  const getCategoriasMedicamentos = () => {
    return ["todas", ...new Set(medicamentos.map((med) => med.categoria).filter(Boolean))]
  }

  const getCategoriasEnfermedades = () => {
    return ["todas", ...new Set(enfermedades.map((enf) => enf.categoria).filter(Boolean))]
  }

  // Renderizado condicional del contenido principal
  const renderContenido = () => {
    if (isLoading) {
      return <LoadingSpinner message="Cargando datos del glosario..." />
    }

    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )
    }

    return activeTab === "medicamentos" ? renderMedicamentos() : renderEnfermedades()
  }

  const renderMedicamentos = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          Medicamentos ({medicamentosFiltrados.length})
        </h3>
        {totalPaginasMedicamentos > 1 && (
          <InfoPaginacion
            paginaActual={paginaActualMedicamentos}
            totalPaginas={totalPaginasMedicamentos}
            totalElementos={medicamentosFiltrados.length}
            elementosPorPagina={ELEMENTOS_POR_PAGINA}
          />
        )}
      </div>

      {medicamentosPaginados.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicamentosPaginados.map((med) => (
              <TarjetaMedicamento
                key={med.id_medicamento}
                medicamento={med}
                onClick={() => handleMedicamentoClick(med)}
              />
            ))}
          </div>

          {totalPaginasMedicamentos > 1 && (
            <Paginacion
              paginaActual={paginaActualMedicamentos}
              totalPaginas={totalPaginasMedicamentos}
              onCambioPagina={setPaginaActualMedicamentos}
            />
          )}
        </>
      ) : (
        <MensajeSinResultados tipo="medicamentos" />
      )}
    </>
  )

  const renderEnfermedades = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          Enfermedades ({enfermedadesFiltradas.length})
        </h3>
        {totalPaginasEnfermedades > 1 && (
          <InfoPaginacion
            paginaActual={paginaActualEnfermedades}
            totalPaginas={totalPaginasEnfermedades}
            totalElementos={enfermedadesFiltradas.length}
            elementosPorPagina={ELEMENTOS_POR_PAGINA}
          />
        )}
      </div>

      {enfermedadesPaginadas.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enfermedadesPaginadas.map((enf) => (
              <TarjetaEnfermedad
                key={enf.id_enfermedad}
                enfermedad={enf}
                onClick={() => handleEnfermedadClick(enf)}
              />
            ))}
          </div>

          {totalPaginasEnfermedades > 1 && (
            <Paginacion
              paginaActual={paginaActualEnfermedades}
              totalPaginas={totalPaginasEnfermedades}
              onCambioPagina={setPaginaActualEnfermedades}
            />
          )}
        </>
      ) : (
        <MensajeSinResultados tipo="enfermedades" />
      )}
    </>
  )

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        {/* Header */}
        <EncabezadoGlosario />

        {/* barra de busqueda y filtros */}
        <div className="p-4 border-b">
          <div className="flex flex-col gap-4">
            {/* Barra de búsqueda */}
            <BarraBusqueda searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Filtros */}
            <FiltrosGlosario
              activeTab={activeTab}
              filtroFormaMedicamento={filtroFormaMedicamento}
              setFiltroFormaMedicamento={setFiltroFormaMedicamento}
              filtroCategoriaMedicamento={filtroCategoriaMedicamento}
              setFiltroCategoriaMedicamento={setFiltroCategoriaMedicamento}
              filtroCategoriaEnfermedad={filtroCategoriaEnfermedad}
              setFiltroCategoriaEnfermedad={setFiltroCategoriaEnfermedad}
              formasViaMedicamentos={getFormasViaMedicamentos()}
              categoriasMedicamentos={getCategoriasMedicamentos()}
              categoriasEnfermedades={getCategoriasEnfermedades()}
            />
          </div>
        </div>

        {/* Pestañas */}
        <PagGlosario activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Contenido principal */}
        <div className="p-4">
          {renderContenido()}
        </div>
      </div>
    </div>
  )
}

const EncabezadoGlosario = () => (
  <div className="p-4 border-b">
    <h2 className="text-xl font-semibold">Glosario Médico</h2>
    <p className="text-gray-500 text-sm mt-1">
      Consulta información sobre medicamentos y enfermedades
    </p>
  </div>
)

const BarraBusqueda = ({ searchTerm, setSearchTerm }) => (
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
)

const FiltrosGlosario = ({
  activeTab,
  filtroFormaMedicamento,
  setFiltroFormaMedicamento,
  filtroCategoriaMedicamento,
  setFiltroCategoriaMedicamento,
  filtroCategoriaEnfermedad,
  setFiltroCategoriaEnfermedad,
  formasViaMedicamentos,
  categoriasMedicamentos,
  categoriasEnfermedades
}) => (
  <div className="flex flex-col md:flex-row gap-4">
    {activeTab === "medicamentos" ? (
      <>
        <FiltroSelect
          icon={<Filter className="h-5 w-5 text-gray-400" />}
          value={filtroFormaMedicamento}
          onChange={setFiltroFormaMedicamento}
          options={formasViaMedicamentos}
          placeholder="Todas las formas/vías"
          label="forma"
        />
        <FiltroSelect
          icon={<Filter className="h-5 w-5 text-gray-400" />}
          value={filtroCategoriaMedicamento}
          onChange={setFiltroCategoriaMedicamento}
          options={categoriasMedicamentos}
          placeholder="Todas las categorías"
          label="categoria"
        />
      </>
    ) : (
      <FiltroSelect
        icon={<Filter className="h-5 w-5 text-gray-400" />}
        value={filtroCategoriaEnfermedad}
        onChange={setFiltroCategoriaEnfermedad}
        options={categoriasEnfermedades}
        placeholder="Todas las categorías"
        label="categoria"
      />
    )}
  </div>
)

const FiltroSelect = ({ icon, value, onChange, options, placeholder, label }) => (
  <div className="flex items-center gap-2">
    {icon}
    <select
      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option === "todas" ? placeholder : option}
        </option>
      ))}
    </select>
  </div>
)

const PagGlosario = ({ activeTab, onTabChange }) => (
  <div className="flex border-b">
    <PagBoton
      isActive={activeTab === "medicamentos"}
      onClick={() => onTabChange("medicamentos")}
      icon={<Pill className="h-4 w-4" />}
      label="Medicamentos"
    />
    <PagBoton
      isActive={activeTab === "enfermedades"}
      onClick={() => onTabChange("enfermedades")}
      icon={<Virus className="h-4 w-4" />}
      label="Enfermedades"
    />
  </div>
)

const PagBoton = ({ isActive, onClick, icon, label }) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 font-medium text-sm ${isActive
      ? "border-b-2 border-blue-500 text-blue-600"
      : "text-gray-500 hover:text-gray-700"
      }`}
    onClick={onClick}
    style={isActive ? { borderColor: "var(--primary-color)", color: "var(--primary-color)" } : {}}
  >
    {icon}
    {label}
  </button>
)

const TarjetaMedicamento = ({ medicamento, onClick }) => (
  <div
    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start">
      <div className="p-2 rounded-full bg-blue-100 mr-3">
        <Pill className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium">{medicamento.nombre}</h4>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 mt-1">{medicamento.categoria || "Sin categoría"}</p>
        <p className="text-sm mt-2 line-clamp-2">{medicamento.desc || "Sin descripción disponible"}</p>
        <div className="mt-2 flex items-center">
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
            {medicamento.forma_via || "No especificada"}
          </span>
        </div>
        <p className="text-xs text-blue-600 mt-2 flex items-center">
          Ver eficacia y detalles
          <ChevronRight className="h-3 w-3 ml-1" />
        </p>
      </div>
    </div>
  </div>
)

const TarjetaEnfermedad = ({ enfermedad, onClick }) => (
  <div
    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start">
      <div className="p-2 rounded-full bg-red-100 mr-3">
        <Virus className="h-5 w-5 text-red-600" />
      </div>
      <div>
        <div className="flex justify-between items-start">
          <h4 className="font-medium">{enfermedad.nombre}</h4>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center mt-1">
          <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">
            CIE: {enfermedad.codigo_cie}
          </span>
        </div>
        <p className="text-sm mt-2">{enfermedad.desc || "Sin descripción disponible"}</p>
        {enfermedad.sintomas && (
          <p className="text-sm mt-2">
            <span className="font-medium">Síntomas:</span> {enfermedad.sintomas}
          </p>
        )}
        <p className="text-xs text-red-600 mt-2 flex items-center">
          Ver detalles completos
          <ChevronRight className="h-3 w-3 ml-1" />
        </p>
      </div>
    </div>
  </div>
)

const MensajeSinResultados = ({ tipo }) => (
  <div className="text-center p-8 bg-gray-50 rounded-lg">
    <p className="text-gray-500">
      No se encontraron {tipo} con los criterios de búsqueda aplicados
    </p>
  </div>
)

// Componente de información de paginación
const InfoPaginacion = ({ paginaActual, totalPaginas, totalElementos, elementosPorPagina }) => {
  const inicio = (paginaActual - 1) * elementosPorPagina + 1
  const fin = Math.min(paginaActual * elementosPorPagina, totalElementos)

  return (
    <div className="text-sm text-gray-500">
      Mostrando {inicio}-{fin} de {totalElementos} resultados
    </div>
  )
}

// Componente de paginación
const Paginacion = ({ paginaActual, totalPaginas, onCambioPagina }) => {
  const obtenerPaginasVisibles = () => {
    const paginas = []
    const rango = 2 // Páginas a mostrar a cada lado de la actual

    // Siempre mostrar primera página
    if (paginaActual > rango + 2) {
      paginas.push(1)
      if (paginaActual > rango + 3) {
        paginas.push('...')
      }
    }

    // Páginas alrededor de la actual
    const inicio = Math.max(1, paginaActual - rango)
    const fin = Math.min(totalPaginas, paginaActual + rango)

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i)
    }

    // Siempre mostrar última página
    if (paginaActual < totalPaginas - rango - 1) {
      if (paginaActual < totalPaginas - rango - 2) {
        paginas.push('...')
      }
      paginas.push(totalPaginas)
    }

    return paginas
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Botón anterior */}
      <button
        onClick={() => onCambioPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${paginaActual === 1
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100'
          }`}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </button>

      {/* Números de página */}
      <div className="flex gap-1">
        {obtenerPaginasVisibles().map((pagina, index) => (
          <button
            key={index}
            onClick={() => typeof pagina === 'number' && onCambioPagina(pagina)}
            disabled={typeof pagina !== 'number'}
            className={`px-3 py-2 text-sm font-medium rounded-md ${pagina === paginaActual
              ? 'bg-blue-600 text-white'
              : typeof pagina === 'number'
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-gray-400 cursor-default'
              }`}
          >
            {pagina}
          </button>
        ))}
      </div>

      {/* Botón siguiente */}
      <button
        onClick={() => onCambioPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${paginaActual === totalPaginas
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100'
          }`}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export default Glosario