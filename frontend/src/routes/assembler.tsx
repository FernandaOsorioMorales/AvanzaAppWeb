import React, { useEffect, useState } from "react";
import { ListRoutines, Routine } from "../components/routineAssembler/ListRoutines";
import Modal from "../components/Modal.tsx";
import { CDRoutine } from "../components/routineAssembler/CDRoutine";
import axios from "axios";
import { toast } from "react-toastify";
import { SidebarTrainer } from "../components/SideBar/SidebarTrainer.tsx";

export function Assembler(){
    const [isOpen, setIsOpen] = useState(false);
    const [workouts, setWorkouts] = useState([] as any);
    const [newRoutine, setNewRoutine] = useState(false);
    
    async function fetchWorkouts() {
        let response = await axios({
            method: "get",
            url: "/api/workouts",
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
                <SidebarTrainer/>
            </div>
            <div className="w-full flex flex-col">
                <div className="h-1/16 flex flex-row align-middle justify-between">
                    <input className="w-1/2 bg-gray-600 h-12 m-6 text-white p-2 rounded" placeholder="Buscar Rutina"/>
                    <button onClick={() => setIsOpen(true)} className="w-1/6 bg-gray-500 h-12 m-6 text-white p-2 rounded">Crear nueva rutina</button>
                </div>

                <Modal open={isOpen} width="w-6/12" height="h-5/6" idElement="popups" z="10">
                    <CDRoutine onUpdate={() => setNewRoutine(!newRoutine)} onClose={() => setIsOpen(false)} RoutineName="Asigna un nombre para rutina" create={true}/>
                </Modal>

                <div className="p-5 h-full flex justify-center">
                    <ListRoutines >
                        { workouts != null ? workouts.map((workout) => {
                            return <Routine key={Number(workout.Workout.ID)} id={Number(workout.Workout.ID)} routineName={workout.Workout.Name.toString()} tags={workout.Tags != null ? workout.Tags.map(tag => tag.Value.toString()) : []}/>
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
