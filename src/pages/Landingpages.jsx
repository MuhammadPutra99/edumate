import React from "react";
import Bodylanding from "../landing/Left Div/Bodylanding";
import Footerlanding from "../landing/Left Div/Footerlanding";
import Navbarlanding from "../landing/Left Div/Navbarlanding";
import Headerlanding from "../landing/Right Div/Headerlanding";

export default function Landingpages() {

  return(
    <div className="flex flex-row bg-gray-900">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 h-screen w-1/2">
        <Navbarlanding/>
        <Bodylanding/>
        <Footerlanding/>
      </div>

      <div className="bg-white h-screen w-1/2 rounded-l-3xl">
        <Headerlanding/>
      </div>
    </div>
  )
}