import axios, { AxiosResponse } from "axios";
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
        axios.get<Resp>('/api/contacts', 
                {withCredentials: true}
            ).then((response: AxiosResponse<Resp>) => {
                console.log(response);
                setContacts(response.data.contacts);
            }).catch(error => {
                console.error('Error when retrieving contact list:', error);
            });
    }, []);

    return (
        <div className="flex-row justify-center w-2/12 bg-blue-50 rounded-xl">
            <div>
                <h1 className="flex text-3xl justify-center h-10 text-cyan-900">Contactos</h1>
            </div>
            <div className="scrollableContacts">
                {contacts != null ? contacts.map(contact => (
                    <Contact key={contact.Id} name={contact.Alias} id={contact.Id} setSelectedContact={params.setSelectedContact} setContactID={params.setContactID}/>
                )): <div className="scrollableContacts"></div>}                
            </div>
        </div>
    );
}
