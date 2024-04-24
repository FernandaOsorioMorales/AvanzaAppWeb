import React from 'react'

export function EditParameters(params: {onClose: () => void, sets: number, reps: number}) {
  const [sets, setSets] = React.useState(params.sets)
  const [reps, setReps] = React.useState(params.reps)

  return (
    <div className='h-full w-full'>
      <div className='flex flex-row w-full h-4/5 justify-around items-center'>
        <div className='flex flex-row'>
          <input className='text-center text-xl bg-gray-200 w-8 h-8 rounded-none text-cyan-800 mr-3' defaultValue={params.sets} maxLength={2}
          onChange={(e) => setSets(Number(e.target.value))}/>
          <h1 className='text-2xl text-cyan-800'>
            Series
          </h1>
        </div>

        <div className='flex flex-row'>
          <input className='text-center text-xl bg-gray-200 w-8 h-8 rounded-none text-cyan-800 mr-3' defaultValue={params.reps} maxLength={2}
          onChange={(e) => setReps(Number(e.target.value))}/>
          <h1 className='text-2xl text-cyan-800'>
            Repeticiones
          </h1>
        </div>
      </div>

      <div className='flex justify-between'>
        <button onClick={params.onClose} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-red-500'>Cancelar</button>
        <button onClick={() => console.log(sets, reps)} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-blue-500'> Guardar</button>
      </div>
    </div>
  )
}
