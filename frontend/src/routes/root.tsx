import Title from "../components/landingpage/title";
import React from "react";
import Button from "../components/landingpage/button";
import LoginForm from "../components/Login/login";
import RegisterForm from "../components/Login/register";

export default function Root(){
    return (
        <div className="bg-blue-500">
           <Title/>
           <div className="">
            <Button/>
           </div>
        </div>
    );
}
