import Title from "../components/landingpage/title";
import React from "react";
import Button from "../components/landingpage/button";
import LoginForm from "./login";
import RegisterForm from "./register";

export function Root(){
    return (
        <div className="bg-blue-500">
           <Title/>
           <div className="">
            <Button/>
           </div>
        </div>
    );
}
