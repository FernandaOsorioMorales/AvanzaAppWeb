import '../../styles/chat.css';
import { Contacts } from './contacts';
import { Messenger } from './messenger';
import React, { useEffect } from "react";

export function ChatWindow() {

    const [selectedContact, setSelectedContact] = React.useState("");

    return (
        <div className='ChatContainer'>
            <Contacts setSelectedContact={setSelectedContact}/>
            <Messenger selectedContact={selectedContact}/>
        </div>
    )
}