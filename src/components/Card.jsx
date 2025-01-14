import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Card({ bg, img, description, title }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front Side */}
      <div
        className={`flex flex-row justify-center items-center w-48 h-48 md:w-80 md:h-80 ${bg} rounded-xl 
        shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 relative`}
        data-aos="flip-right"
        onClick={handleClick}
      >
        <img src={img} alt="logo-card" className="w-40 h-40" />
      </div>

      {/* Back Side */}
      <div
        className={`flex flex-row w-60 h-80 md:w-80 md:h-80 ${bg} rounded-xl 
        shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 relative`}
        data-aos="flip-right"
        onClick={handleClick}
      >
        <p className="montserrat text-white text-sm font-semibold absolute top-5 left-[40%]">Edumate.</p>
        <div className="flex flex-col justify-center items-start absolute top-[90px] left-3">
          <p className="text-white text-start px-3 text-2xl font-semibold">{title}</p>
          <p className="text-white text-start px-3 text-base font-light">{description}</p>
        </div>
        <p className="montserrat text-white text-sm font-semibold absolute bottom-5 left-[40%]">Edumate.</p>
      </div>
    </ReactCardFlip>
  );
}
