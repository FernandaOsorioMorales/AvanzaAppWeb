import React from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";
import { toast } from 'react-toastify';

import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import ProtectedRoute from "../components/protectedRoute";
import BodyMeasurementsDisplay from "../components/profiles/BodyMeasurementsDisplay";
import SearchBar from "../components/profiles/SearchBar";
import SearchTrainers from "../components/profiles/SearchTrainers";
import { logout } from "../utils/login.ts";

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export function UserProfile(){
return (
<>
	<ProtectedRoute kindsAllowed={["athlete"]} />
    <div className="flex bg-blue-50">
        <div>
            <Sidebar>
                <SidebarItem icon={<Home size={20} />} text="Inicio" link="/trainerProfile" />
                <SidebarItem icon={<Calendar size={20} />} text="Mi agenda" />
                <SidebarItem icon={<MessageCircle size={20} />} text="Mis chats" link="messages"/>
                <hr className="my-40" />
                <SidebarItem icon={<Settings size={20} />} text="Editar mi perfil" link="/editTrainerProfile"/>
                <SidebarItem icon={<LogOut size={20} />} text="Salir" onClick={logOutAction} />
            </Sidebar>
        </div>
        <div className="p-7 text-2xl font-semibold flex-1 h-screen">
            <h1>¡Hola! Mira cómo luce tu semana</h1>
                <div className=" float-left w-1/2">
                <BodyMeasurementsDisplay />
                </div>
                {/* <SearchBar /> */}
				<SearchTrainers />
        </div>
        
    </div>
</>
);
}

export default UserProfile;
