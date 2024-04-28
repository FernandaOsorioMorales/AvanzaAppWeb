import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import  Sidebar, {SidebarItem } from '../components/SideBar/Sidebar.tsx';
import ProtectedRoute from "../components/protectedRoute.tsx";
import { logout } from "../utils/login.ts";
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export default function calendarTrainer() {
  return (
    <div className='flex bg-blue-50'>
      <div>
      <Sidebar>
                <SidebarItem icon={<Home size={20} />} text="Inicio" link="/trainerProfile" />
                <SidebarItem icon={<Calendar size={20} />} text="Mi agenda" link="/calendar"/>
                <SidebarItem icon={<Layers size={20} />} text="Ensamblador de rutinas" link="/workouts"/>
                <SidebarItem icon={<MessagesSquare size={20} />} text="Mis Foros" />
                <SidebarItem icon={<MessageCircle size={20} />} text="Mis chats" link="/messages"/>
                <hr className="my-20" />
                <SidebarItem icon={<Dumbbell size={20} />} text="Mi especialización"/>
                <SidebarItem icon={<Settings size={20} />} text="Editar mi perfil" link="/editTrainerProfile"/>
                <SidebarItem icon={<LogOut size={20} />} text="Salir" onClick={logOutAction} />
            </Sidebar>
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