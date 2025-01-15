import { Link } from "react-scroll";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaCircleArrowUp } from "react-icons/fa6";

export default function FooterextraTodo() {
  return(
    <div className="px-3 md:px-20 py-3">
      <div className="flex flex-row">
        {/* Extra Footer Kiri */}
        <div className="w-1/2 flex items-center">
          <ul className="flex flex-col md:flex-row gap-x-2 md:gap-x-5">
            <p  className="montserrat text-white text-sm md:text-base font-normal pb-2 md:pb-0">Copyright©Edumate</p>
            <Link to='' 
            className="text-white text-xs md:text-base font-light hover:underline hover:underline-offset-4 pb-1 md:pb-0
            md:pl-5 cursor-pointer">
              Terms of Service
            </Link>

            <Link to='' 
            className="text-white text-xs md:text-base font-light hover:underline hover:underline-offset-4 pb-1 md:pb-0
            cursor-pointer">
              Privacy Policy
            </Link>
          </ul>
        </div>

        {/* Extra Footer Kanan */}
        <div className="w-1/2 flex items-center justify-end">
          <ul className="flex flex-row gap-x-4 md:gap-x-8">
            <Link to='header' smooth={true} duration={500}>
              <FaCircleArrowUp className="text-white text-lg md:text-2xl cursor-pointer"/>
            </Link>

            <a href="https://www.instagram.com/edumate.ofc/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-lg md:text-2xl"/>
            </a>

            <Link to=''>
              <FaXTwitter className="text-white text-lg md:text-2xl"/>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}