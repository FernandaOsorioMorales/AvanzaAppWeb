import Title from "../components/landingpage/title";
import React from "react";
import ButtonMio from "../components/landingpage/button";
import LoginForm from "./login";
import RegisterForm from "./register";
import Navbar from "../components/landingpage/navBar";
import Carousel from "../components/landingpage/carousel";

export function Root() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="bg-blue-100 pb-11">
          <Title />
          <Carousel />
        </div>
      </div>
      
    );

  }
