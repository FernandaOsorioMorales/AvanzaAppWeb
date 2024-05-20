import Title from "../components/landingpage/title";
import React from "react";
import Navbar from "../components/landingpage/navBar";
import Carousel from "../components/landingpage/carousel";

export function Root() {
    return (
      <div className="flex-row h-screen overflow-hidden">
        <div>
          <Navbar />
        </div>
        <div className="bg-blue-100 h-full">
          <Title />
          <Carousel />
        </div>
      </div>
    );
  }
