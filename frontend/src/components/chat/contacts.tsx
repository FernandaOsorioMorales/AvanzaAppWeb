import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import React from "react";
import { Contact } from "./contactTag";

// Data type for contact.
interface Cnt {
    Id: number;  //Contact id
    Alias: string; //Contact alias
}

// Data type for specific API respose. (Is this ok ?)
interface Resp {
    contacts: Cnt[]; //Contact list
}

export function Contacts(params: {setSelectedContact: (contact: string) => void, setContactID: (id: number) => void}) {

    const [contacts, setContacts] = useState<Cnt[]>([]);

    useEffect(() => {
        axios.get<Resp>('http://localhost:9090/contacts', 
                {withCredentials: true}
            ).then((response: AxiosResponse<Resp>) => {
                console.log(response);
                setContacts(response.data.contacts);
            }).catch(error => {
                console.error('Error when retrieving contact list:', error);
            });
    }, []);

    if (contacts !== null) {
        return (
            <div className="contactsContainer">
                <div>
                    <h1 style={{fontSize:'2em'}}>Contactos</h1>
                </div>
                <div className="scrollableContacts">
                    {contacts.map(contact => (
                        <Contact name={contact.Alias} id={contact.Id} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    ))}                
                </div>
            </div>
        );
    } else {
        return (
            <div className="contactsContainer">
                <div>
                    <h1 style={{fontSize:'2em'}}>Contacts</h1>
                </div>
                <div className="scrollableContacts">
                    <Contact name="Elizabeth Comestock" id={1} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Andrew Ryan" id={2} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Atlas"id={3} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Sofia Lamb" id={4} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Frank Fontaine" id={5} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Daisy Fitzroy" id={6} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Cornelius Slate" id={7} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Zachary Hale Comestock" id={8} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Rosie" id={9} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Big Daddy" id={10} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Little Sister" id={11} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Splicer" id={12} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                    <Contact name="Handyman" id={13} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                </div>
            </div>
        );
    }
}