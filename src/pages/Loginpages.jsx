import React from "react";
import Headerlogin from "../log/Login/Headerlogin";
import Navbarlogin from "../log/Login/Navbarlogin";

export default function Loginpages() {
  return(
    <div>
      <div className="bg-zinc-900 h-screen">
        <Navbarlogin/>
        <Headerlogin/>
      </div> 
    </div>
  )
}