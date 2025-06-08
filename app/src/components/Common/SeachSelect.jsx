import { useState, useEffect } from 'react';
import { X, ChevronDown, Search } from 'lucide-react';

const SearchableSelect = ({
    options = [],
    value,
    onChange,
    placeholder,
    displayField = 'nombre',
    valueField = 'id',
    disabled = false,
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
                className={`w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-blue-500 transition-all duration-200 cursor-pointer flex items-center justify-between ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-emerald-300'
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
                            className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-emerald-200 rounded-xl shadow-xl max-h-60 overflow-hidden">
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


            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default SearchableSelect;