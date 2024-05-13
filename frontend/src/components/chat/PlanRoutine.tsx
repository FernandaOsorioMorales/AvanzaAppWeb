import React, { useState } from 'react'

interface trainingPlanWorkout {
    IdWorkout: number;
    WeekDay: number;
}

function buildJSON(days: boolean[]){
    // { for reference
    //     "IdUser" : "number",
    //     "trainingPlanWorkout" : [
    //         {
    //             "IdWorkout" : "number", // el de GetWorkouts 
    //             "WeekDay" : "number" // del 1 al 7
    //         }
    //     ]
    // }

    // Get the days selected
    const thePlan = days.map((selected, index) => {
        if(selected){
            return {
                IdWorkout: 0,
                WeekDay: index
            }
        }else return
    }).filter((day) => day != null) as trainingPlanWorkout[]


    const RoutinePlan ={
        IdUser: 0, //?? Where do we get this from
        trainingPlanWorkout: thePlan
    }

    console.log(JSON.stringify(RoutinePlan))

}

export function PlanRoutine(params: {contactID: number, toClose: () => void}) {
    const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const [checked, setChecked] = useState<boolean[]>(new Array(7).fill(false));

    const handleCheck = (index: number) => {
        const newChecked = checked.slice();
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
    }

return (
    <div className='flex flex-col h-full gap-6'>
        <div className='flex flex-row gap-2 grow-0 h-19/20'>
            {checked.map((selected, index) => {
                return (
                    <div key={index} className={`${selected ? 'bg-teal-800  border-solid transition-all duration-500' : 'bg-transparent border-dashed transition-all duration-500'} flex justify-center w-1/7 border-gray-800 border-2 text-blue-50 text-lg font-bold rounded-md pt-2`}>
                        <p className='w-fit bg-teal-800 h-fit rounded-full px-5 py-1 text-blue-50'>     
                            {weekdays[index]}
                        </p>
                        <input type="checkbox" checked={checked[index]} onChange={() => handleCheck(index)}/>
                    </div>
                );
            })}
        </div>
        <div className='flex grow justify-between text-gray-800'>
            <button onClick={params.toClose} className='transition ease-in-out w-fit px-3 py-2 rounded-md bg-white border-solid border-2 border-gray-800 hover:bg-orange-600 hover:text-blue-50 hover:border-orange-600'>
                Cancelar
            </button>
            <button onClick={() => buildJSON(checked)}className='transition ease-in-out w-fit px-3 py-2 rounded-md bg-white border-solid border-2 border-gray-800 hover:bg-teal-600 hover:text-blue-50 hover:border-teal-600'>
                Asignar
            </button>
        </div>
    </div>
);
}
