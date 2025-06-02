import { Plus, Trash2, Pill, Clock } from 'lucide-react';
import SearchableSelect from '../../../Common/SeachSelect';

const RecetaForm = ({
    recetas,
    showRecetas,
    medicamentos,
    onRecetaChange,
    onAgregarReceta,
    onEliminarReceta,
    isLoading
}) => {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 rounded-xl p-2">
                        <Pill className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Recetas Médicas</h3>
                    </div>
                </div>

                {!showRecetas && (
                    <button
                        type="button"
                        onClick={onAgregarReceta}
                        className="cursor-pointer flex items-center space-x-3 bg-teal-500 text-white px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        disabled={isLoading}
                    >
                        <Plus className="h-5 w-5" />
                        <span className="font-semibold">Agregar Receta</span>
                    </button>
                )}
            </div>

            {showRecetas && (
                <>
                    <div className="flex items-center justify-between mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                        <div className="flex items-center text-emerald-700">
                            <Clock className="h-5 w-5 mr-2" />
                            <span className="font-medium">Recetas activas: {recetas.length}</span>
                        </div>
                        <button
                            type="button"
                            onClick={onAgregarReceta}
                            className="cursor-pointer flex items-center space-x-3 bg-teal-500 text-white px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            disabled={isLoading}
                        >
                            <Plus className="h-4 w-4" />
                            <span>Agregar Otra</span>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {recetas.map((receta, index) => (
                            <div key={index} className="bg-teal-50 rounded-2xl p-6 border-2 border-emerald-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-emerald-600 text-white rounded-xl px-3 py-1 text-sm font-bold">
                                            #{index + 1}
                                        </div>
                                        <h4 className="font-bold text-gray-800">Receta Médica</h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onEliminarReceta(index)}
                                        className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all duration-200"
                                        disabled={isLoading}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Medicamento *
                                        </label>
                                        <SearchableSelect
                                            options={medicamentos}
                                            value={receta.medicamento_id}
                                            onChange={(value) => onRecetaChange(index, 'medicamento_id', value)}
                                            placeholder="Selecciona un medicamento"
                                            displayField="nombre"
                                            valueField="id_medicamento"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Dosis *
                                        </label>
                                        <input
                                            type="text"
                                            value={receta.dosis}
                                            onChange={(e) => onRecetaChange(index, 'dosis', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                            placeholder="Ej: 500mg cada 8 horas"
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Duración *
                                        </label>
                                        <input
                                            type="text"
                                            value={receta.duracion}
                                            onChange={(e) => onRecetaChange(index, 'duracion', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                            placeholder="Ej: 7 días, 2 semanas"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default RecetaForm;