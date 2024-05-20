import React from 'react';
import corriendo from "../../assets/corriendo.png";
import ejercicio from "../../assets/ejercicio.png";
import espalda from "../../assets/espalda.png";
import pesas from "../../assets/pesas.png";
import pesas2 from "../../assets/pesas2.png";
import pesas3 from "../../assets/pesas3.png";
import pesas4 from "../../assets/pesas4.png";
  
  const Carousel: React.FC = () => {
    return (
        <div className="container mx-auto bg-blue-100">
            <div className="flex justify-center">
                <img src={corriendo} alt="Corriendo" className="w-32 h-32" />
                <img src={ejercicio} alt="Ejercicio" className="w-32 h-32"/>
                <img src={espalda} alt="Espalda" className="w-32 h-32"/>
                <img src={pesas} alt="Pesas" className="w-32 h-32"/>
                <img src={pesas2} alt="Pesas" className="w-32 h-32"/>
                <img src={pesas3} alt="Pesas" className="w-32 h-32"/>
                <img src={pesas4} alt="Pesas" className="w-32 h-32"/>
            </div>
        </div> 
    );
  };
  
  export default Carousel;