import React, { useEffect } from 'react'
import {Exercise, excercise} from './Exercise'
import Select, { MultiValue } from 'react-select'
import { TagContainer, TagsOption, tagsOption } from './Tags'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


// !DEBUG ONLY
const ExampleExcercises : excercise[] = [
    {id: 1, order: 1, name: "Mewing", reps: 12, sets: 2},
    {id: 2, order: 2, name: "Facing", reps: 20, sets: 1},
    {id: 3, order: 3, name: "Chewing", reps: 10, sets: 3}
]   

// Function to build a JSON object from all the parameters in the popup
function buildJSON(tags: TagsOption[], routineName: string, excercise: excercise[], id?: number){
    const tagsOBJ = tags[0] != undefined ? tags.map(({id, value}) => ({id, value})) : []
    const name = routineName == 'Asigna un nombre para rutina' ? "Rutina" : routineName // TODO Set a new Default name or raise exception

    const RoutineObject = id != undefined ? {
        id: id,
        routineName: name,
        tags: tagsOBJ,
        excercises: excercise
    }:{
        routineName: name,
        tags: tagsOBJ,
        excercises: excercise
    } 

    return JSON.stringify(RoutineObject)
}


// Function to create or edit a routine
export function CDRoutine(params : {RoutineName : string, Tags : string[], onClose : () => void, id?: number}) {
    const [tags, setTags] = React.useState(params.Tags.map((tag) => tagsOption.find((option) => option.value === tag)));
    const [excercises, setExcercises] = React.useState(ExampleExcercises);
    const [name, setName] = React.useState(params.RoutineName);

    const handleDrop = (result: any) => {
        console.log(result)
    }

  return (
    <div className='h-full'>
        <h1 className='text-gray-300 text-2xl mb-5'>
            Editar Rutina
        </h1>

        <input className='w-9/12 h-fit bg-gray-100 rounded-none text-xl text-gray-600 p-2' 
               type="text" placeholder={params.RoutineName}
               maxLength={35} 
               onChange={(e) => setName(e.target.value)}/>

        <TagContainer styles='mt-3 relative'>
            <label htmlFor="tags" className='absolute -top-2'>
                Agregar Etiqueta
            </label>

            <Select id='tags' className='mt-4'
                closeMenuOnSelect={true}
                defaultValue={tags}
                isMulti
                options={tagsOption}
                onChange={(e) => setTags(e as TagsOption[])}
                isOptionDisabled={() => tags.length >= 5}
            />
        </TagContainer>
        
        <div className='mt-3 mb-6 flex flex-col w-full h-2/3 items-center border-solid border-2 border-gray-500'>
            <div className='w-full'>
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="ROOT" type="group">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                            {excercises.map((excercise, index) => (
                                <Draggable draggableId={excercise.id.toString()} index={index} key={excercise.id}>
                                    {(provided) => (
                                        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                            <Exercise {...excercise} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>

        <div className='flex flex-row justify-between mt-6'>
            <button onClick={params.onClose} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-red-500'>Cancelar</button>
            <button onClick={() => console.log(buildJSON(tags as TagsOption[], name, excercises, params.id))} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-blue-500'>Guardar</button>
        </div>
    </div>
  )
}
