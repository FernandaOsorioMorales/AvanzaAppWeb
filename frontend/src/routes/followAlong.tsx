import React from "react";
import { useEffect } from "react";
import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import ProtectedRoute from '../components/protectedRoute';

export function FollowAlong(){
    useEffect(() => {
        document.title = 'Avanza - FollowAlong';
      }, []);

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
                <h1>¿Listo para comenzar?</h1>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default FollowAlong;