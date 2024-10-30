import React from 'react';
import logoUnimet from '../assets/Images/LogoUnimet.jpg';
import './HeaderLanding.css';

function HeaderLanding() {
  return (
    <header className="header-landing">
        <img src={logoUnimet} alt="logo" style={{ width: '50px', height: 'auto' }}/>      
        <h1 className="title-header">Reservas Unimet</h1>
    </header>
  );
}

export default HeaderLanding;