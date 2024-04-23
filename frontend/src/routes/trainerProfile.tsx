import React from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import ProtectedRoute from "../components/protectedRoute";


export function TrainerProfile(){
return (
<>
	<ProtectedRoute kindsAllowed={["trainer"]} />
    <div className="flex bg-blue-50">
        <div>
            <Sidebar>
                <SidebarItem icon={<Home size={20} />} text="Inicio" link="/trainerProfile" />
                <SidebarItem icon={<Calendar size={20} />} text="Mi agenda" />
                <SidebarItem icon={<Layers size={20} />} text="Ensamblador de rutinas" link="routines"/>
                <SidebarItem icon={<MessagesSquare size={20} />} text="Mis Foros" />
                <SidebarItem icon={<MessageCircle size={20} />} text="Mis chats" link="messages"/>
                <hr className="my-20" />
                <SidebarItem icon={<Dumbbell size={20} />} text="Mi especialización"/>
                <SidebarItem icon={<Settings size={20} />} text="Editar mi perfil" link="/editTrainerProfile"/>
            </Sidebar>
        </div>
        <div className="p-7 text-2xl font-semibold flex-1 h-screen"> 
            <h1>¡Hola Entrenador! Mira como luce tu semana</h1>
        </div>
    </div>
</>
);
}

export default TrainerProfile;
