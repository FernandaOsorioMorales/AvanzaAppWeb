import '../styles/chat.css';
import { Contacts } from './contacts';
import { Messenger } from './messenger';

export function ChatWindow() {
    return (
        <div className='ChatContainer'>
            <Contacts />
            <Messenger />
        </div>
    )
}