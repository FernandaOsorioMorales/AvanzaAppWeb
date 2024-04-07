import Title from "../components/landingpage/title";
import React from "react";
import Button from "../components/landingpage/button";
import LoginForm from "./login";
import RegisterForm from "./register";
import Carousel from "../components/landingpage/carousel";

export function Root() {
    return (
      <div className="bg-azulote flex flex-col justify-center items-center h-screen">
        <div className="mb-15">
          <Title text="Entrar al mundo fitness nunca había sido tan fácil" />
        </div>
      <div className="">
            <Button to="/login" text="Sign In" color="bg-white" />
        </div>
        <div> 
            <Button to="/register" text="¿Aún no tienes cuenta? Regístrate" color="bg-azulote"/>
        </div>
      </div>
    );

  }
