import React, { createContext, useState, useContext } from 'react';
import { ChevronFirst, ChevronLast, Home, Calendar, MessageCircle, Settings, LogOut } from 'lucide-react';
import Sidebar, { SidebarItem } from "../SideBar/Sidebar";
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import { logout } from "../../utils/login";

const SidebarContext = createContext({
    expanded: false,
    toggleExpanded: () => {}, // Placeholder para toggle function
});

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export const SidebarAthlete = () => {
    const [expanded, setExpanded] = useState(false);
    
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        


                <nav className="flex-1 px-3">
                    <Sidebar>
                        <SidebarItem icon={<Home size={20} />} text="Inicio" link="/userProfile" />
                        <SidebarItem icon={<Calendar size={20} />} text="Mi agenda" link="/calendarAthlete" />
                        <SidebarItem icon={<MessageCircle size={20} />} text="Mis chats" link="/messagesAthlete" />
                        <hr className="my-20" />
                        <SidebarItem icon={<Settings size={20} />} text="Editar mi perfil" link="/editAthleteProfile" />
                        <SidebarItem icon={<LogOut size={20} />} text="Salir" onClick={logOutAction}/>
                    </Sidebar>
                    
                </nav>
    );
};

export const useSidebarContext = () => {
    return useContext(SidebarContext);
};
