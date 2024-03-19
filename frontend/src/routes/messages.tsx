import { useEffect } from 'react';
import '../styles/messages.css'
import { Navigation } from '../components/chat/navigation';
import { ChatWindow } from '../components/chat/chatWindow';
import React from "react";

export function Messages() {
    
    useEffect(() => {
        document.title = 'Avanza - Messages';
      }, []);

    return (
        <div className='Container'>
            <Navigation />
            <ChatWindow />
        </div>
    );
}