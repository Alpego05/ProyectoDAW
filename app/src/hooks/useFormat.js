const useFormat = () => {
    // DD/MM/YYYY
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // 15 de mayo de 2023
    const formatDay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // DD/MM/YYYY HH:MM
    const formatDateTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // mostrar primeras letras en mayúscula
    const capitalizeText = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    // mostrar solo un número específico de caracteres
    const truncateText = (text, maxLength = 100) => {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return {
        formatDate,
        formatDay,
        formatDateTime,
        capitalizeText,
        truncateText
    };
};

export default useFormat;