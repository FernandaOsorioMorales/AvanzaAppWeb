import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import  Sidebar, {SidebarItem } from '../components/SideBar/Sidebar.tsx';
import ProtectedRoute from "../components/protectedRoute.tsx";
import { SidebarAthlete } from "../components/SideBar/SidebarAthlete.tsx";
import { logout } from "../utils/login.ts";
import { toast } from "react-toastify";
import BasicCard from '../components/calendar/card.tsx';

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export default function CalendarAthlete() {
  return (
    <div className='flex bg-blue-50'>
      <div>
        <SidebarAthlete/>
      </div>
      <div className='flex flex-col items-center p-4'>
        <h3 className='text-[#DC5663] text-3xl font-bold mb-4'>
          ¡Hola! Mira cómo luce tu semana
        </h3>
        <div className="flex flex-wrap">
          <div className="w-1/4 p-4">
            <BasicCard musculo='Pierna'/> {/* vendrá del atributo name de training plan */}
          </div>
          <div className="w-1/4 p-4">
            <BasicCard musculo='Hombro y Espalda'/>
          </div>
          <div className="w-1/4 p-4">
            <BasicCard musculo='Pecho'/>
          </div>
          <div className="w-1/4 p-4">
            <BasicCard musculo='Glúteo'/>
          </div>
          <div className="w-1/4 p-4">
            <BasicCard musculo='Bíceps'/>
          </div>
          <div className="w-1/4 p-4">
            <BasicCard musculo='Tríceps'/>
          </div>
          <div className="w-1/4 p-4">
            <BasicCard musculo='Abdomen'/>
          </div>
        </div>
      </div>
      <div>
      
        
      </div>
      
    </div>
  );
}