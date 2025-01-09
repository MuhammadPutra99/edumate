import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../../AddItem.css';

export default function Bodylanding() {

    useEffect(() => {
      AOS.init({ duration: 2000 });
    }, []);

  return(
    <div className="flex flex-col relative top-[20%]">
      {/* Title One */}
      <div className="text-center pb-7">
        <p className="montserrat text-white text-3xl font-semibold" data-aos="fade-up">
          Edumate
        </p>
      </div>

      {/* Title Two */}
      <div className="w-full flex flex-col justify-center items-center pb-5">
        <p className="montserrat text-white text-6xl font-normal" data-aos="fade-up">
          A Friend in Learning
        </p>
        <p className="montserrat text-white text-6xl font-normal" data-aos="fade-up">
          A Partner in Growing
        </p>
      </div>

      {/* Desc Title */}
      <div className="text-center">
        <p className="montserrat text-white text-xl font-light" data-aos="fade-up">
          Discover the joy of learning without limits.
        </p>
      </div> 
    </div>
  )
}