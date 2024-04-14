import React from 'react'
import { Trash2, GripVertical } from 'lucide-react';

// Excercise component, an excercise is a 'x' series of 'y' reps and it has a name.

export function Exercise(params : {excerciseName : string, reps : number, seriesCount : number}) {
  const series = params.seriesCount > 1 ? ' series' : ' serie';
  const reps = params.reps > 1 ? ' repeticiones' : ' repeticion';

  return (
    <div className="flex flex-row items-center w-11/12 h-12 bg-gray-400 rounded m-4 relative">
      <GripVertical size={20} className='m-2'color='#ffffff'/>
      <h1 className='flex justify-center w-1/3 mr-2 text-gray-600 p-1'>
        {params.excerciseName}
      </h1>
      <h1 className='flex justify-center text-gray-600 p-1 w-fit'>
        <span className='text-gray-900'>{params.seriesCount}</span> {series} de <span className='text-gray-900'>{params.reps}</span> {reps}
      </h1>
      <button className='absolute right-3 bg-red-500 rounded p-2 m-2'>
        <Trash2 size={20}/>
      </button>
    </div>
  )
}
