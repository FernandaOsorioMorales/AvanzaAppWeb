import { useEffect } from 'react';
import '../styles/messages.css'
import { Navigation } from '../components/navigation';
import { ChatWindow } from '../components/chatWindow';


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