import React from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import { ListRoutines, Routine } from "../components/routineAssembler/ListRoutines";

export function Assembler(){
    return (
        <div className="flex bg-blue-50">
            <div>
                <Sidebar >
                    <SidebarItem icon={<Home size={20} />} text="Inicio"  />
                    <SidebarItem icon={<Calendar size={20} />} text="Mi agenda" />
                    <SidebarItem icon={<Layers size={20} />} text="Ensamblador de rutinas" />
                    <SidebarItem icon={<MessagesSquare size={20} />} text="Mis Foros" />
                    <hr className="my-20" />
                    <SidebarItem icon={<Dumbbell size={20} />} text="Mi especialización" />
                    <SidebarItem icon={<Settings size={20} />} text="Editar mi perfil" />
                </Sidebar>
            </div>

            <div className="w-full flex flex-col">
                <div className="h-1/16 flex flex-row align-middle justify-between">
                    <input className="w-1/2 bg-gray-600 h-12 m-6 text-white p-2 rounded" placeholder="Buscar Rutina"/>
                    <button className="w-1/6 bg-gray-500 h-12 m-6 text-white p-2 rounded">Crear nueva rutina</button>
                </div>

                <div className="bg-yellow-500 h-full flex justify-center">
                    <ListRoutines >
                        <Routine routineName='Rutina de piernas' tags={["pierna", "pantorrilla", "cara"]}/>
                    </ListRoutines>
                </div>
            </div>
        </div>
    )
}