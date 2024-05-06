import React from 'react';
import { Link } from 'react-router-dom';

const Title: React.FC= () => {
  return (
    <div className="bg-blue-100">
      <div className="mx-auto bg-blue-100 pt-8 pb-5">
        <div className="text-center mt-20 bg-blue-100">
          <div className="max-w-3xl mx-auto bg-blue-100">
            <h1 className="text-7xl max-w-full text-center font-poppins text-gray-700">La puerta al mundo fitness</h1>
            <p className="py-6 text-2xl">El sitio que conecta entrenadores con personas que buscan cambiar su estilo de vida</p>
            <Link to="/login">
              <button className=" px-3 py-2 rounded-md bg-gray-50 text-gray-800">Inicia Sesión</button>
            </Link>
            <br />
            <Link to="/registerClasification">
              <button className=" px-3 py-2 mb-7 rounded-md bg-blue-100 text-gray-800">Registrate</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Title;