import React from 'react';
import { useNavigate } from 'react-router-dom';
import checkImage from '../assets/Images/check.jpg'; // Import as a module
import Header from '../Components/Header';
import './ReservaExitosa.css';

const ReservaExitosa = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/home');
  };

  return (
    <div className="container-reserva-exitosa">
      <Header />
      <div className="info-reserva-exitosa">
        <div className='title-reserva-exitosa' >El espacio se ha reservado exitosamente</div>
        <img src={checkImage}  />
        <button className="regresar-menu" onClick={handleMenuClick}>Regresar al menú principal</button>
      </div>
    </div>
  );
};

export default ReservaExitosa;
