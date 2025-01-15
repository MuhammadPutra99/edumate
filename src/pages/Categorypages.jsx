import React from "react"
import SubjectSelection from "../to-do/Category/SubjectSelection"
import Navbar from "../components/Navbar"
import FooterTodo from "../to-do/Category/FooterTodo"
import FooterextraTodo from "../to-do/Category/FooterExtraTodo"

export default function Categorypages() {

  return(
    <>
      <div className="h-screen bg-gradient-to-b from-gray-700 to-gray-800">
        <Navbar/>
        <SubjectSelection/>
      </div>

      <div className="w-full h-[2px] bg-gray-700"></div>

      <div className="bg-gradient-to-b from-gray-800 to-gray-900">
        <FooterTodo/>
        <FooterextraTodo/>
      </div>
    </>
  )
}