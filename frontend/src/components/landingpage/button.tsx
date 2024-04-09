import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to: string;
  text: string;
  color?: string; 
}

const ButtonMio: React.FC<ButtonProps> = ({ to, text, color = "bg-white" }) => {
  return (
    <div className="flex justify-center">
      <Link to={to} className={`text-black text-1xl text-center ${color} p-3 rounded-rd`}>
        {text}
      </Link>
    </div>
  );
}

export default ButtonMio;
