import { SidebarTrainer } from '../SideBar/SidebarTrainer';
import { Contacts } from './contacts';
import { Messenger } from './messenger';
import React, { useEffect } from "react";

export function ChatWindow() {

    const [selectedContact, setSelectedContact] = React.useState("");
    const [contactID, setContactID] = React.useState(-1);

    return (
        <div className='flex h-full w-full'>
            <div className=''>
                <SidebarTrainer/>
            </div>
            <div className='flex w-full overflow-hidden'>
                <Contacts setSelectedContact={setSelectedContact} setContactID={setContactID}/>
                <Messenger selectedContact={selectedContact} contactID={contactID}/>
            </div>
        </div>
    )
}