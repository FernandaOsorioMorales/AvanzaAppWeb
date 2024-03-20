import { Link } from 'react-router-dom'
import '../../styles/nav.css';
import React from "react";

export function Navigation(){
    return (
        <nav className="nav">
            <Link to='/' className='home'>
                <img src="https://cdn-icons-png.flaticon.com/256/18/18625.png"/>
            </Link>
        </nav>
    )
}