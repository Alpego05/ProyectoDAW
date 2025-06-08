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

    useEffect(() => {
        loadAllDoctors();
    }, [loadAllDoctors]);

    useEffect(() => {
        if (selectedDoctorId) {
            loadDoctorData(selectedDoctorId);
        } else {
            clearData();
        }
    }, [selectedDoctorId, loadDoctorData, clearData]);

    useEffect(() => {
        if (selectedDate && selectedDoctorId) {
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
            console.log(  //   doctor_id: doctorId,
        //         patient_id: patientId,
        //         fecha: formattedDate,
        //         hora_inicio: hora,
        //         hora_fin: hora_fin,
        //         motivo: motivo || 'Consulta médica',
        //         estado: 'Pendiente' 
            );
            
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
        setSelectedDoctorId(doctorId);
        setSelectedDate('');
        setSelectedTime('');
        setMotivo('');
    };

    const handleDateChange = (date) => {
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