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
import Aulas from './Pages/Aulas'
import Calendario from './Pages/Calendar';
import ConfirmarReservaAuditorio from './Pages/ConfirmarReservaAuditorio';
import ReservaExitosa from './Pages/ReservaExitosa';
import ReservaEnEspera from './Pages/ReservaEnEspera';
import CalendarAulas from './Pages/CalendarAulas';

function App() {
  return (
    <Router>
      <div>
      {/* <HeaderLanding /> */}
      <Routes>
        {/* Set LandingPage as the default route */}
        <Route path="/" element={<LandingPage/>} />
        {/* Define other routes like HomeReservas and SignUp */}
        <Route path="/home" element={<HomeReservas />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mis-reservas" element={<Reservas />} />
        <Route path="/auditorios" element={<Auditorios />} />
        <Route path="/reservas" element={<HomeReservas />} />
        <Route path="/calendario/:auditorioId" element={<Calendario />} />
        <Route path="/aulas" element={<Aulas />} />
        <Route path="/confirmar-reserva-auditorio" element={<ConfirmarReservaAuditorio />} />
        <Route path="/reserva-exitosa" element={<ReservaExitosa />} />
        <Route path="/reserva-en-espera" element={<ReservaEnEspera />} />
        <Route path="/calendario-aulas" element={<CalendarAulas />} />



        </Routes>
      </div>
    </Router>
  );
}


export default App;

