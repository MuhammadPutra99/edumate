import React, { useState } from "react";
import '../../AddItem.css';
import Logo from '../../assets/CHART.png';
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbarlanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-row justify-between items-center px-5 py-3">
      {/* Left Components */}
      <div className="flex flex-row items-center gap-x-5" data-aos="fade">
        <img src={Logo} className="h-16" alt="Logo" />
        <p className="montserrat text-2xl text-white font-semibold">Edumate.</p>
      </div>

      {/* Right Components */}
      <div className="relative">
        <div
          className="flex items-center justify-center border border-white rounded-full p-3 hover:bg-white active:opacity-80 group cursor-pointer transition duration-100"
          onClick={toggleMenu} data-aos="fade"
        >
          <RxHamburgerMenu className="text-white text-2xl group-hover:text-black" />
        </div>
        
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
            <a
              href="#"
              className="block px-4 py-2 text-black hover:bg-gray-200 transition"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-black hover:bg-gray-200 transition"
            >
              About Us
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
