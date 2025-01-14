import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Landingpages from "./pages/Landingpages";
import Loginpages from "./pages/Loginpages";
import Registpages from "./pages/Registpages";
import Profilepages from "./pages/Profilepages";
import { AuthContext } from "./context/AuthContext";
import AIpages from "./pages/AIpages";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  console.log(currentUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landingpages />} />
        <Route path="/login" element={<Loginpages />} />
        <Route path="/regist" element={<Registpages />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Homepages />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profilepages />
            </RequireAuth>
          }
        />
        <Route
          path="/mate-ai"
          element={
            <RequireAuth>
              <AIpages />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
