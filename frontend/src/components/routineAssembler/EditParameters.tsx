import React from 'react'
import { excercise } from './Exercise'

function transformExcercise(excercise: excercise, sets: number, reps: number): excercise {
  return {
    ID: excercise.ID,
    IdExcercise: excercise.IdExcercise,
    Ordinal: excercise.Ordinal,
    Name: excercise.Name,
    Reps: reps,
    Sets: sets
  }
}

export function EditParameters(params: {onClose: () => void, index: number, editExcercise: (index: number, excercise: excercise) => void, excercise: excercise}) {
  const excercise = params.excercise
  const [sets, setSets] = React.useState(params.excercise.Sets)
  const [reps, setReps] = React.useState(params.excercise.Reps)

  return (
    <div className='h-full w-full'>
      <div className='flex flex-row w-full h-3/4 justify-around items-center'>
        <div className='flex flex-row'>
          <input id="Sets" className='text-center text-xl bg-gray-200 w-8 h-8 rounded-none text-cyan-800 mr-3' defaultValue={sets} maxLength={2}
          onChange={(e) => setSets(Number(e.target.value))}/>
          <label htmlFor="Sets" className='text-2xl text-cyan-800'>
            Series
          </label>
        </div>

        <div className='flex flex-row'>
          <input id="Reps" className='text-center text-xl bg-gray-200 w-8 h-8 rounded-none text-cyan-800 mr-3' defaultValue={reps} maxLength={2}
          onChange={(e) => setReps(Number(e.target.value))}/>
          <label htmlFor="Reps" className='text-2xl text-cyan-800'>
            Repeticiones
          </label>
        </div>
      </div>

      <div className='flex justify-between'>
        <button onClick={params.onClose} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-red-500'>Cancelar</button>
        <button onClick={() => {params.editExcercise(params.index, transformExcercise(excercise, sets, reps)); params.onClose()}} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-blue-500'> Guardar</button>
      </div>
    </div>
  )
}
