import React from "react";
import { useEffect } from "react";
import { FaBook,  FaChalkboardTeacher, FaBrain } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import "../AddItem.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BenefitCard({ icon, title, description, textColor }) {

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="flex flex-col justify-center items-start w-56 h-40 bg-gradient-to-bl from-neutral-800 to-neutral-900 rounded-2xl shadow-lg px-5 py-2" data-aos="fade-up">
      <div className={`${textColor} text-3xl pb-3`}>{icon}</div>
      <p className={`montserrat ${textColor} text-start text-base font-semibold`}>{title}</p>
      <p className="montserrat text-white text-start text-sm font-light">{description}</p>
    </div>
  );
}
