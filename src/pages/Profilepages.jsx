import React from "react";
import Headerprofile from "../profile/Headerprofile";
import Footerprofile from "../profile/Footerprofile";
import Footerextraprofile from "../profile/Footerextraprofile";
import Navbar from "../components/Navbar";

export default function Profilepages() {

  return(
    <div>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-screen">
        <Navbar/>
        <Headerprofile/>
      </div>

      <div className="bg-black mt-10">
        <Footerprofile/>
      </div>

      <div className="w-full h-[2px] bg-gray-800"></div>

      <div className="bg-black">
        <Footerextraprofile/>
      </div>
    </div>
  )
}