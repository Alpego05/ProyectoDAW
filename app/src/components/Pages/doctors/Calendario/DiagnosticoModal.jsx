import { useContext } from 'react';
import { X, Stethoscope, FileText, AlertCircle } from 'lucide-react';
import { MedEnfsContext } from '../../../../context/MedEnfsContext';
import { useDiagnosticoForm } from '../../../../hooks/medical/useDiagnosticoForm';
import DiagnosticoForm from './DiagnosticoForm';
import RecetaForm from './RecetaForm';


const DiagnosticoModal = ({
    isOpen,
    onClose,
    citaId,
    pacienteId,
    onSuccess
}) => {
    const { medicamentos, enfermedades } = useContext(MedEnfsContext);
    
    // Usar el hook personalizado para manejar toda la lógica del formulario
    const {
        diagnosticoData,
        recetas,
        showRecetas,
        isLoading,
        error,
        handleDiagnosticoChange,
        handleRecetaChange,
        agregarReceta,
        eliminarReceta,
        handleSubmit
    } = useDiagnosticoForm(isOpen, onSuccess, onClose);

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit(citaId, pacienteId);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-md shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
                {/* Header */}
                <div className="relative bg-blue-300 to-pink-600 px-8 py-6" style={{ backgroundColor: "var(--primary-color)" }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-md p-3">
                                <Stethoscope className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Nuevo Diagnóstico</h2>
                                <p className="text-indigo-100 text-sm mt-1">Registra el diagnóstico y tratamiento</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white hover:bg-white/20 rounded-md p-2 transition-all duration-200 cursor-pointer"
                            disabled={isLoading}
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-100px)]">
                    <form onSubmit={onSubmit} className="p-8 space-y-8">
                        {/* Formulario de Diagnóstico */}
                        <DiagnosticoForm
                            diagnosticoData={diagnosticoData}
                            enfermedades={enfermedades}
                            onDiagnosticoChange={handleDiagnosticoChange}
                            isLoading={isLoading}
                        />

                        {/* Formulario de Recetas */}
                        <RecetaForm
                            recetas={recetas}
                            showRecetas={showRecetas}
                            medicamentos={medicamentos}
                            onRecetaChange={handleRecetaChange}
                            onAgregarReceta={agregarReceta}
                            onEliminarReceta={eliminarReceta}
                            isLoading={isLoading}
                        />

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-5 flex items-start space-x-4 shadow-sm">
                                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-red-800">Error</h4>
                                    <p className="text-red-700 mt-1">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Botones */}
                        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer px-8 py-4 bg-teal-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-semibold"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Creando Diagnóstico...</span>
                                    </>
                                ) : (
                                    <>
                                        <FileText className="h-5 w-5" />
                                        <span>Crear Diagnóstico</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticoModal;