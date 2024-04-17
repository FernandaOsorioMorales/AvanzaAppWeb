import React, { useEffect } from 'react'
import {Exercise} from './Exercise'
import Select, { MultiValue } from 'react-select'
import { TagContainer, Tag } from './Tags'
import { TagsOption, tagsOption } from './tags'
// Function to build a JSON object from all the parameters in the popup
function buildJSON(){
    
}


// Function to create or edit a routine
export function CDRoutine(params : {RoutineName : string, Tags : string[], onClose : () => void}) {
    const [tags, setTags] = React.useState(params.Tags);

  return (
    <div className='h-full'>
        <h1 className='text-gray-300 text-2xl m-2'>
            Editar Rutina
        </h1>

        <input className='w-9/12 h-fit bg-gray-100 rounded-none text-xl text-gray-600 p-2' type="text" placeholder={params.RoutineName} maxLength={35} />

        <TagContainer styles='mt-3 relative'>
            <label htmlFor="tags" className='absolute -top-2'>
                Agregar Etiqueta
            </label>

            <Select id='tags' className='mt-4'
                closeMenuOnSelect={true}
                defaultValue={tags.map((tag) => tagsOption.find((option) => option.value === tag))}
                isMulti
                options={tagsOption}
                onChange={(e) => setTags(e as unknown as string[])}
                isOptionDisabled={() => tags.length >= 5}
            />
        </TagContainer>
        
        {/* !TODOD draggable context here */}
        <div className='mt-3 mb-6 flex flex-col w-full h-2/3 items-center border-solid border-2 border-gray-500'>
            <Exercise excerciseName={"Mewing"} reps={12} seriesCount={2}></Exercise>
            <Exercise excerciseName={"Facing"} reps={20} seriesCount={1}></Exercise>
        </div>

        <div className='flex flex-row justify-between mt-6'>
            <button onClick={params.onClose} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-red-500'>Cancelar</button>
            <button className='bg-gray-500 text-white rounded p-2 m-2' onClick={() => console.log(tags)}>Guardar</button>
        </div>
    </div>
  )
}
