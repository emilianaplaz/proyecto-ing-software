import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HomeReservas from './Pages/HomeReservas';
import SignUp from './Pages/SignUp';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import Reservas from './Pages/Reservas';
import Profile from './Pages/Profile';
import Auditorios from './Pages/Auditorios';

function App() {
  return (
    <Router>
      <div>
      {/* <HeaderLanding /> */}
      <Routes>
        {/* Set LandingPage as the default route */}
        <Route path="/" element={<Auditorios/>} />
        {/* Define other routes like HomeReservas and SignUp */}
        <Route path="/reservas" element={<HomeReservas />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mis-reservas" element={<Reservas />} />
        <Route path="/auditorios" element={<Auditorios />} />

        </Routes>
      </div>
    </Router>
  );
}


export default App;

