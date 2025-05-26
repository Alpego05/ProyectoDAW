import { ChevronLeft, ChevronRight } from "lucide-react"
import TarjetaEnfermedad from "./TarjetaEnfermedad"

const TabEnfermedades = ({
    enfermedadesFiltradas,
    enfermedadesPaginadas,
    totalPaginasEnfermedades,
    paginaActualEnfermedades,
    setPaginaActualEnfermedades,
    ELEMENTOS_POR_PAGINA,
    handleEnfermedadClick,
    obtenerPaginasVisibles
}) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                    Enfermedades ({enfermedadesFiltradas.length})
                </h3>
                {totalPaginasEnfermedades > 1 && (
                    <div className="text-sm text-gray-500">
                        Mostrando {(paginaActualEnfermedades - 1) * ELEMENTOS_POR_PAGINA + 1}-{Math.min(paginaActualEnfermedades * ELEMENTOS_POR_PAGINA, enfermedadesFiltradas.length)} de {enfermedadesFiltradas.length} resultados
                    </div>
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
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <button
                                onClick={() => setPaginaActualEnfermedades(paginaActualEnfermedades - 1)}
                                disabled={paginaActualEnfermedades === 1}
                                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${paginaActualEnfermedades === 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Anterior
                            </button>

                            <div className="flex gap-1">
                                {obtenerPaginasVisibles(paginaActualEnfermedades, totalPaginasEnfermedades).map((pagina, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof pagina === 'number' && setPaginaActualEnfermedades(pagina)}
                                        disabled={typeof pagina !== 'number'}
                                        className={`px-3 py-2 text-sm font-medium rounded-md ${pagina === paginaActualEnfermedades
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
                                onClick={() => setPaginaActualEnfermedades(paginaActualEnfermedades + 1)}
                                disabled={paginaActualEnfermedades === totalPaginasEnfermedades}
                                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${paginaActualEnfermedades === totalPaginasEnfermedades
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
                        No se encontraron enfermedades con los criterios de búsqueda aplicados
                    </p>
                </div>
            )}
        </>
    )
}

export default TabEnfermedades