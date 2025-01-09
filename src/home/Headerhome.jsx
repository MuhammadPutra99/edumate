import React from "react"
import '../AddItem.css';
import StatsOne from '../assets/stats1.png';
import StatsTwo from '../assets/stats2.png';
import StatsThree from '../assets/stats3.png';

export default function Headerhome() {
  return(
    <div className="pt-20">
      <div className="flex flex-col justify-center items-center">
        <p className="montserrat md:text-7xl font-semibold text-white text-center md:px-60">
          Transforming Education
        </p>

        <p className="montserrat flex gap-5 md:text-7xl font-semibold text-white text-center md:px-60">
          with <section className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">Edumate.</section>
        </p>

        <div className="relative w-full">
          <img src={StatsOne} className="md:absolute md:right-[700px] -bottom-[375px] z-30 h-[430px]"/>
          <img src={StatsTwo} className="md:absolute md:right-[580px] -bottom-[375px] z-20 h-[400px]"/>
          <img src={StatsThree} className="md:absolute md:right-[485px] -bottom-[440px] z-10 h-[400px]"/>
        </div>
      </div>
    </div>   
  )
}