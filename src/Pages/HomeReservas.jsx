import React, { useState } from 'react';
import Header from '../Components/Header';
import './HomeReservas.css';

function HomeReservas() {
  return (
      <div className="container">
        <Header />
        <div className="info" >
          <div className="title" >Reserva tus salones y auditorios</div>
          <div className="options">
            <button className="option">Auditorio</button>
            <button className="option">Aula</button>
          </div>
        </div>
      </div>

  );
}


export default HomeReservas;
