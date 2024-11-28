import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import './ConfirmarReservaAuditorio.css';
import { getFirestore, doc, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const ConfirmarReservaAula = () => {
  const [aula, setAula] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, seEstado] = useState("");
  const [owner, setOwner] = useState(""); // New owner state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();  


  const db = getFirestore();

  useEffect(() => {
    // Retrieve data from localStorage
    const storedAula = localStorage.getItem("aula-seleccionado");
    const storedFecha = localStorage.getItem("fecha-seleccionada");
    const storedHora = localStorage.getItem("hora-seleccionada");
    const storedOwner = localStorage.getItem("userId"); // Retrieve owner from localStorage

    setAula(storedAula || "No seleccionado");
    setFecha(storedFecha || "No seleccionada");
    setHora(storedHora || "No seleccionada");
    setOwner(storedOwner || "Invitado"); // Default to "Invitado" if no user is logged in
  }, []);

  const handleConfirmarReserva = async () => {
    setIsLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "reservas-aulas"), {
        aula,
        fecha,
        hora,
        estado,
        owner,
        timestamp: new Date().toISOString(), // Optional: Add a timestamp for tracking
      });

      alert("Solicitud enviada exitosamente.");

      navigate("/reserva-en-espera");
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
        <p><strong>Aula:</strong> {aula}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Hora:</strong> {hora}</p>
        <p><strong>Reservado por:</strong> {owner}</p>
      
      </div>

      <button
        className="confirmar2-button"
        onClick={handleConfirmarReserva}
        disabled={isLoading}
      >
        {isLoading ? "Confirmando..." : "Confirmar Reserva"}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ConfirmarReservaAula;