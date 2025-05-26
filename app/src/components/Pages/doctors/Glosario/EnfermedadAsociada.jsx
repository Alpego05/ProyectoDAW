import React from 'react'

const EnfermedadAsociada = ({ enfermedad }) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
            <div className="space-y-3">
                <div>
                    <h5 className="font-bold text-gray-800 text-lg mb-2">{enfermedad.nombre}</h5>
                    <p className="text-blue-600 font-semibold mb-3" style={{ color: "var(--primary-color)" }}>
                        {enfermedad.categoria}
                    </p>
                    {enfermedad.desc && (
                        <p className="text-gray-700 mb-3 leading-relaxed">{enfermedad.desc}</p>
                    )}
                    {enfermedad.sintomas && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                            <p className="text-gray-700">
                                <span className="font-semibold text-yellow-600">Síntomas:</span> {enfermedad.sintomas}
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {enfermedad.codigo_cie && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-500">
                            CIE: {enfermedad.codigo_cie}
                        </span>
                    )}
                    {enfermedad.MedicamentoEnfermedad?.eficacia && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Eficacia: {enfermedad.MedicamentoEnfermedad.eficacia}
                        </span>
                    )}
                </div>
                {enfermedad.MedicamentoEnfermedad?.dosis_recomendada && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className=" font-medium" style={{ color: "var(--primary-color)" }}>
                            <span className="font-semibold">Dosis recomendada:</span> {enfermedad.MedicamentoEnfermedad.dosis_recomendada}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EnfermedadAsociada