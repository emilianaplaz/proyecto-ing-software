import Header from '../Components/Header';


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./ConfirmarReservaAuditorio.css";

const ConfirmarReservaAuditorio = () => {
  const [auditorio, setAuditorio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState(""); // Default status as "Pendiente"
  const [owner, setOwner] = useState(""); // New owner state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const db = getFirestore();

  useEffect(() => {
    // Retrieve data from localStorage
    const storedAuditorio = localStorage.getItem("auditorio-seleccionado");
    const storedFecha = localStorage.getItem("fecha-seleccionada");
    const storedHora = localStorage.getItem("hora-seleccionada");
    const storedOwner = localStorage.getItem("userId"); // Retrieve owner from localStorage

    setAuditorio(storedAuditorio || "No seleccionado");
    setFecha(storedFecha || "No seleccionada");
    setHora(storedHora || "No seleccionada");
    setOwner(storedOwner || "Invitado"); // Default to "Invitado" if no user is logged in
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
        owner, // Add owner field
        timestamp: new Date().toISOString(), // Optional: Add a timestamp for tracking
      });

      // Navigate to success page
      navigate("/reserva-exitosa");
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
      setError("Error al confirmar la reserva. Inténtelo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-confirma1">
      <Header />
      <div className="confirmar-reserva-container">
        <h1 className="title-confirmar1">Resumen de reserva</h1>
        <h2 className="subtitle-confirmar1">¿Desea completar la reserva?</h2>
      </div>

      <div className="confirmar1-box">
        <p><strong>Auditorio:</strong> {auditorio}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Hora:</strong> {hora}</p>
        <p><strong>Reservado por:</strong> {owner}</p> {/* Display the owner */}
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