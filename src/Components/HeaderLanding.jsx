import React from 'react';
import './HeaderLanding.css';
import logoUnimet from '../assets/Images/LogoUnimet.jpg';

function HeaderLanding() {
  return (
    <header className="header">
        <img src={logoUnimet} alt="logo" style={{ width: '50px', height: 'auto' }}/>      
        <h1 className="title-header">Reservas Unimet</h1>
    </header>
  );
}

export default HeaderLanding;