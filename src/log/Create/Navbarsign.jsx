import React from "react";
import Logo from '../../assets/CHART.png';
import { Link } from "react-router-dom";

export default function Navbarsign() {
  return (
    <Link to="/" className="flex flex-row justify-start items-center gap-x-5 px-5 py-4 bg-zinc-900">
      <img src={Logo} className="h-16" alt="Logo" />
      <p className="montserrat text-2xl text-white font-semibold">Edumate.</p>
    </Link>
  );
}
