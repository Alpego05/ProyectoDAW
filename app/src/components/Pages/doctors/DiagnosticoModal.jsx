import React, { useState, useEffect, useContext } from 'react';
import { X, Plus, Trash2, Stethoscope, Pill, Clock, FileText, AlertCircle, ChevronDown, Search } from 'lucide-react';
import { createDiagnostico } from '../../../services/apiDiagnosticos';
import { createReceta } from '../../../services/apiRecetas';
import { MedEnfsContext } from '../../../context/MedEnfsContext';

// Componente SearchableSelect
const SearchableSelect = ({
    options = [],
    value,
    onChange,
    placeholder,
    displayField = 'nombre',
    valueField = 'id',
    disabled = false,
    required = false,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredOptions(options);
        } else {
            const filtered = options.filter(option =>
                option[displayField]?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    }, [searchTerm, options, displayField]);

    const selectedOption = options.find(option => option[valueField] === value);

    const handleSelect = (option) => {
        onChange(option[valueField]);
        setIsOpen(false);
        setSearchTerm('');
    };

    const handleClear = () => {
        onChange('');
        setSearchTerm('');
    };

    return (
        <div className={`relative ${className}`}>
            <div
                className={`w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 cursor-pointer flex items-center justify-between ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-emerald-300'
                    }`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={selectedOption ? 'text-gray-800' : 'text-gray-400'}>
                    {selectedOption ? selectedOption[displayField] : placeholder}
                </span>
                <div className="flex items-center space-x-2">
                    {selectedOption && !disabled && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClear();
                            }}
                            className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-emerald-200 rounded-xl shadow-xl max-h-60 overflow-hidden">
                    {/* Search input */}
                    <div className="p-3 border-b border-emerald-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="max-h-40 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option[valueField]}
                                    className="px-4 py-3 hover:bg-emerald-50 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                                    onClick={() => handleSelect(option)}
                                >
                                    <div className="font-medium">{option[displayField]}</div>
                                    {option.descripcion && (
                                        <div className="text-sm text-gray-500 mt-1">{option.descripcion}</div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-gray-500 text-center">
                                No se encontraron resultados
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Overlay para cerrar el dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

const DiagnosticoModal = ({
    isOpen,
    onClose,
    citaId,
    pacienteId,
    onSuccess
}) => {
    const { medicamentos, enfermedades } = useContext(MedEnfsContext);

    const [diagnosticoData, setDiagnosticoData] = useState({
        nombre: '',
        sintomas: '',
        observaciones: '',
        enfermedad_id: ''
    });

    const [recetas, setRecetas] = useState([]);
    const [showRecetas, setShowRecetas] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Resetear formulario cuando se abre/cierra el modal
    useEffect(() => {
        if (isOpen) {
            setDiagnosticoData({
                nombre: '',
                sintomas: '',
                observaciones: '',
                enfermedad_id: ''
            });
            setRecetas([]);
            setShowRecetas(false);
            setError('');
        }
    }, [isOpen]);

    const handleDiagnosticoChange = (field, value) => {
        setDiagnosticoData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRecetaChange = (index, field, value) => {
        setRecetas(prev => prev.map((receta, i) =>
            i === index ? { ...receta, [field]: value } : receta
        ));
    };

    const agregarReceta = () => {
        setRecetas(prev => [...prev, {
            medicamento_id: '',
            enfermedad_id: '',
            dosis: '',
            duracion: ''
        }]);
        setShowRecetas(true);
    };

    const eliminarReceta = (index) => {
        const nuevasRecetas = recetas.filter((_, i) => i !== index);
        setRecetas(nuevasRecetas);
        if (nuevasRecetas.length === 0) {
            setShowRecetas(false);
        }
    };

    const validarFormulario = () => {
        if (!diagnosticoData.nombre.trim()) {
            setError('El nombre del diagnóstico es obligatorio');
            return false;
        }
        if (!diagnosticoData.sintomas.trim()) {
            setError('Los síntomas son obligatorios');
            return false;
        }

        // Validar recetas solo si hay alguna
        if (recetas.length > 0) {
            const recetasIncompletas = recetas.some(receta =>
                !receta.medicamento_id || !receta.dosis || !receta.duracion
            );

            if (recetasIncompletas) {
                setError('Complete todos los campos obligatorios de las recetas o elimínelas');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const doctorId = localStorage.getItem('userId');

            if (!doctorId) {
                throw new Error('No se pudo obtener la información del doctor. Por favor, inicie sesión nuevamente.');
            }

            // Crear el diagnóstico
            const diagnosticoPayload = {
                cita_id: citaId,
                paciente_id: pacienteId,
                doctor_id: doctorId,
                enfermedad_id: diagnosticoData.enfermedad_id || null,
                nombre: diagnosticoData.nombre.trim(),
                sintomas: diagnosticoData.sintomas.trim(),
                observaciones: diagnosticoData.observaciones.trim() || null
            };

            const diagnosticoCreado = await createDiagnostico(diagnosticoPayload);

            // Crear las recetas asociadas si existen
            if (recetas.length > 0) {
                const promesasRecetas = recetas.map(receta =>
                    createReceta({
                        diagnostico_id: diagnosticoCreado.id_diagnostico,
                        medicamento_id: parseInt(receta.medicamento_id),
                        enfermedad_id: receta.enfermedad_id ? parseInt(receta.enfermedad_id) : null,
                        dosis: receta.dosis.trim(),
                        duracion: receta.duracion.trim()
                    })
                );

                await Promise.all(promesasRecetas);
            }

            // Notificar éxito y cerrar modal
            onSuccess?.();
            onClose();

        } catch (err) {
            console.error('Error al crear diagnóstico:', err);
            setError(err.message || 'Error al crear el diagnóstico');
        } finally {
            setIsLoading(false);
        }
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
                <div className="overflow-y-auto max-h-[calc(95vh-100px)] ">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Información del Diagnóstico */}
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
                                    <input
                                        type="text"
                                        value={diagnosticoData.nombre}
                                        onChange={(e) => handleDiagnosticoChange('nombre', e.target.value)}
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
                                        onChange={(value) => handleDiagnosticoChange('enfermedad_id', value)}
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
                                    <textarea
                                        value={diagnosticoData.sintomas}
                                        onChange={(e) => handleDiagnosticoChange('sintomas', e.target.value)}
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
                                    <textarea
                                        value={diagnosticoData.observaciones}
                                        onChange={(e) => handleDiagnosticoChange('observaciones', e.target.value)}
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-md focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none text-gray-800 placeholder-gray-400"
                                        rows="3"
                                        placeholder="Notas adicionales, recomendaciones o comentarios relevantes (opcional)..."
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sección de Recetas */}
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
                                        onClick={agregarReceta}
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
                                            onClick={agregarReceta}
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
                                                        onClick={() => eliminarReceta(index)}
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
                                                            onChange={(value) => handleRecetaChange(index, 'medicamento_id', value)}
                                                            placeholder="Selecciona un medicamento"
                                                            displayField="nombre"
                                                            valueField="id_medicamento"
                                                            disabled={isLoading}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Enfermedad
                                                        </label>
                                                        <SearchableSelect
                                                            options={enfermedades}
                                                            value={receta.enfermedad_id}
                                                            onChange={(value) => handleRecetaChange(index, 'enfermedad_id', value)}
                                                            placeholder="Selecciona una enfermedad (opcional)"
                                                            displayField="nombre"
                                                            valueField="id_enfermedad"
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
                                                            onChange={(e) => handleRecetaChange(index, 'dosis', e.target.value)}
                                                            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                                            placeholder="Ej: 500mg cada 8 horas"
                                                            disabled={isLoading}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Duración *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={receta.duracion}
                                                            onChange={(e) => handleRecetaChange(index, 'duracion', e.target.value)}
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