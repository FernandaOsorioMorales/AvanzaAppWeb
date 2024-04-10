import React from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";


export function TrainerProfile(){
return (
    <div className="flex bg-blue-50">
        <div>
            <Sidebar>
                <SidebarItem icon={<Home size={20} />} text="Inicio"  />
                <SidebarItem icon={<Calendar size={20} />} text="Mi agenda" />
                <SidebarItem icon={<Layers size={20} />} text="Ensamblador de rutinas" />
                <SidebarItem icon={<MessagesSquare size={20} />} text="Mis Foros" />
                <hr className="my-20" />
                <SidebarItem icon={<Dumbbell size={20} />} text="Mi especialización" />
                <SidebarItem icon={<Settings size={20} />} text="Editar mi perfil" />
            </Sidebar>
        </div>
        <div className="p-7 text-2xl font-semibold flex-1 h-screen"> 
            <h1>¡Hola Entrenador! Mira como luce tu semana</h1>
            <a href="/editTrainerProfile">EDIT PROFILE</a>
        </div>
    </div>
);
}

export default TrainerProfile;