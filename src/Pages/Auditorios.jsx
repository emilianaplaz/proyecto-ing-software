import React, { useState } from 'react';
import Header from '../Components/Header';
import Auditorios from '../Components/AuditoriosComponent';
import './Auditorios.css';

function Reservas() {
  return (
    <div className="container-auditorio">
      <Header />
        <div className="auditorio-title" >Selecciona tu auditorio</div>
         <Auditorios /> 
        <button className="continuar-button">Continuar</button>
        
      </div>
  
  );
}

export default Reservas;