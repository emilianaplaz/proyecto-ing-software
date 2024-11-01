import React, { useState } from 'react';
import './Header.css';
import logoUnimet from '../assets/Images/LogoUnimet.jpg';
import Usuario from '../assets/Images/Usuario.jpg';
import { Link } from 'react-router-dom';



function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

 /* const handleProfileClick   
 = () => {
    navigate('/perfil'); // Reemplaza '/perfil' con la ruta correcta
  };

  const handleReservasClick = () => {
    navigate('/perfil'); // Reemplaza '/reservas' con la ruta correcta
  };

  const handleCerrarSesionClick = () => {
    
    navigate('/perfil');
  }; */

  return (
    <header className="header-home"> 
    <div className='header-left'>
    <img src={logoUnimet} alt="logo" style={{ width: '50px', height: 'auto' }}/>  
      <div className = 'title-header-home' >Reservas Unimet</div>
    </div>
    <div className='header-right'>
      <div className="user">
        <img src={Usuario} alt="Perfil" onClick={toggleDropdown} />
        {showDropdown && (
          <div className="dropdown">
            <ul>
              <li>
                <Link to="/profile">Perfil</Link> 
              </li>
              <li>Reservas</li>
              <li>Cerrar Sesión</li>
            </ul>
            
          </div>
          
        )}
        </div>
      </div>
    </header>
  );
}

export default Header;
