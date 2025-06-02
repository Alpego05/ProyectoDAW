const LoadingSpinner = ({ message = "Cargando..." }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;