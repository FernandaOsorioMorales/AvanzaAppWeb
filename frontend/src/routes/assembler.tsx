import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import { ListRoutines, Routine } from "../components/routineAssembler/ListRoutines";
import Modal from "../components/routineAssembler/Modal";
import { CDRoutine } from "../components/routineAssembler/CDRoutine";
import axios from "axios";
import { toast } from "react-toastify";

export function Assembler(){
    const [isOpen, setIsOpen] = useState(false);
    const [workouts, setWorkouts] = useState([] as any);
    const [newRoutine, setNewRoutine] = useState(false);
    
    function fetchWorkouts() {
        axios({
            method: "get",
            url: "http://localhost:9090/workouts",
            withCredentials: true,
        }).then(res => {
            if ("data" in res === false)
                throw "unexpected response"
            const ans = res.data;
            setWorkouts(ans.workouts);
        }).catch(_ => {
			toast("Hubo un problema al recuperar tus datos");
        })
    }

    useEffect(() => {
        setTimeout(() => {
            fetchWorkouts();
        }, 200);
    }, [newRoutine])
    
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
                    <CDRoutine onUpdate={() => setNewRoutine(!newRoutine)} onClose={() => setIsOpen(false)} RoutineName="Asigna un nombre para rutina" Tags={["Pierna", "Cara"]} />
                </Modal>

                <div className="p-5 h-full flex justify-center">
                    <ListRoutines >
                        { workouts != null ? workouts.map((workout) => {
                            return <Routine key={Number(workout.Workout.ID)} id={Number(workout.Workout.ID)} routineName={workout.Workout.Name.toString()} tags={workout.Tags != null ? workout.Tags.map(tag => tag.Value.toString()) : []} />
                        }): <h1 className="text-2xl text-cyan-800 flex justify-center">No hay rutinas</h1>}
                    </ListRoutines>
                </div>
            </div>
        </div>

        <div id="popups"></div>
        <div id="miniPopups"></div>
    </>
    )
}