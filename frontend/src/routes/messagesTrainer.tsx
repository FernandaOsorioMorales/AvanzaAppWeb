import { useEffect } from 'react';
import { ChatWindowTrainer} from '../components/chat/chatWindowTrainer';
import ProtectedRoute from '../components/protectedRoute';
import React from "react";

export function MessagesTrainer() {
    
    useEffect(() => {
        document.title = 'Mensajes';
      }, []);

    return (

        <div className='h-screen p-3 overflow-hidden'>
			<ProtectedRoute />
            <ChatWindowTrainer />
        </div>
    );
}
