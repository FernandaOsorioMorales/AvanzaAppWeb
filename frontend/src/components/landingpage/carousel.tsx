import React from 'react';
import { Link } from 'react-router-dom';

const Carousel: React.FC= () => {
    return (
        <div className="w-64 h-40 overflow-hidden rounded-box">
        <div className="flex flex-nowrap overflow-x-auto">
          <div className="carousel-item flex-none w-64">
            <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
          </div> 
          <div className="carousel-item flex-none w-64">
            <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
          </div> 
          <div className="carousel-item flex-none w-64">
            <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
          </div> 
          <div className="carousel-item flex-none w-64">
            <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
          </div> 
          <div className="carousel-item flex-none w-64">
            <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
          </div> 
          <div className="carousel-item flex-none w-64">
            <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
          </div> 
          <div className="carousel-item flex-none w-64">
            <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
          </div>
        </div>
      </div>
    );
  }
  
  export default Carousel;
