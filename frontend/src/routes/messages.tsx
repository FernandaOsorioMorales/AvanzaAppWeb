import { useEffect } from 'react';
import { ChatWindow } from '../components/chat/chatWindow';
import ProtectedRoute from '../components/protectedRoute';
import React from "react";

export function Messages() {
    
    useEffect(() => {
        document.title = 'Mensajes';
      }, []);

    return (
        <div className='h-screen p-3 overflow-hidden'>
			<ProtectedRoute />
            <ChatWindow />
        </div>
    );
}
