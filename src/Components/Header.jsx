import React, { useState, useEffect } from 'react';
import './Header.css';
import logoUnimet from '../assets/Images/LogoUnimet.jpg';
import Usuario from '../assets/Images/Usuario.jpg';
import { Link } from 'react-router-dom';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Recupera el rol del usuario al cargar el componente
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header-home"> 
      <div className='header-left'>
        <img src={logoUnimet} alt="logo" style={{ width: '50px', height: 'auto' }}/>  
        <div className='title-header-home'>
          <a href="/home" className='link-header-blanco'>Reservas Unimet</a>
        </div>
      </div>
      <div className='header-right'>
        <div className="user">
          <img src={Usuario} alt="Perfil" onClick={toggleDropdown} />
          {showDropdown && (
            <div className="dropdown">
              <ul>
                <li>
                  <Link to="/profile" className='link-header-negro'>Perfil</Link> 
                </li>
                <li>
                  <Link to="/mis-reservas" className='link-header-negro'>Reservas</Link> 
                </li>
                {/* {userRole === 'administrador' && (
                  <li>
                    <Link to="/solicitudes" className='link-header-negro'>Ver Solicitudes</Link>
                  </li>
                )} */}
                <li>
                  <Link to="/preguntas-frecuentes" className='link-header-negro'>Preguntas</Link> 
                </li>
                <li><Link to="/" className='link-header-negro'>Cerrar Sesión</Link> 
                  </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
