import React, { useState } from 'react';

const BodyMeasurementsDisplay = () => {
  const [editing, setEditing] = useState(false);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65); 
  const [bust, setBust] = useState(90); 
  const [waist, setWaist] = useState(75); 
  const [hips, setHips] = useState(95); 
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    
  };

  return (
    <div className="w-60 mt-5 mx-auto p-4 bg-blue-900 rounded-lg float-left">
        <h2 className="text-3xl text-center font-bold text-blue-50 mb-4">Medidas Corporales</h2>
        <div className="mb-2">
            <p className="text-xl text-blue-50 mb-1">Altura (cm):</p>
                {editing ? (
            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="border rounded-md px-3 py-2 w-full" />
                ) : (
            <p className='text-sm'>{height}</p>
            )}
        </div>
        <div className="mb-4">
            <p className="text-xl text-blue-50 mb-1">Peso (kg):</p>
                {editing ? (
                <input type='text' value={weight} onChange={(e) => setWeight(e.target.value)} className="border rounded-md px-3 py-2 w-full" />
            ) : (
            <p>{weight}</p>
            )}
        </div>
        <div className="mb-4">
            <p className="text-xl text-blue-50 mb-1">Brazo (cm):</p>
            {editing ? (
            <input type="text" value={bust} onChange={(e) => setBust(e.target.value)} className="border rounded-md px-3 py-2 w-full" />
                ) : (
            <p>{bust}</p>
            )}
        </div>
        <div className="mb-4">
            <p className="text-xl text-blue-50 mb-1">Cintura (cm):</p>
            {editing ? (
                <input type="text" value={waist} onChange={(e) => setWaist(e.target.value)} className="border rounded-md px-3 py-2 w-full" />
            ) : (
            <p>{waist}</p>
            )}
        </div>
        <div className="mb-4">
            <p className="text-xl text-blue-50 mb-1">Caderas (cm):</p>
            {editing ? (
            <input type="text" value={hips} onChange={(e) => setHips(e.target.value)} className="border rounded-md px-3 py-2 w-full" />
            ) : (
            <p>{hips}</p>
            )}
        </div>
        <div className="flex justify-center items-center">
            {editing ? (
            <button onClick={handleSave} className="bg-blue-50 text-[#DC5663] px-4 py-2 rounded-md hover:bg-blue-600">Guardar</button>
            ) : (
            <button onClick={handleEdit} className="bg-blue-50 text-[#DC5663] px-4 py-2 rounded-md hover:bg-blue-600">Editar</button>
            )}
        </div>
    </div>
  );
};

export default BodyMeasurementsDisplay;
