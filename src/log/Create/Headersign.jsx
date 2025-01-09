import React from "react"
import '../../AddItem.css';
import Google from '../../assets/google.png'
import { Link } from "react-router-dom";

export default function Headersign() {

  return(
    <div className="px-[480px] relative bottom-7">

      {/* Title Login */}
      <div className="w-full h-[630px] bg-gradient-to-b from-[#FF635A] to-[#952A25] rounded-xl shadow-lg">
        <p className="montserrat text-white text-5xl font-semibold text-center pt-8">Hi There!</p>
        <p className="montserrat text-white text-xl font-light text-center">Let's Verify Yourself.</p>

        {/* Form Login */}
        <form className="flex flex-col px-24 pt-10 gap-y-5">
          {/* Input Username */}
          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
            type="text" 
            className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white 
            placeholder:opacity-70"
            placeholder="Username"
            required/>
          </div>

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

          {/* Input Cfrm. Password */}
          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
            type="password" 
            className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white 
            placeholder:opacity-70"
            placeholder="Confirm Password"
            required/>
          </div>

          {/* Sign In Button */}
          <div className="flex justify-center items-center w-full bg-gradient-to-r from-amber-500 
          to-amber-600 hover:bg-gradient-to-rhover:from-amber-400 hover:to-amber-500 rounded-3xl 
          py-3 cursor-pointer shadow-lg transition-all duration-200 relative top-3">
            <button type="submit" className="montserrat text-xl font-semibold text-white">Sign In</button>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center items-center relative top-2">
            {/* Button Sign with Google */}
            <button className="w-full flex justify-center items-center bg-gradient-to-r from-zinc-700 to-zinc-900 
            hover:bg-gradient-to-r hover:from-zinc-600 hover:to-zinc-800 rounded-3xl text-white font-semibold 
            shadow-lg hover:bg-gray-100 transition px-6 py-2.5 gap-x-2">
              <img src={Google} className="h-8"/>
              Sign In with Google
            </button>
          </div>

          <p className="flex justify-center items-center gap-x-2 text-white font-light relative bottom-1">
            Already Have Account?
            <Link to='/login' className="text-white font-normal hover:underline">Login Here.</Link>
          </p>
        </form>
      </div>
    </div>
  )
}