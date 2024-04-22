import React from 'react'
import { Trash2, GripVertical } from 'lucide-react';

// Excercise component, an excercise is a 'x' series of 'y' reps, with an order and a name.

export interface excercise {
  readonly id: number;
  readonly order: number;
  readonly name: string;
  readonly reps: number;
  readonly sets: number;
}

// TODO agregar inputDrop para cambiar la cantidad de series y repeticiones
export function Exercise(params : excercise) {
  const sets = params.sets > 1 ? ' series' : ' serie';
  const reps = params.reps > 1 ? ' repeticiones' : ' repeticion';

  return (
    <div className="flex flex-row items-center h-12 bg-gray-300 rounded m-4 relative">
      <GripVertical size={20} color='#000000' className='m-2 cursor-pointer'/>
      <h1 className='flex justify-center w-1/3 mr-2 text-blue-900 font-bold p-1'>
        {params.name}
      </h1>
      <h1 className='flex justify-center text-gray-600 p-1 w-fit'>
        <span className='text-gray-900'>{params.sets}</span> {sets} de <span className='text-gray-900'>{params.reps}</span> {reps}
      </h1>
      <button className='absolute right-0  bg-gray-600 hover:bg-red-500 rounded p-2 m-2'>
        <Trash2 size={20} color='#ffffff'/>
      </button>
    </div>
  )
}
