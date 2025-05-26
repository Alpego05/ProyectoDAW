import React from 'react'

const MedicamentoAsociado = ({ medicamento }) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
            <div className="space-y-3">
                <div>
                    <h5 className="font-bold text-gray-800 text-lg mb-2">{medicamento.nombre}</h5>
                    <p className="text-green-600 font-semibold mb-3" style={{ color: "var(--primary-color)" }}>
                        {medicamento.categoria}
                    </p>
                    {medicamento.desc && (
                        <p className="text-gray-700 mb-3 leading-relaxed">{medicamento.desc}</p>
                    )}
                    {medicamento.efectos_secundarios && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                            <p className="text-gray-700">
                                <span className="font-semibold text-red-600">Efectos secundarios:</span> {medicamento.efectos_secundarios}
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {medicamento.forma_via && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Vía: {medicamento.forma_via}
                        </span>
                    )}
                    {medicamento.MedicamentoEnfermedad?.eficacia && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Eficacia: {medicamento.MedicamentoEnfermedad.eficacia}
                        </span>
                    )}
                </div>
                {medicamento.MedicamentoEnfermedad?.dosis_recomendada && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="font-medium" style={{ color: "var(--primary-color)" }}>
                            <span className="font-semibold">Dosis recomendada:</span> {medicamento.MedicamentoEnfermedad.dosis_recomendada}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MedicamentoAsociado