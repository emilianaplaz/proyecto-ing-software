import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import './ConfirmarReservaAuditorio.css';
import { getFirestore, doc, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const ConfirmarReservaAuditorio = () => {
  const [auditorio, setAuditorio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, seEstado] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();  


  const db = getFirestore();

  useEffect(() => {
    // Retrieve data from localStorage
    const storedAuditorio = localStorage.getItem("auditorio-seleccionado");
    const storedFecha = localStorage.getItem("fecha-seleccionada");
    const storedHora = localStorage.getItem("hora-seleccionada");

    setAuditorio(storedAuditorio || "No seleccionado");
    setFecha(storedFecha || "No seleccionada");
    setHora(storedHora || "No seleccionada");
  }, []);

  const handleConfirmarReserva = async () => {
    setIsLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "reservas-auditorios"), {
        auditorio,
        fecha,
        hora,
        estado,
        // You can add additional fields, such as user ID or timestamp, if needed
      });

      // alert("Reserva confirmada exitosamente.");

      navigate("/reserva-exitosa");
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
      setError("Error al confirmar la reserva. Inténtelo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

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
        onClick={handleConfirmarReserva}
        disabled={isLoading}
      >
        {isLoading ? "Confirmando..." : "Confirmar Reserva"}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ConfirmarReservaAuditorio;
