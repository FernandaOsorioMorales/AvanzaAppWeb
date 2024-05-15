import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async';
import { WorkoutOption, fetchWorkouts } from './fetchRoutinesService';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Message } from './messenger';

interface trainingPlanWorkout {
    IdWorkout: number;
    WeekDay: number;
}

function buildJSON(contactID : number, daysBool: boolean[], workoutsIDs: number[]){

    // Get the days selected with its respective workout
    const thePlan = daysBool.map((selected, index) => {
        if(selected){
            return {
                IdWorkout: workoutsIDs[index],
                WeekDay: index + 1
            }
        }else return
    }).filter((day) => day != null) as trainingPlanWorkout[]


    // building the JSON 
    const RoutinePlan ={
        IdUser: contactID, 
        trainingPlanWorkout: thePlan
    }

    // Send the JSON to the backend

    axios({
        method: 'put',
        url: "/api/shareWorkout",
        withCredentials: true,
        headers: {"content-type": "application/json"},
        data: JSON.stringify(RoutinePlan),
    }).then(res => console.log(JSON.stringify(res.data)))
    .catch(_ => {
        toast("Hubo un problema al actualizar tus datos");
    });

    console.log(JSON.stringify(RoutinePlan))

}

export function PlanRoutine(params: {contactID: number, toClose: () => void, setPresence: (Message) => void}) {
    const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const [checked, setChecked] = useState<boolean[]>(new Array(7).fill(false));
    const [workoutsID, setWorkoutsID] = useState<number[]>(new Array(7));
    const [workouts, setWorkouts] = useState<string[]>(new Array(7).fill(""));

    // handle the selection of the workout
    const handleCheck = (index: number, e : WorkoutOption | null) => {
        if (e == null) return;
        const newChecked = checked.slice();
        const newWorkoutsID = workoutsID.slice();
        const newWorkouts = workouts.slice();
        if(e?.label === 'Ninguna') newChecked[index] = false;
        else {
            newChecked[index] = true;
            newWorkoutsID[index] = e.ID;
            newWorkouts[index] = e.name;
        }
        setChecked(newChecked);
        setWorkoutsID(newWorkoutsID);
        setWorkouts(newWorkouts);
    }

return (
    <div className='flex flex-col h-full gap-6'>
        <div className='flex flex-row gap-2 grow-0 h-19/20'>
            {checked.map((selected, index) => {
                return (
                    <div key={index} className={`relative ${selected ? 'bg-teal-800  border-solid transition-all duration-500' : 'bg-transparent border-dashed transition-all duration-500'} 
                                                flex flex-col justify-start items-center w-1/7 border-gray-800 border-2 text-blue-50 text-lg font-bold rounded-md pt-2`}>
                        <p className='w-fit bg-teal-800 h-fit rounded-full px-5 py-1 text-blue-50'>     
                            {weekdays[index]}
                        </p>
                        <AsyncSelect id='tags' className='mt-4 w-full'
                            closeMenuOnSelect={true}
                            defaultValue={{ID: -1, name: 'Ninguna', label: 'Ninguna'}}
                            cacheOptions
                            onChange={(e : WorkoutOption | null) => handleCheck(index, e)}
                            defaultOptions
                            loadOptions={fetchWorkouts}
                            maxMenuHeight={600}
                        />
                        <p className={`absolute text-center bottom-3 ${selected ? "text-white" : "text-gray-800"}`}>
                            {selected ? workouts[index] : 'Sin Rutina'}
                        </p>
                    </div>
                );
            })}
        </div>
        <div className='flex grow justify-between text-gray-800'>
            <button onClick={params.toClose} className='transition ease-in-out w-fit px-3 py-2 rounded-md bg-white border-solid border-2 border-gray-800 hover:bg-orange-600 hover:text-blue-50 hover:border-orange-600'>
                Cancelar
            </button>
            <button onClick={() => {buildJSON(params.contactID, checked, workoutsID); params.setPresence({isTag: true, sent: false, content: '' }); params.toClose()}}className='transition ease-in-out w-fit px-3 py-2 rounded-md bg-white border-solid border-2 border-gray-800 hover:bg-teal-600 hover:text-blue-50 hover:border-teal-600'>
                Asignar
            </button>
        </div>
    </div>
);
}
