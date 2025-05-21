"use client"

import { useState, useEffect } from "react"
import { Search, Pill, WormIcon as Virus, AlertCircle, Filter } from 'lucide-react'
import LoadingSpinner from "../../Common/LoadingSpinner"
import { getAllMedicamentos } from "../../../services/apiEnfMed"
import { getAllEnfermedades } from "../../../services/apiEnfMed"

const Glosario = () => {
  const [medicamentos, setMedicamentos] = useState([])
  const [enfermedades, setEnfermedades] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("medicamentos")
  const [filtroCategoria, setFiltroCategoria] = useState("todas")

  //datos de medicamentos y enfermedades
  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [medicamentosData, enfermedadesData] = await Promise.all([
        getAllMedicamentos(),
        getAllEnfermedades(),
      ])

      setMedicamentos(medicamentosData)
      setEnfermedades(enfermedadesData)
    } catch (err) {
      console.error("Error al cargar datos del glosario:", err)
      setError(err instanceof Error ? err.message : "Error desconocido al cargar datos")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  //  medicamentos según búsqueda y categoría
  const medicamentosFiltrados = medicamentos.filter((med) => {
    const matchesSearch = med.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())

    if (filtroCategoria === "todas") {
      return matchesSearch
    } else {
      return matchesSearch && med.categoria === filtroCategoria
    }
  })

  // búsqueda
  const enfermedadesFiltradas = enfermedades.filter((enf) =>
    enf.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enf.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //  categorías
  const categoriasMedicamentos = ["todas", ...new Set(medicamentos.map(med => med.categoria).filter(Boolean))]

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Glosario Médico</h2>
          <p className="text-gray-500 text-sm mt-1">Consulta información sobre medicamentos y enfermedades</p>
        </div>

        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {activeTab === "medicamentos" && (
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                  {categoriasMedicamentos.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "todas" ? "Todas las categorías" : cat}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Pestañas */}
        <div className="flex border-b">
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm ${activeTab === "medicamentos"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab("medicamentos")}
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
            onClick={() => setActiveTab("enfermedades")}
            style={activeTab === "enfermedades" ? { borderColor: "var(--primary-color)", color: "var(--primary-color)" } : {}}
          >
            <Virus className="h-4 w-4" />
            Enfermedades
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4">
          {isLoading ? (
            <LoadingSpinner message="Cargando datos del glosario..." />
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
            <>
              <h3 className="text-lg font-medium mb-4">Medicamentos ({medicamentosFiltrados.length})</h3>
              {medicamentosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {medicamentosFiltrados.map((med) => (
                    <div key={med.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-blue-100 mr-3">
                          <Pill className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{med.nombre}</h4>
                          <p className="text-sm text-gray-500 mt-1">{med.categoria || "Sin categoría"}</p>
                          <p className="text-sm mt-2">{med.descripcion || "Sin descripción disponible"}</p>
                          {med.dosis_recomendada && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Dosis recomendada:</span> {med.dosis_recomendada}
                            </p>
                          )}
                          {med.efectos_secundarios && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Efectos secundarios:</span> {med.efectos_secundarios}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No se encontraron medicamentos con los criterios de búsqueda</p>
                </div>
              )}
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-4">Enfermedades ({enfermedadesFiltradas.length})</h3>
              {enfermedadesFiltradas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enfermedadesFiltradas.map((enf) => (
                    <div key={enf.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-red-100 mr-3">
                          <Virus className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{enf.nombre}</h4>
                          <p className="text-sm text-gray-500 mt-1">{enf.tipo || "Sin clasificación"}</p>
                          <p className="text-sm mt-2">{enf.descripcion || "Sin descripción disponible"}</p>
                          {enf.sintomas && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Síntomas:</span> {enf.sintomas}
                            </p>
                          )}
                          {enf.tratamiento && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Tratamiento:</span> {enf.tratamiento}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No se encontraron enfermedades con los criterios de búsqueda</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Glosario
