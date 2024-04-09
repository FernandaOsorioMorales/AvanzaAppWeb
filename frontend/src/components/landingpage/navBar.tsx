import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from "../../assets/logo.png";
import Button from './button';

const Navbar: React.FC = () => {
    const [nav, setNav] = useState<boolean>(false);
  
    const handleNav = (): void => {
      setNav(!nav);
    };  

  return (
    <div className='flex justify-between items-center h-24 mx-auto w-full px-4 text-blue-50 bg-gray-700'>
      <img src={logo} alt='logo' className='h-20' />
      <ul className='hidden md:flex items-center'>
        <Link to="/">
            <li className='p-4 text-blue-50'>Inicio</li>
        </Link>
        <li className='p-4'>Nosotros</li>
        <Link to="/login">
            <button className="btn px-3 py-2 rounded-md bg-gray-100 text-gray-800">Inicia hoy</button>
        </Link>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>

    </div>
  );
};

export default Navbar;