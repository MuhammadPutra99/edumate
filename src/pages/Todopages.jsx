import Headertodo from "../to-do/Category/SubjectSelection";
import NavbarProgress from "../to-do/Chart/NavbarProgress";
import ProgressRadarChart from "../to-do/Chart/ProgressRadarChart";

export default function Todopages() {

  return(
    <div className="h-screen bg-gradient-to-b from-gray-700 to-gray-800">
      <NavbarProgress/>
      <ProgressRadarChart/>
    </div>
  )
}