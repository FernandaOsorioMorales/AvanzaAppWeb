import { useEffect } from 'react';
import { ChatWindowAthelete} from '../components/chat/chatWindowAthelete';
import ProtectedRoute from '../components/protectedRoute';
import React from "react";

export function MessagesAthlete() {
    
    useEffect(() => {
        document.title = 'Mensajes';
      }, []);

    return (

        <div className='h-screen p-3 overflow-hidden'>
			<ProtectedRoute />
            <ChatWindowAthelete />
        </div>
    );
}
