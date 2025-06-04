import React, { useState, useEffect } from 'react';
import useSolicitarCita from '../../../../hooks/medical/useSolicitarCita';
import FormCita from './FormCita';
import useFormat from '../../../../hooks/useFormat';

const SolicitarCita = () => {
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [motivo, setMotivo] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        loading,
        loadingDoctors,
        error,
        doctores,
        selectedDoctor,
        horarioDisponible,
        horariosLibres,
        loadAllDoctors,
        loadDoctorData,
        updateAvailableSlots,
        solicitarCita,
        clearData,
        getAvailableDays
    } = useSolicitarCita();

    // Cargar doctores al montar el componente
    useEffect(() => {
        console.log('Cargando doctores al montar componente...');
        loadAllDoctors();
    }, [loadAllDoctors]);

    useEffect(() => {
        if (selectedDoctorId) {
            console.log('Cargando datos para doctor:', selectedDoctorId);
            loadDoctorData(selectedDoctorId);
        } else {
            clearData();
        }
    }, [selectedDoctorId, loadDoctorData, clearData]);

    // Actualizar horarios cuando cambia la fecha
    useEffect(() => {
        if (selectedDate && selectedDoctorId) {
            console.log('Actualizando horarios para fecha:', selectedDate);
            updateAvailableSlots(selectedDate);
        }
    }, [selectedDate, selectedDoctorId, updateAvailableSlots]);

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedDoctorId || !selectedDate || !selectedTime) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        try {
            console.log('Enviando solicitud de cita...', {
                doctorId: selectedDoctorId,
                fecha: selectedDate,
                hora: selectedTime,
                motivo
            });
            
            await solicitarCita(selectedDoctorId, selectedDate, selectedTime, motivo);
            setShowSuccess(true);
            
            // Limpiar formulario parcialmente
            setSelectedTime('');
            setMotivo('');
            
            // Ocultar mensaje de éxito después de 3 segundos
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error('Error al solicitar cita:', err);
        }
    };

    // Resetear formulario cuando cambia el doctor
    const handleDoctorChange = (doctorId) => {
        console.log('Cambiando doctor a:', doctorId);
        setSelectedDoctorId(doctorId);
        setSelectedDate('');
        setSelectedTime('');
        setMotivo('');
    };

    // Manejar cambio de fecha
    const handleDateChange = (date) => {
        console.log('Cambiando fecha a:', date);
        setSelectedDate(date);
        setSelectedTime('');
    };

    return (
        <FormCita
            selectedDoctorId={selectedDoctorId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            motivo={motivo}
            onDoctorChange={handleDoctorChange}
            onDateChange={handleDateChange}
            onTimeChange={setSelectedTime}
            onMotivoChange={setMotivo}
            onSubmit={handleSubmit}
            loading={loading}
            loadingDoctors={loadingDoctors}
            error={error}
            showSuccess={showSuccess}
            doctores={doctores}
            selectedDoctor={selectedDoctor}
            horarioDisponible={horarioDisponible}
            horariosLibres={horariosLibres}
            getAvailableDays={getAvailableDays}
        />
    );
};

export default SolicitarCita;