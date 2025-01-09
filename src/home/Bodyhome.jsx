import React from "react"
import '../AddItem.css';
import Card from "../components/Card";
import Stats from '../assets/stats.png';
import AI from '../assets/AI.png';
import Todo from '../assets/todo.png';

export default function Bodyhome() {

  const leftText = `
  Edumate™ is Digital education service used for college and students.`

  const rightText = `
  Edumate is an innovative platform designed to help students manage 
  their study process efficiently and effectively. With advanced 
  features designed specifically, Edumate is a complete solution to 
  improve learning productivity and performance.`

  return(
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
      <div className="flex flex-row justify-center items-center gap-x-20 pt-24">
        <Card bg="bg-gradient-to-l to-[#FF635A] from-[#942A25]" img={Stats}/>
        <Card bg="bg-gradient-to-l to-[#007AFF] from-[#0055B1]" img={AI}/>
        <Card bg="bg-gradient-to-l from-[#FFBF69] to-[#FF9F1C]" img={Todo}/>
      </div>
    </div>
  )
}