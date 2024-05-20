import React from "react";

export function Message(props: {isTag: boolean, msg_type: string, content: string}){
    if (props.isTag) {
        return (
            <div className='flex w-full items-center justify-center'>
                <span className='bg-cyan-800 opacity-90 rounded-lg w-fit h-fit px-3 py-1 text-blue-50 '> El instructor ha asignado una rutina </span>
            </div>
        )
    }

    const alingText = props.msg_type == 'LMessage' ? 'justify-start' : 'justify-end';
    const StyleMessage = "w-fit p-2 mb-2 text-blue-50 rounded-lg max-w-5xl break-all";

    return (
        <div className={`flex w-full items-center ${alingText}`}>
            {props.msg_type == 'LMessage' && <div className="w-2 h-2 mr-2 rounded-full bg-orange-600"></div>}
            <p className= {`${StyleMessage} ${props.msg_type == 'LMessage' ? 'bg-orange-600' : 'bg-teal-600'}`}> 
                {props.content}
            </p>
            {props.msg_type == 'RMessage' && <div className="w-2 h-2 ml-2 rounded-full bg-teal-600"></div>}
        </div>
    )
}

<div className='flex w-full items-center justify-center'>
    <span className='bg-orange-600 opacity-65 rounded-sm w-fit h-fit px-3 py-1'> Hola etiqueta </span>
</div>