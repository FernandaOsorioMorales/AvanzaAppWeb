import React, { createContext, useState, useContext } from 'react';
import { ChevronFirst, ChevronLast} from 'lucide-react';
import Sidebar, { SidebarItem } from "../SideBar/Sidebar";
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import { logout } from "../../utils/login";
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";

const SidebarContext = createContext({
    expanded: false,
    toggleExpanded: () => {}, // Placeholder para toggle function
});


function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export const SidebarTrainer = () => {
    const [expanded, setExpanded] = useState(false);
    
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        

                <nav className="flex-1 px-3">
                    <Sidebar>
                        <SidebarItem icon={<Home size={20} />} text="Inicio" link="/trainerProfile" />
                        <SidebarItem icon={<Calendar size={20} />} text="Mi agenda" link="/calendarTrainer" />
                        <SidebarItem icon={<Layers size={20} />} text="Ensamblador de rutinas" link="/workouts"/>
                        <SidebarItem icon={<MessagesSquare size={20} />} text="Mis Foros" link="/forum"/>
                        <SidebarItem icon={<MessageCircle size={20} />} text="Mis chats" link="/messagesTrainer" />
                        <hr className="my-20" />
                        <SidebarItem icon={<Settings size={20} />} text="Editar mi perfil" link="/editTrainerProfile"/>
                        <SidebarItem icon={<LogOut size={20} />} text="Salir" onClick={logOutAction} />
                    </Sidebar>
                    
                </nav>
    );
};

export const useSidebarContext = () => {
    return useContext(SidebarContext);
};
