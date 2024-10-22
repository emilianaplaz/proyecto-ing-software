import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeReservas from "./Pages/HomeReservas";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        {/* Set LoginSignUp as the default route */}
        <Route path="/" element={<SignUp />} />
        {/* Define other routes like HomeReservas */}
        <Route path="/reservas" element={<HomeReservas />} />
      </Routes>
    </Router>
  );
}

export default App;

