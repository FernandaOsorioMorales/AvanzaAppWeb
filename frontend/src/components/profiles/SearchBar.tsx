import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Busca a tu próximo entrenador, prueba con cualidades que te gustaría que tuviera</h2>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;