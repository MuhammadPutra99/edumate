import React from "react";
import "../AddItem.css";
import Card from "../components/Card";
import Stats from "../assets/stats.png";
import AI from "../assets/AI.png";
import Todo from "../assets/todo.png";

export default function Bodyhome() {
  const leftText = `
  Edumate™ is Digital education service used for college and students.`;

  const rightText = `
  Edumate is an innovative platform designed to help students manage 
  their study process efficiently and effectively. With advanced 
  features designed specifically, Edumate is a complete solution to 
  improve learning productivity and performance.`;

  return (
    <div className="flex flex-col">
      {/* Component 1 */}
      <div className="flex flex-row justify-between items-center px-28 pt-12">
        <div className="w-1/2">
          <p className="montserrat text-start text-4xl text-white font-semibold">
            {leftText}
          </p>
        </div>

        <div className="w-1/2">
          <p className="montserrat text-justify text-lg text-white font-light pl-10">
            {rightText}
          </p>
        </div>
      </div>

      {/* Component 2 */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-x-0 md:gap-x-20 
      gap-y-5 md:gap-y-0 pt-24">
        <Card
          bg="bg-gradient-to-l to-[#FF635A] from-[#942A25]"
          img={Stats}
          title="OVR"
          description="OVR (Overview Progress Chart) adalah fitur yang menunjukan 
          statistik selama belajar, statistik ini bisa berubah seiring mengisi To-do list."
        />
        <Card
          bg="bg-gradient-to-l to-[#007AFF] from-[#0055B1]"
          img={AI}
          title="Mate AI"
          description="MateAi adalah teman sekaligus bantuan, menggunakan AI dalam mengerjakan 
          tugas sekolah ataupun pekerjaan rumah."
        />
        <Card
          bg="bg-gradient-to-l from-[#FFBF69] to-[#FF9F1C]"
          img={Todo}
          title="To-do List"
          description="To-do List ini berfungsi untuk membantu atau mempermudah pengguna dalam memfilter tugass mereka."
        />
      </div>
    </div>
  );
}
