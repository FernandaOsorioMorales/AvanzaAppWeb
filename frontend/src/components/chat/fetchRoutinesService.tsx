import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

export interface WorkoutOption {
    ID: number,
    name: string,
    label: string
}

export const fetchWorkouts = async () => {
    const response = await axios.get("api/workouts")
    const data = response.data
    const def = [{ID: -1, name: 'Ninguna', label: 'Ninguna'}]
    const workouts = data.workouts.map((workout : {Workout : {ID : number, Name : string}}) => ({ ID: workout.Workout.ID, name: workout.Workout.Name, label: workout.Workout.Name }) as WorkoutOption)
    return def.concat(workouts)
}
