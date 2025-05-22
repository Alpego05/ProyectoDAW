import { useEffect, useState } from "react"


//FILTRO MEDICAMENTOS/ENFERMEDADES DE GLOSARIO
const useFilters = (
    medicamentos = [],
    enfermedades = [],
    searchTerm = "",
    filtroFormaMedicamento = "todas",
    filtroCategoriaMedicamento = "todas",
    filtroCategoriaEnfermedad = "todas"
) => {
    const [paginaActualMedicamentos, setPaginaActualMedicamentos] = useState(1)
    const [paginaActualEnfermedades, setPaginaActualEnfermedades] = useState(1)

    const ELEMENTOS_POR_PAGINA = 20

    //reinicia paginación para evitar detalles
    useEffect(() => {
        setPaginaActualMedicamentos(1)
    }, [searchTerm, filtroFormaMedicamento, filtroCategoriaMedicamento])

    useEffect(() => {
        setPaginaActualEnfermedades(1)
    }, [searchTerm, filtroCategoriaEnfermedad])


    //funcion que filtra los medicamentos
    const filtrarMedicamentos = () => {
        return medicamentos.filter((med) => {
            const matchesSearch = med.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesForma = filtroFormaMedicamento === "todas" || med.forma_via === filtroFormaMedicamento
            const matchesCategoria = filtroCategoriaMedicamento === "todas" || med.categoria === filtroCategoriaMedicamento
            return matchesSearch && matchesForma && matchesCategoria
        })
    }

    //lo mismo pero con enfermedades
    const filtrarEnfermedades = () => {
        return enfermedades.filter((enf) => {
            const matchesSearch =
                enf.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (enf.codigo_cie && enf.codigo_cie.toLowerCase().includes(searchTerm.toLowerCase()))
            const matchesCategoria = filtroCategoriaEnfermedad === "todas" || enf.categoria === filtroCategoriaEnfermedad
            return matchesSearch && matchesCategoria
        })
    }

    //para hacer el total de páginas
    const calcularTotalPaginas = (totalElementos) => {
        return Math.ceil(totalElementos / ELEMENTOS_POR_PAGINA)
    }

    const obtenerElementosPaginados = (elementos, paginaActual) => {
        const inicio = (paginaActual - 1) * ELEMENTOS_POR_PAGINA
        const fin = inicio + ELEMENTOS_POR_PAGINA
        return elementos.slice(inicio, fin)
    }

    const medicamentosFiltrados = filtrarMedicamentos()
    const enfermedadesFiltradas = filtrarEnfermedades()

    const medicamentosPaginados = obtenerElementosPaginados(medicamentosFiltrados, paginaActualMedicamentos)
    const enfermedadesPaginadas = obtenerElementosPaginados(enfermedadesFiltradas, paginaActualEnfermedades)

    const totalPaginasMedicamentos = calcularTotalPaginas(medicamentosFiltrados.length)
    const totalPaginasEnfermedades = calcularTotalPaginas(enfermedadesFiltradas.length)

    return {
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
        totalPaginasEnfermedades,
        calcularTotalPaginas,
        obtenerElementosPaginados
    }
}

export default useFilters