import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import '../../AddItem.css';

export default function Footerlanding() {

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="flex justify-center relative top-52" data-aos="fade-up">
      <div className="footer-button flex flex-row justify-center items-center gap-x-5 bg-white 
      py-2 px-5 rounded-3xl cursor-pointer shadow-lg transition-all duration-100 hover:bg-gradient-to-r hover:from-[#FF635A] hover:to-[#952A25] group">
        
        <Link to="/login" className="footer-text montserrat text-black text-2xl font-semibold transition-all group-hover:text-white">
          Get Started
        </Link>
      </div>
    </div>
  );
}
