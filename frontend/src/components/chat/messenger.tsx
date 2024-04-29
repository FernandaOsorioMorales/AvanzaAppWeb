import { useEffect, useRef, useState } from 'react';
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

        var ws = '/ws/chat?id=' + idParam;
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
            <div className="messengerContainerEmpty">
                <h1 style={{fontSize:'3em', color:'#b7d0d8'}} >Selecciona un chat para comenzar</h1>
            </div>
        )
    }else{
        return (
            <div className="messengerContainer">
                <div className="UserName">
                    <h1 style={{fontSize:'2em'}}>{params.selectedContact}</h1>
                </div>
                <div className="ChatMessages" ref={messageBodyRef}>
                    {msgArray.map((msg, index) => {
                        return <Message key={index} msg_type={msg.sent == true ? 'RMessage' : 'LMessage'} content={msg.content} />
                    })}
                </div>
                <form onSubmit={sendMessage} className="SendMessage">
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        
                    </div>
                    <input 
                        placeholder="Type Something here"
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value);
                        }}
                        />
                    <button className="SendButton">
                        <img className='SendIcon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAklEQVR4nO2ZOWgVURSGbzSS4BIR8tyChVEQREWwUbQRlWCnhSAIWqmISFoLQbEKEo2onWAhSEBBxK1UESxcGmOiIKiFO7hLNOLyySH/I9fJm/dm5i2Zkfc1ydw598z5OWfO3Hufc3Xq1PkvAFqATuAxcMNlDWABcBz4wgiPXBYAGoC1wFngF6PpdGkGmALsAAYIxzIz1aURYB7QBXzwAn4JnABeBIQccyksnw7gCvDbC/QasAGYCfRp7Ln+/rF3xqUBYLLKp98Lfgg4DSyRTc4T8RDo1v9Xxzp+C65d5fPeE/AKOAC0ena5gIg24Kmu14+lgFUFus89YCvQGLDNBURYeW3UtX0/xtU6+GYF+iBQPiZoecicUSI0fl1je8a6fF6rfHJF5oWJWKQX3FpuSy3L52eB8plQYm5BEQZwUuNHXQ3KJx+E8UOCVkT0UUzENGCwai0XmK1SeecJeKOSaovhJ1SEAezVvcuuRuVj34TmmL5KiRgPPNP9jkoE36TyuV+gfFYm9FlUhAFsqkjLDSmftyqfOWX4LSnCAG7KZrdLihZq/sfrrrLSlNjpaBF9Ye0YWCqbT7YaLueB+eUAKqmF5QiII8IATsmux5WDlgU9wDc5tJVpb1JBMUXkgO965vyyhAScdqmX5wVdstRX+p3w7PfJ9mJFRFRCUAIRjd6+Y13FhSQRFFeE5mz27BuqJiSqoCQiNO+W5uyquojAg2cAhwOCeqO+2AFfyzTno+0gqx994SBa9fH87LXtyJmQD9vmGt3VjTZaMNOBcwqoN2Zmh5TRdpcGlJ2vCmpxxDn7Jf6CSxPeiUfJrNimyzu3WuPShEplMEpWgC0SMVCTlhsXdbOSWQFuy26nSyNEyIqdpngtd5JLK5TICnBG9w+5NEORrACztNO0fc9cl3aAI4WyAhzU+HmXBRje2/yTFZ0D2KmLsdplBQJZAbbpuj+VLTdqVoA7ErLdZQ2Gt854x0p2NjzRZQ1GspKny2UVRrKSjZZbIitP7DfzUKM6deq4avEXfFisjrL4iOMAAAAASUVORK5CYII="/>
                    </button>
                </form>
            </div>
        );
    }
}
