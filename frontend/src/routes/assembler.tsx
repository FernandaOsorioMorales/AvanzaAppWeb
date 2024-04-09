import React from "react";
import '../styles/messages.css'
import { Navigation } from "../components/chat/navigation";
import { Routines } from "../components/routineAssembler/routines";

export function Assembler(){
    return (
        <div className='Container'>
            <Navigation />
            <Routines />
        </div>
    )
}