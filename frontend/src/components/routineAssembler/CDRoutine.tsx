import React from 'react'
import {Exercise} from './Exercise'

// Function to create or edit a routine

export function CDRoutine(params : {RoutineName : string, Tags : string[], onClose : () => void}) {
  return (
    <div className='h-full'>
        <h1 className='text-gray-300 text-2xl m-2'>
            Editar Rutina
        </h1>

        <div className='felx flex-row justify-around'>
            <input className='w-1/2 bg-gray-100 rounded-none text-xl text-gray-600 p-2' type="text" placeholder={params.RoutineName} maxLength={35} />

            <div className='w-fit bg-gray-300' >
                <ul className='flex flex-row'>
                    {params.Tags.map((tag, index) => <li className='p-2 h-6 text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-gray-600 text-gray-300"' key={index}>{tag}</li>)}
                </ul>
            </div>
        </div>
        
        {/* !TODOD raggable context here */}
        <div className='mt-6 mb-6 flex flex-col w-full h-2/3 items-center border-solid border-2 border-gray-500'>
            <Exercise excerciseName={"Mewing"} reps={12} seriesCount={2}></Exercise>
            <Exercise excerciseName={"Facing"} reps={20} seriesCount={1}></Exercise>
        </div>

        <div className='flex flex-row justify-between mt-12'>
            <button onClick={params.onClose} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-red-500'>Cancelar</button>
            <button className='bg-gray-500 text-white rounded p-2 m-2'>Guardar</button>
        </div>
    </div>
  )
}
