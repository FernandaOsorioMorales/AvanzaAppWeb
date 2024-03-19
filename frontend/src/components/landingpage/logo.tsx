import React from "react";
import logo from "../img/logo.png"


const Logo : React.FC= () => {
    return (
       <img
       className= "h-96 w-full rounded-lg object-cover object-center",
       src = {logo},
       alt = "logo"
    );
}x

export default Logo;
    