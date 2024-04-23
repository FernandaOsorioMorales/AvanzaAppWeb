import React, { useState } from 'react';
import SpecialtySearch from './autocomplete'; // Corrige la importación del componente

// Define el tipo para las props del componente
interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // Tipo de la función onSearch
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm); // Llama a la función con el término de búsqueda
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Busca a tu próximo entrenador</h2>
      <form onSubmit={handleSubmit}>
        {/* Aquí se debe corregir el uso de JSX para SpecialtySearch */}
        <SpecialtySearch /> 
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-2">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
