import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../AddItem.css';

export default function Navbar() {

  const [active, setActive] = useState('Edumate');

  const textBold = () => {
    setActive(active.display.black);
  }

  return (
    <div id="header" className="flex flex-row justify-center items-center pt-8">
      <ul className="flex md:text-xl font-normal gap-x-5 md:gap-x-14">
          <Link to="/home" className="montserrat text-slate-300 hover:text-white" onClick={textBold}>
            Edumate
          </Link>

          <Link to="/mate-ai" className="text-slate-300 hover:text-white">
            Mate AI
          </Link>

          <Link to="/to-do" className="text-slate-300 hover:text-white">
            To-do
          </Link>

          <Link to="/profile" className="text-slate-300 hover:text-white">
            Profile
          </Link>

          <Link to="/contact" className="text-slate-300 hover:text-white">
            Contact
          </Link>
      </ul>
    </div>
  );
}
