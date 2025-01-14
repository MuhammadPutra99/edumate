import React from "react";
import Navbartodo from "../to-do/Navbartodo";
import Headertodo from "../to-do/Headertodo";

export default function Todopages() {

  return(
    <div>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-screen">
        <Navbartodo/>
        <Headertodo/>
      </div>
    </div>
  )
}