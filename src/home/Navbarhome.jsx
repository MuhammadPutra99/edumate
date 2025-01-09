import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../AddItem.css';

export default function Navbarhome() {

  const [active, setActive] = useState('Edumate');

  const textBold = () => {
    setActive(active.display.black);
  }

  return (
    <div className="flex flex-row justify-center items-center pt-8">
      <ul className="flex md:text-xl font-normal gap-x-5 md:gap-x-14">
          <Link to="/" className="montserrat text-slate-300 hover:text-white" onClick={textBold}>
            Edumate
          </Link>

          <Link to="/mate-ai" className="text-slate-300 hover:text-white">
            Mate AI
          </Link>

          <Link to="/to-do" className="text-slate-300 hover:text-white">
            To do
          </Link>

          <Link to="/chart" className="text-slate-300 hover:text-white">
            OVR
          </Link>
      </ul>
    </div>
  );
}
