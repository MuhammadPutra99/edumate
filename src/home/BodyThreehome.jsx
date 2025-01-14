import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaBrain } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import BenefitCard from "./../components/BenefitCard.jsx";
import Study from "../assets/bg-study.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "../AddItem.css";

export default function BodyThreehome() {

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="flex flex-row justify-between items-center pt-10 px-14">
      {/* Text Components */}
      <div className="flex flex-col gap-y-5">
        {/* Title */}
        <p className="flex montserrat text-white text-4xl gap-x-3" data-aos="fade-up">
          Explore all benefits at <span className="font-semibold">Edumate.</span>
        </p>

        <p className="flex montserrat text-white text-2xl gap-x-3" data-aos="fade-up">
          Improving subject grades with the help of <span className="font-semibold">Mate AI.</span>
        </p>

        {/* Benefit Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <BenefitCard 
          icon={<FaBook />}
          textColor='text-yellow-500'
          title="Learn Anywhere"
          description="Access learning materials anytime and anywhere to fit your schedule."/>

          <BenefitCard 
          icon={<FaChalkboardTeacher />} 
          textColor='text-emerald-500'
          title="Progress Tracker" 
          description="Monitor your learning progress and identify areas to improve."/>

          <BenefitCard 
          icon={<FaBrain />}
          textColor='text-indigo-500' 
          title="AI-Powered Learning" 
          description="Get ultimate personalized recommendations and support from Mate AI."/>

          <BenefitCard 
          icon={<TbTargetArrow />} 
          textColor='text-rose-500' 
          title="Finish Your Goals" 
          description='Stay motivated and achieve your learning targets with ease.'/>
        </div>
      </div>

      {/* Image Components */}
      <div className="relative" data-aos="fade-up">
        <img src={Study} className="h-[550px] relative top-10" alt="Study Background"/>
        <Link className="absolute right-14 bottom-20 text-white text-xl font-light border
        border-white px-5 py-2 rounded-3xl -rotate-6 hover:bg-white hover:text-black 
        transition-all duration-100">
          Learning Radar
        </Link>

        <Link className="absolute right-36 bottom-3 text-white text-xl font-light border 
        border-white px-3 py-2 rounded-3xl rotate-6 hover:bg-white hover:text-black 
        transition-all duration-100">
          Chat with AI
        </Link>

        <Link className="absolute right-5 bottom-4 text-white text-xl font-light border 
        border-white px-3 py-2 rounded-3xl -rotate-3 hover:bg-white hover:text-black 
        transition-all duration-100">
          To-do List
        </Link>
      </div>
    </div>
  );
}
