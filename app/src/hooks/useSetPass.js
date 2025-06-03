import { useState } from 'react';
import { changePassword } from '../services/apiUser'; // Cambiar import

export const useSetPass = () => {
    const [dni, setDni] = useState('');
    const [tempPassword, setTempPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showTempPassword, setShowTempPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const clearError = () => {
        setError('');
    };

    const toggleTempPasswordVisibility = () => {
        setShowTempPassword(!showTempPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateForm = () => {
        if (!dni.trim()) {
            setError('El DNI es requerido');
            return false;
        }

        if (!tempPassword.trim()) {
            setError('La contraseña temporal es requerida');
            return false;
        }

        if (!newPassword.trim()) {
            setError('La nueva contraseña es requerida');
            return false;
        }

        if (newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres');
            return false;
        }

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }

        if (newPassword === tempPassword) {
            setError('La nueva contraseña debe ser diferente a la temporal');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const passwordData = {
                tempPassword: tempPassword.trim(),
                newPassword: newPassword.trim()
            };

            // Usar la nueva función changePassword que no requiere token
            await changePassword(dni.trim(), passwordData);
            
            setIsSuccess(true);
        } catch (error) {
            console.error('Error al establecer contraseña:', error);
            setError(error.message || 'Error al establecer la contraseña. Verifique sus datos.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        dni,
        setDni,
        tempPassword,
        setTempPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        showTempPassword,
        showNewPassword,
        showConfirmPassword,
        error,
        isLoading,
        isSuccess,
        handleSubmit,
        toggleTempPasswordVisibility,
        toggleNewPasswordVisibility,
        toggleConfirmPasswordVisibility,
        clearError
    };
};