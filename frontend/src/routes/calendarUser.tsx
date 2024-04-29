import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import  Sidebar, {SidebarItem } from '../components/SideBar/Sidebar.tsx';
import ProtectedRoute from "../components/protectedRoute.tsx";
import { SidebarAthlete } from "../components/SideBar/SidebarAthlete.tsx";
import { logout } from "../utils/login.ts";
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export default function CalendarUser() {
  return (
    <div className='flex bg-blue-50'>
      <div>
        <SidebarAthlete/>
      </div>
      <div className='flex flex-col items-center p-4'>
        <h3 className='text-rose-700 text-3xl font-bold mb-4'>
          ¡Hola! Mira cómo luce tu semana
        </h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex justify-center items-center h-96 w-96"> 
            <DateCalendar /> 
          </div>
        </LocalizationProvider>
      </div>
      
    </div>
  );
}