import React from "react"
import '../AddItem.css';

export default function Footer() {

  return(
    <div className="flex  flex-row gap-x-12">
      <di>
        <img/>
        <p className="pixelify">Edumate</p>
      </di>

      <div>
        <img/>
        <p className="pixelify">Terms of Service</p>
      </div>

      <div>
        <img/>
        <p className="pixelify">Privacy Policy</p>
      </div>
    </div>
  )
}