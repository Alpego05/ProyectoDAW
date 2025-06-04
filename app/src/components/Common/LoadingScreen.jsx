import { Loader2 } from "lucide-react";

const LoadingScreen = ({ message = "Cargando..." }) => {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64">
            <div className="relative">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                <div className="absolute inset-0 h-12 w-12 border-2 border-blue-200 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-600 mt-4 text-center font-medium">{message}</p>
            <div className="mt-4 flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
        </div>
    </div>
  );
};

export default LoadingScreen;