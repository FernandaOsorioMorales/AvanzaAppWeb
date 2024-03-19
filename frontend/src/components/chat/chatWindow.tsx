import '../../styles/chat.css';
import { Contacts } from './contacts';
import { Messenger } from './messenger';
import React from "react";

export function ChatWindow() {
    return (
        <div className='ChatContainer'>
            <Contacts />
            <Messenger />
        </div>
    )
}