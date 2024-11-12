import React from 'react';
import { useNavigate } from 'react-router-dom';
import enEspera from '../assets/Images/Espera.jpg'; 
import Header from '../Components/Header';
import './ReservaEnEspera.css';

const ReservaEnEspera = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/home');
  };

  return (
    <div className="container-reserva-espera">
      <Header />
      <div className="info-reserva-espera">
        <div className='title-reserva-espera' >Espere a que su solicitud sea aprobada</div>
        <img src={enEspera}  />
        <button className="regresar-menu-espera" onClick={handleMenuClick}>Regresar al menú principal</button>
      </div>
    </div>
  );
};

export default ReservaEnEspera;