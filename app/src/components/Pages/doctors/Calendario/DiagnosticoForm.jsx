import { FileText } from 'lucide-react';
import SearchableSelect from '../../../Common/SeachSelect';

const DiagnosticoForm = ({
    diagnosticoData,
    enfermedades,
    onDiagnosticoChange,
    isLoading
}) => {
    return (
        <div className="bg-white rounded-md p-8 shadow-lg border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 rounded-md p-2">
                    <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Información del Diagnóstico</h3>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Nombre del Diagnóstico *
                    </label>
                    <input type="text"value={diagnosticoData.nombre}
                        onChange={(e) => onDiagnosticoChange('nombre', e.target.value)}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-md focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                        placeholder="Ej: Hipertensión arterial, Diabetes tipo 2..."
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Enfermedad Asociada
                    </label>
                    <SearchableSelect
                        options={enfermedades}
                        value={diagnosticoData.enfermedad_id}
                        onChange={(value) => onDiagnosticoChange('enfermedad_id', value)}
                        placeholder="Selecciona una enfermedad (opcional)"
                        displayField="nombre"
                        valueField="id_enfermedad"
                        disabled={isLoading}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Síntomas Observados *
                    </label>
                    <textarea value={diagnosticoData.sintomas} onChange={(e) => onDiagnosticoChange('sintomas', e.target.value)}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-md focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none text-gray-800 placeholder-gray-400" 
                        rows="4"
                        placeholder="Describe detalladamente los síntomas que presenta el paciente..."
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Observaciones Adicionales
                    </label>
                    <textarea value={diagnosticoData.observaciones} onChange={(e) => onDiagnosticoChange('observaciones', e.target.value)}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-md focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none text-gray-800 placeholder-gray-400"
                        rows="3"
                        placeholder="Notas adicionales, recomendaciones o comentarios relevantes (opcional)..."
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default DiagnosticoForm;