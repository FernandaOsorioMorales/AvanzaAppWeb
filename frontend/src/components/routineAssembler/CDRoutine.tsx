import React, { useEffect } from 'react'
import {Exercise, exercise, exerciseOptions} from './Exercise'
import AsyncSelect from 'react-select/async';
import { TagContainer, TagsOption } from './Tags'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import { toast } from 'react-toastify'
import TagPromiseOptions from './fetchTagsService';
import ExercisePromiseOptions from './fetchExerciseService';

// TODO fill with fetching to backend
var TagsFromBackend = [] //GetWorkoutDetail
var ExercisesFromBackend = [] //GetWorkoutDetail

// Function to build a JSON object from all the parameters in the popup
// Bounded to the definition of JSON 'PutExcercise' from the standard Backend

//TODO agregar el Exercises.JSON recibido del backend si es que se edita una rutina, si no, se envia el arreglo vacio
function buildJSON(tags: TagsOption[], routineName: string, exercise: exercise[], id?: number){
    const IDRoutine = id != undefined ? id : -1

    const tagsOBJ = tags[0] != undefined ? tags.map(({IdTag, ID, value}) => ({IdTag, ID: {IDRoutine}, value})) : []
    const name = routineName == 'Asigna un nombre para rutina' ? "Rutina" : routineName

    var index = 1
    const updatedExercises = exercise.map((e, index) => ({ ...e, Ordinal: index + 1 }));

    const RoutineObject = {
        Name: name,
        Id: IDRoutine,
        Tags: TagsFromBackend,
        UpdatedTags: tagsOBJ,
        exercises: ExercisesFromBackend,
        UpdatedExercises: updatedExercises
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

    // console.log(JSON.stringify(RoutineObject))

    return JSON.stringify(RoutineObject)
}


// Function to create or edit a routine
export function CDRoutine(params : {RoutineName : string, onClose : () => void, onUpdate: () => void, id?: number, create: boolean}) {

    const [tags, setTags] = React.useState<TagsOption[]>([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [exercises, setExercises] = React.useState<exercise[]>([]);
    const [name, setName] = React.useState(params.RoutineName);

    const url = "/api/workout/detail" + (params.id != undefined ? `?idWorkout=${params.id}` : "")
    const example = async () => {
        const response = await axios.get(url)
        const data = response.data
        ExercisesFromBackend = data.exercises
        const exercises = data.exercises.map( (exercise: { IdExercise: number, Name: string, Reps: number, Sets: number }) => ({ Id: params.id, IdExercise: exercise.IdExercise, Ordinal: -1, Name: exercise.Name, Reps: exercise.Reps, Sets: exercise.Sets }))
        setExercises(exercises)
        TagsFromBackend = data.Tags
        return data.Tags.map( (tag: { ID: number, Value: string}) => ({ IdTag: tag.ID, ID: tag.ID, value: tag.Value, label: tag.Value }))

    }

    useEffect(()=>{
        if(params.create){
            setIsLoading(false)
            return
        }

         ( async () => {
            const Tags = await example()
            setTags(Tags)
            setIsLoading(false)
            }
        )()
    },[])



    const handleDrop = (result: {source: { droppableId:string, index: number }, destination: { droppableId:string, index: number }, type: string}) => {
        const { source, destination, type } = result;
        if(!destination) return;

        if(source.index != destination.index || source.droppableId != destination.droppableId){
            const reorderedExcersices = [...exercises]
            const [removedExcersice] = reorderedExcersices.splice(source.index, 1)
            reorderedExcersices.splice(destination.index, 0, removedExcersice)
            return setExercises(reorderedExcersices)
        }
    }

    const deleteExcercise = (index: number) => {
        const newExercises = [...exercises]
        newExercises.splice(index, 1)
        setExercises(newExercises)
    }

    const editExcercise = (index: number, exercise: exercise) => {
        const newExercises = [...exercises]
        newExercises[index] = exercise
        setExercises(newExercises)
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
                { isLoading ? (<div>Loading...</div>) :
                (<AsyncSelect id='tags' className='mt-4'
                    closeMenuOnSelect={true}
                    defaultValue={tags}
                    cacheOptions
                    isMulti
                    onChange={(e) => setTags(e as unknown as TagsOption[])}
                    isOptionDisabled={() => tags.length >= 5}
                    defaultOptions
                    loadOptions={TagPromiseOptions}
                />)}

            </TagContainer>

            <div className='relative mt-3'>
                <label htmlFor="tags" className='absolute -top-2'>
                    AgregarEjercicio
                </label>
                <AsyncSelect id='addExce' className='mt-4'
                    closeMenuOnSelect={true}
                    cacheOptions
                    onChange={(e) => {setExercises((exercises) => [...exercises, {ID:params.id ?? - 1, IdExercise:e?.ID ?? -1, Ordinal: -1, Name: e?.value ?? '', Reps: 10, Sets: 3}])}}
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
                            {exercises.map((exercise, index) => (
                                <Draggable draggableId={index.toString()} index={index} key={index}>
                                    {(provided) => (
                                        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                            <Exercise exercise={exercise} index={index} remove={deleteExcercise} editExcercise={editExcercise}/>
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
            <button onClick={() => {buildJSON(tags as TagsOption[], name, exercises, params.id); console.log(exercises); params.onClose(); params.onUpdate()}} className='bg-gray-500 text-white rounded p-2 m-2 hover:bg-blue-500'>Guardar</button>
        </div>
    </div>
  )
}
