import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.module.css';
import HeaderLanding from '../Components/HeaderLanding';

function LandingPage() {
  return (
    <div>
        <div>
            <HeaderLanding/>
        </div>

    
        <div className="container">
        <div className="title-landing">
            <h1 className="title">Reserva tus salones</h1>
            <img src="/logo.png" alt="Logo Unimet" className="logo" />
        </div>
        <div className="button-container">
            <Link to="/login" className="button">Iniciar sesión</Link>
            <Link to="/register" className="button">Registrarse</Link>
            <button className="button google-button">
            <i className="fab fa-google"></i>
            </button>

        </div>
        </div>
     </div>
  );
}

export default LandingPage;