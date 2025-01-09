import React from "react";
import Stars from "../assets/Vector.png";
import "../AddItem.css";

export default function Ribbon() {
  const items = ["Chat with AI", "Edumate", "Dashboard", "To-do List"];

  return (
    <div className="bg-gray-800 overflow-hidden relative transform rotate-[-1deg] w-[99.99%]">
      <div className="flex items-center whitespace-nowrap animate-marquee gap-x-20 py-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-x-8">
            <img src={Stars} className="h-10" alt="Star icon" />
            <p className="pixelify text-2xl text-white">{item}</p>
          </div>
        ))}

        {items.map((item, index) => (
          <div key={`dup-${index}`} className="flex items-center gap-x-8">
            <img src={Stars} className="h-10" alt="Star icon" />
            <p className="pixelify text-2xl text-white">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
