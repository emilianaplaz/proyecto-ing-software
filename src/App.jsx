import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeReservas from './Pages/HomeReservas';
import SignUp from './Pages/SignUp';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <Router>
      <div>
      {/* <HeaderLanding /> */}
      <Routes>
        {/* Set LandingPage as the default route */}
        <Route path="/" element={<HomeReservas />} />
        {/* Define other routes like HomeReservas and SignUp */}
        <Route path="/reservas" element={<HomeReservas />} />
        <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

