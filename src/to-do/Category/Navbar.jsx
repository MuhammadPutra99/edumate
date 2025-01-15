import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from '../assets/CHART.png'
import '../AddItem.css';

export default function Navbar() {

  const [active, setActive] = useState('Edumate');

  const textBold = () => {
    setActive(active.display.black);
  }

  return (
    <div id="header" className="flex flex-row justify-between items-center px-3 md:px-12 pt-5">
      <ul className="flex flex-row items-center justify-center">
        <img src={Icon} className="h-10 md:h-20"/>
      </ul>

      <ul className="flex text-sm md:text-xl font-normal gap-x-3 md:gap-x-14">
          <Link to="/home" className="md:text-xl font-normal montserrat text-slate-300 hover:text-white" onClick={textBold}>
            Edumate
          </Link>
          <Link to="/mate-ai" className="text-slate-300 hover:text-white">
            Mate AI
          </Link>

          <Link to="/to-do" className="text-slate-300 hover:text-white">
            To-do
          </Link>

          <Link to="/contact" className="text-slate-300 hover:text-white">
            Contact
          </Link>
      </ul>

      <Link to="/profile">
            <form>
              {/* DIV ganti INPUT */}
              <div className="bg-white md:w-[70px] md:h-[70px] rounded-full shadow-lg"></div>
            </form>
          </Link>
    </div>
  );
}
