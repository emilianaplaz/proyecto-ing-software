import React from 'react'
import Header from '../Components/Header';
import './ConfirmarReservaAuditorio.css';

const ConfirmarReservaAuditorio = () => {
  return (
    <div className='container-confirma1'>
      <Header />

      <div className="confirmar-reserva-container">
        <h1 className="title-confirmar1">Resumen de reserva</h1>
        <h1 className="subtitle-confirmar1">Desea completar la reserva?</h1>
      </div>

      <div className="confirmar1-box"></div>

    </div>
  );
}

export default ConfirmarReservaAuditorio
