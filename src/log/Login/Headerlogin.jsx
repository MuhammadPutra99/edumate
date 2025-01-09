import React from "react"
import '../../AddItem.css';
import Google from '../../assets/google.png'
import { Link } from "react-router-dom";

export default function Headerlogin() {

  return(
    <div className="px-[480px] py-5">

      {/* Title Login */}
      <div className="w-full h-[530px] bg-gradient-to-b from-[#FF635A] to-[#952A25] rounded-xl shadow-lg">
        <p className="montserrat text-white text-5xl font-semibold text-center pt-8">Hi Mate!</p>
        <p className="montserrat text-white text-xl font-light text-center">U're Comeback Again.</p>

        {/* Form Login */}
        <form className="flex flex-col px-24 pt-14 gap-y-8">
          {/* Input Email */}
          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
            type="email" 
            className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white 
            placeholder:opacity-70"
            placeholder="Email"
            required/>
          </div>

          {/* Input Password */}
          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
            type="password" 
            className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white 
            placeholder:opacity-70"
            placeholder="Password"
            required/>
          </div>

          {/* Sign In Button */}
          <div className="flex justify-center items-center w-full bg-gradient-to-r from-amber-500 
          to-amber-600 hover:bg-gradient-to-rhover:from-amber-400 hover:to-amber-500 rounded-3xl 
          py-3 cursor-pointer shadow-lg transition-all duration-200">
            <button type="submit" className="montserrat text-xl font-semibold text-white">Log In</button>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center items-center relative bottom-2">
            {/* Button Sign with Google */}
            <button className="w-full flex justify-center items-center bg-gradient-to-r from-zinc-700 to-zinc-900 
            hover:bg-gradient-to-r hover:from-zinc-600 hover:to-zinc-800 rounded-3xl text-white font-semibold 
            shadow-lg hover:bg-gray-100 transition px-6 py-2.5 gap-x-2">
              <img src={Google} className="h-8"/>
              Log In with Google
            </button>
          </div>

          <p className="flex justify-center items-center gap-x-2 text-white font-light relative bottom-7">
            Don't Have an Account? 
            <Link to='/regist' className="text-white font-normal hover:underline">Register Here.</Link>
          </p>
        </form>
      </div>
    </div>
  )
}