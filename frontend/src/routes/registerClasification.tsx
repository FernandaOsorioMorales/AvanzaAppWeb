import {useState} from "react";
import React from "react";
import axios from "axios";
import qs from 'qs';
import { Navigate } from 'react-router-dom';
import Navbar from "../components/landingpage/navBar";
import { Link } from 'react-router-dom';

export default function RegisterClasification(){
    return(
        <div>
        <div>
                <Navbar />
            </div>
        <div className="flex flex-col items-center justify-center h-screen">
            
            <div className="bg-blue-100 flex flex-col items-center justify-center p-10 w-full h-full">
                <h1 className="text-5xl text-center mb-6 text-gray-600 font-bold tracking-wide">Ya casi estás dentro pero antes, una pregunta:</h1>
                <Link to="/registerTrainer">
                    <button className="btn btn-outline bg-pink-700 text-blue-50 mb-5">Soy entrenador/a</button>
                </Link>
                <Link to="/registerUser">
                <button className="btn btn-outline bg-cyan-700 text-blue-50">Busco ser entrenado/a</button>
                </Link>
            </div>
        </div>
        </div>
    );
}


