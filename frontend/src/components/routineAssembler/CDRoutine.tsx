import React, { useEffect } from 'react'
import {Exercise, excercise, excerciseOptions} from './Exercise'
import Select, { MultiValue } from 'react-select'
import { TagContainer, TagsOption, tagsOption } from './Tags'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'



// !DEBUG ONLY
const ExcerciseOptions : excerciseOptions[] = [
    {ID: 12, value: 'Mewing', label: 'Mewing'},
    {ID: 13, value: 'Facing', label: 'Facing'},
    {ID: 14, value: 'Chewing', label: 'Chewing'},
    {ID: 15, value: 'Running', label: 'Running'}
]
// !DEBUG ONLY
// const ExampleExcercises : excercise[] = [
//     {ID: 1, IdExcercise:4, Ordinal: 1, Name: "Mewing", Reps: 12, Sets: 2},
//     {ID: 2, IdExcercise:9, Ordinal: 2, Name: "Facing", Reps: 20, Sets: 1},
//     {ID: 3, IdExcercise:12, Ordinal: 3, Name: "Chewing", Reps: 10, Sets: 3}
// ]   

const ExampleExcercises : excercise[] = []

// TODO fill with fetching to backend
const TagsFromBackend: TagsOption[] = [] //GetWorkoutDetail
const ExcercisesFromBackend: excercise[] = [] //GetWorkoutDetail
const ExcerciseOptionsFromBackend: excerciseOptions[] = [] //GetExcercises
const TagsOptionsFromBackend: TagsOption[] = [] //GetTags

// Function to build a JSON object from all the parameters in the popup
// Bounded to the definition of JSON 'PutExcercise' from the standard Backend

//TODO agregar el Excercises.JSON recibido del backend si es que se edita una rutina, si no, se envia el arreglo vacio
function buildJSON(tags: TagsOption[], routineName: string, excercise: excercise[], id?: number){

    const tagsOBJ = tags[0] != undefined ? tags.map(({IdTag, ID, value}) => ({IdTag, ID, value})) : []
    const name = routineName == 'Asigna un nombre para rutina' ? "Rutina" : routineName // TODO Set a new Default name or raise exception

    // const OrderExcercise = excercise.forEach((excercise) => {
    //     ({ID : excercise.ID, IdExcercise: excercise.IdExcercise, Ordinal: index, Name: excercise.Name, Sets: excercise.Sets, Reps: excercise.Reps})
    //     index++
    // })

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

    // console.log(JSON.stringify(RoutineObject))

    function editUser() {
		axios({
			method: 'put',
            url: "http://localhost:9090/updateWorkout",
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
    const [tags, setTags] = React.useState(params.Tags.map((tag) => tagsOption.find((option) => option.value === tag)));
    const [excercises, setExcercises] = React.useState(ExampleExcercises);
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

                <Select id='tags' className='mt-4'
                    closeMenuOnSelect={true}
                    defaultValue={tags}
                    isMulti
                    options={tagsOption}
                    onChange={(e) => setTags(e as TagsOption[])}
                    isOptionDisabled={() => tags.length >= 5}
                />
            </TagContainer>

            <div className='relative mt-3'>
                <label htmlFor="tags" className='absolute -top-2'>
                    AgregarEjercicio
                </label>
                <Select id='addExce' className='mt-4'
                    closeMenuOnSelect={true}
                    options={ExcerciseOptions}
                    onChange={(e) => setExcercises((excercises) => [...excercises, {Id: -1, IdExcercise:e?.ID ?? -1, Ordinal: -1, Name: e?.value ?? '', Reps: 10, Sets: 3}])}
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
