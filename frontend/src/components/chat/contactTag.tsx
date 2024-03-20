import React from "react";
import '../../styles/contact.css'

export function Contact(props: {name: string, id: number, setSelectedContact: (contact: string) => void}){
    return (
        <div>
            <button className="ContactButton" onClick={() => props.setSelectedContact(props.name)}> 
                <img style={{width:'50px', height:'50px'}}
                    src="https://img.icons8.com/dotty/80/group-background-selected.png" 
                    alt="group-background-selected"
                />
                {props.name} 
            </button>
        </div>
    )
}