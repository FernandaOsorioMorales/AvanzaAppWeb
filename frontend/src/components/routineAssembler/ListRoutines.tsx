import React, { useState } from "react";
import { EllipsisVertical } from 'lucide-react';
import Modal from "./Modal";
import { CDRoutine } from "./CDRoutine";
import { Tag } from "./Tags";


export function ListRoutines({ children } : { children: React.ReactNode }){
    return (
        <div className="w-11/12 flex flex-col content-center">
            <ol>{children}</ol>
        </div>
    )
}

export function Routine(params: {routineName: string, tags: string[], id: number}){
    const [isOpen, setIsOpen] = useState(false);
    const [ModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Modal open={ModalOpen} width="w-6/12" height="h-5/6" idElement="popups" z="10">
                <CDRoutine onUpdate={() => true} onClose={() => setModalOpen(false)} RoutineName={params.routineName} id={params.id} create={false} />
            </Modal>

            <div className="w-full h-20 mb-6 rounded flex flex-row justify-around items-center bg-blue-100 relative">
                <div className="flex flex-row absolute left-8 w-10/12">
                    <h1 className="w-1/3 flex justify-center items-center h-16 text-xl font-bold text-cyan-800">
                        {params.routineName}
                    </h1>
                    <ul className="w-full flex flex-row justify-center items-center">
                        {params.tags.map((tag, index) => <Tag key={index} tag={tag}/>)}
                    </ul>
                </div>

                <div className="w-fit flex justify-between items-center absolute right-2">
                    <button onClick={() => setModalOpen(true)} className="h-12 py-2.5 mr-3 rounded px-5 text-sm font-medium focus:z-10 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
                        Editar
                    </button>
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
            </div>
        </>
    )
}