import React, { useState, useEffect } from 'react';

interface SearchFormProps {
  initialDni?: string;
  onSearch: (dni: string) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialDni = '', onSearch, loading }) => {
  const [dniNumber, setDniNumber] = useState(initialDni);
  const [validationError, setValidationError] = useState('');
  
  useEffect(() => {
    // Actualizar el estado cuando cambia el prop initialDni
    if (initialDni) {
      setDniNumber(initialDni);
    }
  }, [initialDni]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validación simple de DNI peruano (8 dígitos)
    if (!dniNumber || dniNumber.length !== 8 || !/^\d+$/.test(dniNumber)) {
      setValidationError('Por favor ingrese un número de DNI válido (8 dígitos)');
      return;
    }
    
    // Llamar a la función de búsqueda pasada por props
    onSearch(dniNumber);
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="dni-search" className="block text-gray-700 font-medium mb-2">
            Ingrese su número de DNI:
          </label>
          <input
            type="text"
            id="dni-search"
            value={dniNumber}
            onChange={(e) => {
              setDniNumber(e.target.value);
              setValidationError('');
            }}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ingrese los 8 dígitos de su DNI"
            maxLength={8}
            disabled={loading}
          />
          {validationError && (
            <p className="text-red-500 text-sm mt-1">{validationError}</p>
          )}
        </div>
        
        <button
          type="submit"
          className={`px-6 py-3 ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white font-medium rounded-md w-full transition-colors`}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Consultar'}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;