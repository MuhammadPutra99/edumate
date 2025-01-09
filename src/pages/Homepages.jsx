import Ribbon from "../components/Ribbon";
import Bodyhome from "../home/Bodyhome";
import BodyTwohome from "../home/BodyTwohome";
import Footer from "../home/Footer";
import Headerhome from "../home/Headerhome";
import Navbarhome from "../home/Navbarhome";

export default function Homepages() {

  return(
    <>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-screen">
        <Navbarhome/>
        <Headerhome/>
      </div> 

      <div className="bg-gray-900 pt-12 pb-16">
        <Ribbon/>
      </div>

      <div className="bg-gradient-to-b from-gray-900 to-gray-950 h-screen">
        <Bodyhome/>
      </div>

      <div className="bg-gradient-to-b from-gray-950 to-black h-screen pb-10">
        <BodyTwohome/>
      </div>

      <div className="bg-gray-800">
        <Footer/>
      </div>
    </>
  )
}