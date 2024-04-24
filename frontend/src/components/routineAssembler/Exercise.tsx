import React, { useState } from 'react'
import { Trash2, GripVertical, Pencil } from 'lucide-react';
import Select, { MultiValue } from 'react-select'
import Modal from './Modal';
import { EditParameters } from './EditParameters';

// Excercise component, an excercise is a 'x' series of 'y' reps, with an order and a name.
// TODO agegar IdExcercise
export interface excercise {
  readonly Id: number; // ID bounded to the excercise in the routine
  readonly IdExcercise: number // ID from the excercise table
  readonly Ordinal: number;
  readonly Name: string;
  readonly Reps: number;
  readonly Sets: number;
}

export interface excerciseOptions {
  readonly ID: number;
  readonly value: string;
  readonly label: string;
}

// TODO agregar inputDrop para cambiar la cantidad de series y repeticiones
export function Exercise(params : {excercise: excercise, index: number, remove: (index: number) => void, editExcercise: (index: number, excercise: excercise) => void}) {
  const sets = params.excercise.Sets > 1 ? ' Series' : ' Serie';
  const reps = params.excercise.Reps > 1 ? ' Repeticiones' : ' Repeticion';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-row items-center h-12 bg-gray-300 rounded m-4 relative">
      <Modal open={isOpen} width='w-6/12' height='h-1/5' idElement='miniPopups' z='20'>
          <EditParameters excercise={params.excercise} index={params.index} editExcercise={params.editExcercise}  onClose={() => setIsOpen(false)} />
      </Modal>

      <GripVertical size={20} color='#000000' className='m-2 cursor-pointer'/>
      <h1 className='flex justify-center w-1/3 mr-2 text-cyan-800 font-bold p-1'>
        {params.excercise.Name}
      </h1>
      <div className='flex flex-row justify-evenly items-center'>
        <h1 className='flex justify-center text-gray-600 p-1 w-fit'>
          <span className='text-cyan-800 text-xl mr-1'>{params.excercise.Sets}</span>
          <h3 className='flex mr-5 items-center'>
            {sets}
          </h3> 
          
          <span className='text-cyan-800 text-xl mr-1'>{params.excercise.Reps}</span>
          <h3 className='flex items-center'>
            {reps}
          </h3>
        </h1>
        <button onClick={() => setIsOpen(true)} className='p-1 ml-2 h-fit bg-gray-600 rounded hover:bg-gray-400'>
          <Pencil size={20} color='#ffffff'/>
        </button>
      </div>

      <button onClick={() => params.remove(params.index)} className='absolute right-0  bg-gray-600 hover:bg-red-500 rounded p-2 m-2'>
        <Trash2 size={20} color='#ffffff'/>
      </button>
    </div>
  )
}
