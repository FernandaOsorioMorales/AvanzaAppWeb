import React from "react";
import axios from "axios";
import qs from 'qs';
import { Navigate } from 'react-router-dom'

export function TrainerProfile(){
    return (
        <div className="flex">
            <div className={'w-72 h-screen bg-azulito'}>
            </div>
            <div className = "p-7 text-2xl font-semibold flex-1 hscreen">
                <h1>Mi perfil</h1>
            </div>
        </div>
    );
}

export default TrainerProfile;