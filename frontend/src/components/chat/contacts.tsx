import React from "react";
import { Contact } from "./contactTag";

export function Contacts(params: {setSelectedContact: (contact: string) => void}) {

    const [contact, setContact] = React.useState('')

    return (
        <div className="contactsContainer">
            <div>
                <h1 style={{fontSize:'2em'}}>Contacts</h1>
            </div>
            <div className="scrollableContacts">
                <Contact name="Elizabeth Comestock" id={1} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Andrew Ryan" id={2} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Atlas"id={3} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Sofia Lamb" id={4} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Frank Fontaine" id={5} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Daisy Fitzroy" id={6} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Cornelius Slate" id={7} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Zachary Hale Comestock" id={8} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Rosie" id={9} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Big Daddy" id={10} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Little Sister" id={11} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Splicer" id={12} setSelectedContact={params.setSelectedContact}/>
                <Contact name="Handyman" id={13} setSelectedContact={params.setSelectedContact}/>
            </div>
        </div>
    );
}