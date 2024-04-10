import React from "react";

export function ListRoutines({ children } : { children: React.ReactNode }){
    return (
        <div className="w-5/6 flex flex-col content-center">
            <ol>{children}</ol>
        </div>
    )
}

export function Routine(params: {routineName: string, tags: string[]}){
    return (
        <div className="w-full h-16 rounded flex flex-row justify-around bg-blue-100">
            <h1>{params.routineName}</h1>
            <ul className="flex flex-row">
                {params.tags.map((tag) => <li>{tag}</li>)}
            </ul>

            <div className="w-fit flex justify-between">
                <button className="w-fit bg-gray-50 h-12 m-4 text-black p-2 rounded">
                    Compartir
                </button>

                <button className="w-fit bg-gray-50 h-12 m-4 text-black p-2 rounded">
                    Editar
                </button>
            </div>
        </div>
    )
}