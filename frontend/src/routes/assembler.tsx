import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import { ListRoutines, Routine } from "../components/routineAssembler/ListRoutines";
import Modal from "../components/routineAssembler/Modal";
import { CDRoutine } from "../components/routineAssembler/CDRoutine";

export function Assembler(){
    const [isOpen, setIsOpen] = useState(false);
    
    return (
    <>
        <div className="flex bg-blue-50">
            <div>
                <Sidebar >
                    <SidebarItem icon={<Home size={20} />} text="Inicio" link="/trainerProfile" />
                    <SidebarItem icon={<Calendar size={20} />} text="Mi agenda" />
                    <SidebarItem icon={<Layers size={20} />} text="Ensamblador de rutinas" />
                    <SidebarItem icon={<MessagesSquare size={20} />} text="Mis Foros" />
                    <hr className="my-20" />
                    <SidebarItem icon={<Dumbbell size={20} />} text="Mi especialización" />
                    <SidebarItem icon={<Settings size={20} />} text="Editar mi perfil" link="editTrainerProfile"/>
                </Sidebar>
            </div>

            <div className="w-full flex flex-col">
                <div className="h-1/16 flex flex-row align-middle justify-between">
                    <input className="w-1/2 bg-gray-600 h-12 m-6 text-white p-2 rounded" placeholder="Buscar Rutina"/>
                    <button onClick={() => setIsOpen(true)} className="w-1/6 bg-gray-500 h-12 m-6 text-white p-2 rounded">Crear nueva rutina</button>
                </div>

                <Modal open={isOpen} width="w-6/12" height="h-5/6" idElement="popups" z="10">
                    <CDRoutine onClose={() => setIsOpen(false)} RoutineName="Asigna un nombre para rutina" Tags={["Pierna", "Cara"]} />
                </Modal>

                <div className="p-5 h-full flex justify-center">
                    <ListRoutines >
                        <Routine id={1} routineName='Rutina con un nombre cómicamente XL' tags={["omóplato"]}/>
                        <Routine id={2} routineName='Rutina de Pecho' tags={["pierna", "cara", "abdomen", "pecho"]}/>
                        <Routine id={3} routineName='Rutina de Cara' tags={["pierna", "cara", "abdomen", "pecho", "cardio"]}/>

                    </ListRoutines>
                </div>
            </div>
        </div>

        <div id="popups"></div>
        <div id="miniPopups"></div>
    </>
    )
}