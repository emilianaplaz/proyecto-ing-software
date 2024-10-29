import React, { useState } from 'react';
import './Header.css';
import logoUnimet from '../assets/Images/LogoUnimet.jpg';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header"> 
    <img src={logoUnimet} alt="logo" style={{ width: '50px', height: 'auto' }}/>  
      <div className="title-header">Reservas Unimet</div>
      <div className="user">
        <img src="perfil.png" alt="Perfil" onClick={toggleDropdown} />
        {showDropdown && (
          <div className="dropdown">
            <ul>
              <li>Perfil</li>
              <li>Reservas</li>
              <li>Cerrar Sesión</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
