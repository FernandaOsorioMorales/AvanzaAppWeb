import React, { useState } from "react";
import { EllipsisVertical } from 'lucide-react';
import Modal from "./Modal";
import { CDRoutine } from "./CDRoutine";

export function ListRoutines({ children } : { children: React.ReactNode }){
    return (
        <div className="w-11/12 flex flex-col content-center">
            <ol>{children}</ol>
        </div>
    )
}

export function Routine(params: {routineName: string, tags: string[]}){
    const [isOpen, setIsOpen] = useState(false);
    const [ModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Modal open={ModalOpen} >
                        <CDRoutine onClose={() => setModalOpen(false)} RoutineName={params.routineName} Tags={params.tags} Exercises={""}></CDRoutine>
            </Modal>
            
            <div className="w-full h-20 mb-6 rounded flex flex-row justify-around items-center bg-blue-100">
                <h1 className="w-1/4 flex justify-center items-center h-16 text-xl text-gray-600">{params.routineName}</h1>
                <ul className="w-1/3 flex flex-row justify-around">
                    {params.tags.map((tag, index) => <li key={index} className=" p-2 text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-gray-600 text-gray-300">{tag}</li>)}
                </ul>

                <div className="w-fit flex justify-between">
                    <button className="h-12 mr-6 py-2.5 rounded px-5 me-2 mb-2 text-sm font-medium focus:z-10 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
                        Compartir
                    </button>

                    <button onClick={() => setModalOpen(true)} className="h-12 mr-6 py-2.5 rounded px-5 me-2 mb-2 text-sm font-medium focus:z-10 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
                        Editar
                    </button>
                </div>
                
                <div className="relative">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <EllipsisVertical size={25}/>
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 mt-2 w-24 bg-white rounded-md shadow-lg" onMouseLeave={() => setIsOpen(false)}>
                            <ul className="list-reset">
                                <li>
                                    <button
                                        onClick={() => alert("Duplicar :)")}
                                        className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                                        >
                                        <p>Duplicar</p>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => alert("Ha elegido el camino de la muerte")}
                                        className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white"
                                        >
                                        <p>Eliminar</p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}