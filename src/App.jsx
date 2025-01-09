import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Landingpages from "./pages/Landingpages";
import Loginpages from "./pages/Loginpages";
import Registpages from "./pages/Registpages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpages />} />
        <Route path="/login" element={<Loginpages />} />
        <Route path="/regist" element={<Registpages />} />
        <Route path="/home" element={<Homepages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
