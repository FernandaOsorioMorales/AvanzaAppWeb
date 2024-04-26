import React, { useEffect } from 'react'
import {Exercise, excercise, excerciseOptions} from './Exercise'
import Select, { MultiValue } from 'react-select'
import AsyncSelect from 'react-select/async';
import { TagContainer, TagsOption } from './Tags'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import TagPromiseOptions from './fetchTagsService';
import ExercisePromiseOptions from './fetchExerciseService';

// TODO fill with fetching to backend
const TagsFromBackend: TagsOption[] = [] //GetWorkoutDetail
const ExcercisesFromBackend: excercise[] = [] //GetWorkoutDetail

// Function to build a JSON object from all the parameters in the popup
// Bounded to the definition of JSON 'PutExcercise' from the standard Backend

//TODO agregar el Excercises.JSON recibido del backend si es que se edita una rutina, si no, se envia el arreglo vacio
function buildJSON(tags: TagsOption[], routineName: string, excercise: excercise[], id?: number){

    const tagsOBJ = tags[0] != undefined ? tags.map(({IdTag, ID, value}) => ({IdTag, ID, value})) : []
    const name = routineName == 'Asigna un nombre para rutina' ? "Rutina" : routineName // TODO Set a new Default name or raise exception

    var index = 1
    const updatedExcercises = excercise.map((e, index) => ({ ...e, Ordinal: index + 1 }));

    const RoutineObject = id != undefined ? {
        Name: name,
        Id: id,
        Tags: TagsFromBackend,
        UpdatedTags: tagsOBJ,
        excercises: ExcercisesFromBackend,
        UpdatedExercises: updatedExcercises
    }:{
        Name: name,
        Id: -1,
        Tags: TagsFromBackend,
        UpdatedTags: tagsOBJ,
        excercises: ExcercisesFromBackend,
        UpdatedExercises: updatedExcercises
    } 

    function editUser() {
		axios({
			method: 'put',
            url: "/api/updateWorkout",
            withCredentials: true,
			headers: {"content-type": "application/json"},
			data: JSON.stringify(RoutineObject),
		}).then(res => console.log(JSON.stringify(res.data)))
		.catch(_ => {
			toast("Hubo un problema al actualizar tus datos");
		});
	}
    editUser()

    return JSON.stringify(RoutineObject)
}


// Function to create or edit a routine
export function CDRoutine(params : {RoutineName : string, Tags : string[], onClose : () => void, onUpdate: () => void, id?: number}) {
    const [tags, setTags] = React.useState<TagsOption[]>([]);
    const [excercises, setExcercises] = React.useState<excercise[]>([]);
    const [name, setName] = React.useState(params.RoutineName);

    const handleDrop = (result: {source: { droppableId:string, index: number }, destination: { droppableId:string, index: number }, type: string}) => {
        const { source, destination, type } = result;
        if(!destination) return;

        if(source.index != destination.index || source.droppableId != destination.droppableId){
            const reorderedExcersices = [...excercises]
            const [removedExcersice] = reorderedExcersices.splice(source.index, 1)
            reorderedExcersices.splice(destination.index, 0, removedExcersice)
            return setExcercises(reorderedExcersices)
        }
    }

    const deleteExcercise = (index: number) => {
        const newExcercises = [...excercises]
        newExcercises.splice(index, 1)
        setExcercises(newExcercises)
    }

    const editExcercise = (index: number, excercise: excercise) => {
        const newExcercises = [...excercises]
        newExcercises[index] = excercise
        setExcercises(newExcercises)
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


        <div className='flex flex-row justify-between'>
            <TagContainer styles='mt-3 relative'>
                <label htmlFor="tags" className='absolute -top-2'>
                    AgregarEtiqueta
                </label>
                <AsyncSelect id='tags' className='mt-4'
                    closeMenuOnSelect={true}
                    defaultValue={tags}
                    cacheOptions
                    isMulti
                    onChange={(e) => setTags(e as TagsOption[])}
                    isOptionDisabled={() => tags.length >= 5}
                    defaultOptions
                    loadOptions={TagPromiseOptions}
                />

            </TagContainer>

            <div className='relative mt-3'>
                <label htmlFor="tags" className='absolute -top-2'>
                    AgregarEjercicio
                </label>
                <AsyncSelect id='addExce' className='mt-4'
                    closeMenuOnSelect={true}
                    cacheOptions
                    onChange={(e) => setExcercises((excercises) => [...excercises, {Id: -1, IdExcercise:e?.ID ?? -1, Ordinal: -1, Name: e?.value ?? '', Reps: 10, Sets: 3}])}
                    defaultOptions
                    loadOptions={ExercisePromiseOptions}
                />

            </div>
        </div>

        
        <div className='mt-3 mb-6 flex flex-col w-full h-2/3 max-h-max overflow-y-auto items-center border-solid border-2 border-gray-500'>
            <div className='w-full'>
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="ROOT" type="group">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                            {excercises.map((excercise, index) => (
                                <Draggable draggableId={index.toString()} index={index} key={index}>
                                    {(provided) => (
                                        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                            <Exercise excercise={excercise} index={index} remove={deleteExcercise} editExcercise={editExcercise}/>
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
            <button onClick={() => {buildJSON(tags as TagsOption[], name, excercises, params.id); params.onClose(); params.onUpdate()}} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-blue-500'>Guardar</button>
        </div>
    </div>
  )
}
