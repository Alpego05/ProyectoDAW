import useFormat from '../useFormat';

export const useFormatCita = () => {
    const { formatDay } = useFormat();

    const formatTime = (timeString) => {
        if (!timeString || typeof timeString !== 'string') {
            return '';
        }
        return timeString.substring(0, 5);
    };

    const getEstadoClassName = (estado) => {
        const estadoNormalizado = estado?.toLowerCase().trim();
        
        switch (estadoNormalizado) {
            case "pendiente":
                return "bg-yellow-100 text-yellow-600";
            case "completada":
                return "bg-green-100 text-green-800";
            case "no asistida":
                return "bg-red-100 text-red-800";
            case "cancelada":
                return "bg-gray-100 text-gray-600";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getEstadoBadgeText = (estado) => {
        if (!estado) return 'Sin estado';
        
        // Capitalizar primera letra y mantener el resto
        return estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
    };

    return {
        formatDate: formatDay,
        formatTime,
        getEstadoClassName,
        getEstadoBadgeText,
    };
};