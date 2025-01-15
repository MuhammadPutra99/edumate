import React from "react"
import { Link } from "react-router-dom";
import '../AddItem.css';

export default function FooterAI() {

  return(
      <div className="md:pl-20 pt-14 pb-4 md:pb-10">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-row justify-center md:justify-normal gap-x-5 md:gap-x-24 px-3 md:px-0">
            <ul className="flex flex-col gap-y-1">
              <p className="montserrat text-white text-base md:text-xl font-semibold pb-3">Social Media</p>
              <a href='https://www.instagram.com/edumate.ofc/' target="_blank" rel="noopener noreferrer" className="text-white text-xs md:text-lg font-light hover:opacity-50">Instagram</a>
              <a href="" target="_blank" rel="noopener noreferrer" className="text-white text-xs md:text-lg font-light hover:opacity-50">Twitter / X</a>
              <a href="" target="_blank" rel="noopener noreferrer" className="text-white text-xs md:text-lg font-light hover:opacity-50">WhatsApp</a>
            </ul>

            <ul className="flex flex-col gap-y-1">
              <p className="montserrat text-white text-base md:text-xl font-semibold pb-3">Navigation</p>
              <Link to='/home' className="text-white text-xs md:text-lg font-light hover:opacity-50">Homepage</Link>
              <Link to='mate-ai' className="text-white text-xs md:text-lg font-light hover:opacity-50">Mate AI</Link>
              <Link to='to-do' className="text-white text-xs md:text-lg font-light hover:opacity-50">To-do List</Link>
            </ul>

            <ul className="flex flex-col gap-y-1">
              <p className="montserrat text-white text-base md:text-xl font-semibold pb-3">Services</p>
              <Link to='about' className="text-white text-xs md:text-lg font-light hover:opacity-50">About Us</Link>
              <Link to='' className="text-white text-xs md:text-lg font-light hover:opacity-50">Contact Us</Link>
            </ul>
          </div>

          <div className="w-full md:w-1/2 flex flex-col px-3 md:pl-44 md:mt-0 mt-10">
            <p className="montserrat text-white md:text-xl font-light">Explore more about Edumate.</p>
            <p className="montserrat text-white text-4xl md:text-7xl font-normal">Let's Study!</p>
          </div>
        </div>
      </div>
  )
}