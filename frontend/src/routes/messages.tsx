import { useEffect } from 'react';
import '../styles/messages.css'
import { Navigation } from '../components/chat/navigation';
import { ChatWindow } from '../components/chat/chatWindow';
import ProtectedRoute from '../components/protectedRoute';
import React from "react";

export function Messages() {
    
    useEffect(() => {
        document.title = 'Avanza - Messages';
      }, []);

    return (
        <div className='Container'>
			<ProtectedRoute />
            <Navigation />
            <ChatWindow />
        </div>
    );
}
