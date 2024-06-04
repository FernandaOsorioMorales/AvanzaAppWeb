import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import  Sidebar, {SidebarItem } from '../components/SideBar/Sidebar.tsx';
import ProtectedRoute from "../components/protectedRoute.tsx";
import { logout } from "../utils/login.ts";
import { SidebarTrainer } from "../components/SideBar/SidebarTrainer.tsx";
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export default function calendarTrainer() {
  return (
    <div className='flex bg-blue-50 min-h-screen'>
      <div>
        <SidebarTrainer/>
      </div>
      <div className='flex flex-col items-center justify-center flex-1 p-8'>
        <h3 className='text-rose-700 text-3xl font-bold mb-6'>
          ¡Hola! Mira cómo luce tu semana
        </h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="rounded-lg shadow-lg bg-white p-6 w-full max-w-3xl">
            <div className="h-96 w-96">
              <DateCalendar />
            </div>
          </div>
        </LocalizationProvider>
      </div>
    </div>
  );
}