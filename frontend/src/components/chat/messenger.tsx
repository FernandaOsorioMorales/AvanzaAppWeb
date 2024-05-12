import { useEffect, useRef, useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Message } from './message';
import { useSelector } from "react-redux";
import React from "react";

export function Messenger(params: {selectedContact: string, contactID: number}) {

    const idParam = useSelector(state => state.user.id);
    console.log(idParam)
    const [message, setMessage] = useState('')
    const [msgArray, setmsgArray] = useState<Array<{ sent: boolean, content: string }>>([]);
    const [socket, setSocket] = useState<WebSocket>();
    const messageBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(msgArray)
        if (messageBodyRef.current) {
            messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
        }
    }, [msgArray]);

    useEffect(() => {
        if (idParam === null)
            return ;

        // VILE
        const loc = window.location;
        const ws = `ws://${loc.host}/ws/chat?id=${idParam}`;
        console.log(ws);

        const newSocket = new WebSocket(ws);

        newSocket.onopen = () => {
            console.log('Connected to the server');
        }

        newSocket.onmessage = (event) => {
            setmsgArray(prevMsgArray => [...prevMsgArray, { sent: false, content: JSON.parse(event.data).content }])
        }
        
        newSocket.onclose = () => {
            console.log('Disconnected from the server');
        }

        setSocket(newSocket);
    }, [idParam]);

    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message === '')
            return ;
        setmsgArray([...msgArray, { sent: true, content: message }]);
        setMessage('');
        socket?.send(JSON.stringify({ 
            "IdAddressee": Number(params.contactID),
            "IdTransmitter": Number(idParam),
            "SentTime": new Date(),
            "content": message 
        }));
    };

    if(params.contactID === -1){
        return (
            <div className="flex w-full ml-4 items-center justify-center bg-blue-100 text-cyan-900 rounded-sm">
                <h1 className=' text-3xl' >Selecciona un chat para comenzar</h1>
            </div>
        )
    }else{
        return (
            <div className="flex-col w-full ml-4 bg-blue-50 text-cyan-900 rounded-sm flex-nowrap">
                <div className="flex h-16 mx-3 mt-2 rounded-md justify-center items-center text-4xl font-bold text-blue-50 bg-cyan-800">
                    <h1>
                        {params.selectedContact}
                    </h1>
                </div>
                <div className="flex-row overflow-y-scroll h-83vh max-h-83vh bg-slate-200 mx-3 my-1 rounded-sm px-1 pt-2" ref={messageBodyRef}>
                    {msgArray.map((msg, index) => {
                        return <Message key={index} msg_type={msg.sent == true ? 'RMessage' : 'LMessage'} content={msg.content} />
                    })}
                </div>
                <form onSubmit={sendMessage} className="flex items-center h-14 bg-gray-600 mx-3 rounded-md">
                    <button className='flex justify-center items-center bg-cyan-800 p-3 w-fit h-3/4 rounded-lg text-blue-50 mx-2 hover:bg-teal-600'>
                        Asignar Rutina
                    </button>
                    <input className='flex-grow bg-gray-600 text-blue-50 p-2 rounded-md focus:outline-none'
                        placeholder="Type Something here"
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value);
                        }}
                    />
                    <button className="w-fit h-fit bg-cyan-800 hover:bg-teal-600 rounded-lg mr-2 p-2">
                        <SendHorizontal size={24} color='#fff'/>
                    </button>
                </form>
            </div>
        );
    }
}
