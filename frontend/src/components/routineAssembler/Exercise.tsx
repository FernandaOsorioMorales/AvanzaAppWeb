import React from 'react'

export function Exercise({day, excercises} : {day: string, excercises: string[]}) {
  const last = day == 'DOM' ? 
  'flex flex-col items-center h-full w-1/6 relative' :
  'flex flex-col items-center h-full w-1/6 border-dotted border-r-2 border-gray-500 relative'
  return (
    <div className={last}>
      <h1 className='flex justify-center bg-gray-500 p-1 w-full'>
        {day}
      </h1>
      {excercises.map((excercise, index) => <p className='w-full mt-2 flex justify-center' key={index}>{excercise}</p>)}
      <button className='absolute bottom-3 bg-gray-600 text-white rounded p-2 m-2'>
        Editar
      </button>
    </div>
  )
}
