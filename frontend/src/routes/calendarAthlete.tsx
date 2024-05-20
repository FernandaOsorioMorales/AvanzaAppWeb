import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import  Sidebar, {SidebarItem } from '../components/SideBar/Sidebar.tsx';
import ProtectedRoute from "../components/protectedRoute.tsx";
import { SidebarAthlete } from "../components/SideBar/SidebarAthlete.tsx";
import { logout } from "../utils/login.ts";
import { toast } from "react-toastify";
import BasicCard from '../components/calendar/card.tsx';
import axios from 'axios';

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

interface UserWorkout {
  Id: number;
  DayOfWeek: number;
  Name: string;
}

interface TrainingPlan {
  IdTrainingPlan: number;
  IdTrainer: number;
  TrainingPlanWorkouts: UserWorkout[];
}

interface TrainingPlansResponse {
  TrainingPlans: TrainingPlan[];
}

interface WorkoutName {
  Id: number;
  Name: string;
}

interface RoutineNames {
  [dayOfWeek: number]: WorkoutName[];
}

async function getRoutineName(){
  const response = await axios.get<TrainingPlansResponse>('/api/trainingPlans', {
    withCredentials: true,
  });
  
  console.log(response);
  return response.data; // Retorna directamente los datos
}


 
const calendarAthlete: React.FC = () => {
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener y procesar los datos
    const fetchAndShowRoutineNames = async () => {
      try {
        const data: TrainingPlansResponse = await getRoutineName();
        setTrainingPlans(data.TrainingPlans); 
      } catch (err) {
        setError('Failed to fetch training plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndShowRoutineNames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='flex bg-blue-50'>
      <div>
          <SidebarAthlete/>
      </div>
      <div className='flex flex-col items-center p-4'>
        <h3 className='text-[#DC5663] text-3xl font-bold mb-4'>
          ¡Hola! Mira cómo luce tu semana
        </h3>
      {trainingPlans.map((trainingPlan) => (
        <div key={trainingPlan.IdTrainingPlan}>
          <div className="flex flex-wrap">
            {trainingPlan.TrainingPlanWorkouts.map(workout => (
              <div key={workout.Id} className='w-1/4 p-4'>
                <BasicCard routineName={workout.Name} dayofWeek={workout.DayOfWeek}/>
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );  
  };


export default calendarAthlete;