import React from "react"
import { Link } from "react-router-dom";
import '../AddItem.css';

export default function Footerprofile() {

  return(
      <div className="pl-20 pt-14 pb-10">
        <div className="flex flex-row">
          <div className="w-1/2 flex flex-row gap-x-24">
            <ul className="flex flex-col gap-y-1">
              <p className="montserrat text-white text-xl font-semibold pb-3">Social Media</p>
              <a href='https://www.instagram.com/edumate.ofc/' target="_blank" rel="noopener noreferrer" className="text-white text-lg font-light hover:opacity-50">Instagram</a>
              <a href="" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-light hover:opacity-50">Twitter / X</a>
              <a href="" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-light hover:opacity-50">WhatsApp</a>
            </ul>

            <ul className="flex flex-col gap-y-1">
              <p className="montserrat text-white text-xl font-semibold pb-3">Navigation</p>
              <Link to='/' className="text-white text-lg font-light hover:opacity-50">Homepage</Link>
              <Link to='mate-ai' className="text-white text-lg font-light hover:opacity-50">Mate AI</Link>
              <Link to='to-do' className="text-white text-lg font-light hover:opacity-50">To-do List</Link>
            </ul>

            <ul className="flex flex-col gap-y-1">
              <p className="montserrat text-white text-xl font-semibold pb-3">Services</p>
              <Link to='about' className="text-white text-lg font-light hover:opacity-50">About Us</Link>
              <Link to='' className="text-white text-lg font-light hover:opacity-50">Contact Us</Link>
            </ul>
          </div>

          <div className="w-1/2 flex flex-col pl-44">
            <p className="montserrat text-white text-xl font-light">Explore more about Edumate.</p>
            <p className="montserrat text-white text-7xl font-normal">Let's Study!</p>
          </div>
        </div>
      </div>
  )
}