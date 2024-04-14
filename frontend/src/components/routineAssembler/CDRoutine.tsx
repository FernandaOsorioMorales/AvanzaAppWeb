import React from 'react'
import {Exercise} from './Exercise'

// Function to create or edit a routine

export function CDRoutine({RoutineName, Tags, Exercises, onClose} : {RoutineName: string, Tags: string[], Exercises: Object, onClose: () => void}) {
  return (
    <div className='h-full'>
        <h1 className='text-gray-300 text-2xl m-2'>
            Editar Rutina
        </h1>

        <div className='felx flex-row justify-around'>
            <input className='w-1/3 bg-gray-100 rounded-none text-xl text-gray-600 p-2' type="text" placeholder={RoutineName} maxLength={35} />

            <div className='w-fit bg-gray-300 justify-around' >
                <ul className='flex flex-row'>
                    {Tags.map((tag, index) => <li key={index}>{tag}</li>)}
                </ul>
            </div>
        </div>
        
        <div className='mt-6 mb-6 flex flex-row w-full h-2/3 justify-around border-solid border-2 border-gray-500'>
            <Exercise day='LUN' excercises={["Carear", "Morbearse"]}></Exercise>
            <Exercise day='MAR' excercises={[]}></Exercise>
            <Exercise day='MIE' excercises={[]}></Exercise>
            <Exercise day='JUE' excercises={[]}></Exercise>
            <Exercise day='VIE' excercises={[]}></Exercise>
            <Exercise day='SAB' excercises={[]}></Exercise>
            <Exercise day='DOM' excercises={[]}></Exercise>
        </div>

        <div className='flex flex-row justify-between mt-12'>
            <button onClick={onClose} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-red-500'>Cancelar</button>
            <button className='bg-gray-500 text-white rounded p-2 m-2'>Guardar</button>
        </div>
    </div>
  )
}
