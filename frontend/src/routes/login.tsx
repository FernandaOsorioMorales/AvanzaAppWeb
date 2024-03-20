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
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600 hover:bg-blue-600">Login</button>

          
          <div className="mt-4 text-center">
            <Link to="/register" className="text-azulote">{registerLinkText}</Link> 
          </div>
        </form>
      </div>
    );
  }

export default LoginForm;