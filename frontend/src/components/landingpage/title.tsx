import React from 'react';

interface TitleProps {
  text: string; 
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="flex justify-center items-center py-10">
      <h1 className="text-white font-sans text-3xl font-thin text-center max-w-lg">
        {text}
      </h1>
    </div>
  );
}

export default Title;