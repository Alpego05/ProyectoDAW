import { useState, useEffect } from 'react';
import { createDiagnostico } from '../../services/apiDiagnosticos';
import { createReceta } from '../../services/apiRecetas';

export const useDiagnosticoForm = (isOpen, onSuccess, onClose) => {
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

    const handleSubmit = async (citaId, pacienteId) => {
        if (!validarFormulario()) {
            return false;
        }

        setIsLoading(true);
        setError('');

        try {
            // Obtener el doctor_id del localStorage
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
            console.log('Diagnóstico creado:', diagnosticoCreado);

            // Crear las recetas asociadas si existen
            if (recetas.length > 0) {
                const promesasRecetas = recetas.map(receta => {
                    const recetaPayload = {
                        diagnostico_id: diagnosticoCreado.id_diagnostico,
                        id_paciente: pacienteId, 
                        medicamento_id: parseInt(receta.medicamento_id),
                        dosis: receta.dosis.trim(),
                        duracion: receta.duracion.trim()
                    };
                    
                    console.log('Creando receta con payload:', recetaPayload);
                    return createReceta(recetaPayload);
                });

                const recetasCreadas = await Promise.all(promesasRecetas);
                console.log('Recetas creadas:', recetasCreadas);
            }

            // Notificar éxito y cerrar modal
            onSuccess?.();
            onClose();
            return true;

        } catch (err) {
            console.error('Error al crear diagnóstico:', err);
            setError(err.message || 'Error al crear el diagnóstico');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        // Estados
        diagnosticoData,
        recetas,
        showRecetas,
        isLoading,
        error,
        
        // Funciones
        handleDiagnosticoChange,
        handleRecetaChange,
        agregarReceta,
        eliminarReceta,
        handleSubmit,
        setError
    };
};