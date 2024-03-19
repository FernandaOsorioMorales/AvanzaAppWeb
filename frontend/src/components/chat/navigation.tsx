import { Link } from 'react-router-dom'
import '../../styles/nav.css';
import React from "react";

export function Navigation(){
    return (
        <nav className="nav">
            <Link to='/' className='home'>
                <img src='../../public/home.svg'/>
            </Link>
        </nav>
    )
}