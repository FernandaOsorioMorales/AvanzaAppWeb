import React from "react";
import { Contact } from "./contactTag";

export function Contacts() {

    return (
        <div className="contactsContainer">
            <div>
                <h1 style={{fontSize:'2em'}}>Contacts</h1>
            </div>
            <div className="scrollableContacts">
                <Contact name="Elizabeth Comestock" id={1}/>
                <Contact name="Andrew Ryan" id={2}/>
                <Contact name="Atlas"id={3}/>
                <Contact name="Sofia Lamb" id={4}/>
                <Contact name="Frank Fontaine" id={5}/>
                <Contact name="Daisy Fitzroy" id={6}/>
                <Contact name="Cornelius Slate" id={7}/>
                <Contact name="Zachary Hale Comestock" id={8}/>
                <Contact name="Rosie" id={9}/>
                <Contact name="Big Daddy" id={10}/>
                <Contact name="Little Sister" id={11}/>
                <Contact name="Splicer" id={12}/>
                <Contact name="Handyman" id={13}/>
            </div>
        </div>
    );
}