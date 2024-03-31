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
                </div>
            </div>
        );
    }
}