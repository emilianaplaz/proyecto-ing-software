import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import './ConfirmarReservaAuditorio.css';

const ConfirmarReservaAuditorio = () => {
    const [auditorio, setAuditorio] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
  
    useEffect(() => {
      // Retrieve data from localStorage
      const storedAuditorio = localStorage.getItem("auditorio-seleccionado");
      const storedFecha = localStorage.getItem("fecha-seleccionada");
      const storedHora = localStorage.getItem("hora-seleccionada");
  
      setAuditorio(storedAuditorio || "No seleccionado");
      setFecha(storedFecha || "No seleccionada");
      setHora(storedHora || "No seleccionada");
    }, []);
  
    return (
      <div className='container-confirma1'>
        <Header />
        <div className="confirmar-reserva-container">
          <h1 className="title-confirmar1">Resumen de reserva</h1>
          <h2 className="subtitle-confirmar1">¿Desea completar la reserva?</h2>
        </div>
  
        <div className="confirmar1-box">
          <p><strong>Auditorio:</strong> {auditorio}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Hora:</strong> {hora}</p>
        </div>

        <button
        className="confirmar1-button"
        // onClick={}
        // disabled={}
      >
        Confirmar Reserva
      </button>

      </div>
    );
  };
  
  export default ConfirmarReservaAuditorio;
