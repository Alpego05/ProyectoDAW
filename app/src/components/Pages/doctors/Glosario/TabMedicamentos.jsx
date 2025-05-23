import { ChevronLeft, ChevronRight } from "lucide-react"
import TarjetaMedicamento from "./TarjetaMedicamento"

const TabMedicamentos = ({
    medicamentosFiltrados,
    medicamentosPaginados,
    totalPaginasMedicamentos,
    paginaActualMedicamentos,
    setPaginaActualMedicamentos,
    ELEMENTOS_POR_PAGINA,
    handleMedicamentoClick,
    obtenerPaginasVisibles
}) => {
    return (
        <>
            {/* Header de medicamentos */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                    Medicamentos ({medicamentosFiltrados.length})
                </h3>
                {totalPaginasMedicamentos > 1 && (
                    <div className="text-sm text-gray-500">
                        Mostrando {(paginaActualMedicamentos - 1) * ELEMENTOS_POR_PAGINA + 1}-{Math.min(paginaActualMedicamentos * ELEMENTOS_POR_PAGINA, medicamentosFiltrados.length)} de {medicamentosFiltrados.length} resultados
                    </div>
                )}
            </div>

            {medicamentosPaginados.length > 0 ? (
                <>
                    {/* Grid de medicamentos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {medicamentosPaginados.map((med) => (
                            <TarjetaMedicamento
                                key={med.id_medicamento}
                                medicamento={med}
                                onClick={() => handleMedicamentoClick(med)}
                            />
                        ))}
                    </div>

                    {/* paginación */}
                    {totalPaginasMedicamentos > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <button
                                onClick={() => setPaginaActualMedicamentos(paginaActualMedicamentos - 1)}
                                disabled={paginaActualMedicamentos === 1}
                                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${paginaActualMedicamentos === 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Anterior
                            </button>

                            <div className="flex gap-1">
                                {obtenerPaginasVisibles(paginaActualMedicamentos, totalPaginasMedicamentos).map((pagina, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof pagina === 'number' && setPaginaActualMedicamentos(pagina)}
                                        disabled={typeof pagina !== 'number'}
                                        className={`px-3 py-2 text-sm font-medium rounded-md ${pagina === paginaActualMedicamentos
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

                            <button
                                onClick={() => setPaginaActualMedicamentos(paginaActualMedicamentos + 1)}
                                disabled={paginaActualMedicamentos === totalPaginasMedicamentos}
                                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${paginaActualMedicamentos === totalPaginasMedicamentos
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Siguiente
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">
                        No se encontraron medicamentos con los criterios de búsqueda aplicados
                    </p>
                </div>
            )}
        </>
    )
}

export default TabMedicamentos