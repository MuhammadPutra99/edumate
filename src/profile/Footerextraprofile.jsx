import { Link } from "react-scroll";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaCircleArrowUp } from "react-icons/fa6";

export default function Footerextraprofile() {
  return(
    <div className="px-20 py-3">
      <div className="flex flex-row">
        {/* Extra Footer Kiri */}
        <div className="w-1/2 flex items-center">
          <ul className="flex flex-row gap-x-5">
            <p  className="montserrat text-white text-base font-normal">Copyright©Edumate</p>
            <Link to='' 
            className="text-white text-base font-light hover:underline hover:underline-offset-4 
            pl-5 cursor-pointer">
              Terms of Service
            </Link>

            <Link to='' 
            className="text-white text-base font-light hover:underline hover:underline-offset-4 
            cursor-pointer">
              Privacy Policy
            </Link>
          </ul>
        </div>

        {/* Extra Footer Kanan */}
        <div className="w-1/2 flex items-center justify-end">
          <ul className="flex flex-row gap-x-8">
            <Link to='header' smooth={true} duration={500}>
              <FaCircleArrowUp className="text-white text-2xl cursor-pointer"/>
            </Link>

            <a href="https://www.instagram.com/edumate.ofc/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-2xl"/>
            </a>

            <Link to=''>
              <FaXTwitter className="text-white text-2xl"/>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}