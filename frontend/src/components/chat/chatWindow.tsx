import '../../styles/chat.css';
import { Contacts } from './contacts';
import { Messenger } from './messenger';
import React, { useEffect } from "react";

export function ChatWindow() {

    const [selectedContact, setSelectedContact] = React.useState("");
    const [contactID, setContactID] = React.useState(-1);

    return (
        <div className='ChatContainer'>
            <Contacts setSelectedContact={setSelectedContact} setContactID={setContactID}/>
            <Messenger selectedContact={selectedContact} contactID={contactID}/>
        </div>
    )
}