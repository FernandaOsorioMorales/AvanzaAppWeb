import React from 'react';
import { Link } from 'react-router-dom';

const Title: React.FC= () => {
  return (
    <div className="hero bg-blue-100">
      <div className="container mx-auto bg-blue-100 pt-8 pb-5">
        <div className="hero-content text-center mt-20 bg-blue-100">
          <div className="max-w-3xl mx-auto bg-blue-100">
            <h1 className="text-7xl font-bold max-w-full text-center">La puerta al mundo fitness</h1>
            <p className="py-6">El sitio que conecta entrenadores con personas que buscan cambiar su estilo de vida</p>
            <Link to="/login">
            <button className="btn px-3 py-2 rounded-md bg-gray-50 text-gray-800">Inicia Sesión</button>
            </Link>
            <br />
            <Link to="/register">
            <button className="btn px-3 py-2 rounded-md bg-blue-100 text-gray-800">Registrate</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Title;