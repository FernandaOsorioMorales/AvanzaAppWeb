import React from "react";
import { Link } from 'react-router-dom';

interface LoginFormProps {
  title: string; // Título del formulario
  registerLinkText: string; // Texto del enlace de registro
}

const LoginForm: React.FC<LoginFormProps> = ({ title, registerLinkText }) => {
    return (
      <div className="wrapper flex justify-center items-center p-10 h-screen"> 
        <form action="" className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> 
          <h1 className="text-3xl md:text-5xl text-center font-semibold mb-8">{title}</h1> 
          
          <div className="mb-4">
            <input type="text" placeholder="Usuario" className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
          </div>
          
          <div className="mb-4">
            <input type="password" placeholder="Contraseña" className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="text-white text-2xl bg-black py-2 px-6 rounded-md focus:outline-none hover:bg-blue-700 hover:shadow-lg">Registrar</button>
          </div>

          
          <div className="mt-4 text-center">
            <Link to="/register" className="text-azulote">{registerLinkText}</Link> 
          </div>
        </form>
      </div>
    );
  }

export default LoginForm;