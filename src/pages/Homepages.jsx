import Ribbon from "../components/Ribbon";
import Bodyhome from "../home/Bodyhome";
import BodyThreehome from "../home/BodyThreehome";
import BodyTwohome from "../home/BodyTwohome";
import Footer from "../home/Footer";
import Footerextra from "../home/Footerextra";
import Headerhome from "../home/Headerhome";
import Navbar from "../components/Navbar";

export default function Homepages() {

  return(
    <>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-screen">
        <Navbar/>
        <Headerhome/>
      </div> 

      <div className="bg-gray-900 pt-12 pb-16">
        <Ribbon/>
      </div>

      <div className="bg-gradient-to-b from-gray-900 to-gray-950 h-screen">
        <Bodyhome/>
      </div>

      <div className="bg-gradient-to-b from-gray-950 to-black h-screen">
        <BodyTwohome/>
      </div>

      <div className="bg-black h-screen pb-10">
        <BodyThreehome/>
      </div>

      <div className="bg-gradient-to-b from-black to-gray-950">
        <Footer/>
      </div>

      <div className="w-full h-[1px] bg-gray-800"></div>

      <div className="bg-gray-950">
        <Footerextra/>
      </div>
    </>
  )
}
