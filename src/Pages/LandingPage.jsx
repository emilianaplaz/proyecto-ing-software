import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import HeaderLanding from '../Components/HeaderLanding';
import logoUnimet from '../assets/Images/LogoUnimet.jpg';
import logoGoogle from '../assets/Images/googleLogo.jpg';

function LandingPage() {
  return (
    <div>
        <div>
            <HeaderLanding/>
        </div>

    
      
<div className="container-landing">
    <div className="container-left">
        <div className="title-landing">
            <h1 className="title-landing">Reserva tus salones</h1>
        </div>
        <div className="button-container">
            <button className="iniciar-sesion-btn">
                <Link to="/login">Iniciar Sesión</Link>
            </button>

            <button className="registrarse-btn">
                <Link to="/signup">Registrarse</Link>
            </button>

            
        </div>
        <div className="google-button-container">
            <button className="google-button">
                <img src={logoGoogle} alt="Google Logo" className="google-logo" />
            </button>
        </div>
    </div>

    <div className="container-right">
        <div className="logo-landing">
            <img src={logoUnimet} alt="logo" />
        </div>
    </div>
</div>



        
        </div>
    
  );
}

export default LandingPage;