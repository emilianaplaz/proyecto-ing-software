
import Header from '../Components/Header';

import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import "./Reservas.css";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const db = getFirestore();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const userEmail = localStorage.getItem("userId"); // Get logged-in user's email from localStorage
        if (!userEmail) {
          throw new Error("No se encontró el email del usuario.");
        }

        // Query reservations associated with the user's email
        const reservasQuery = query(
          collection(db, "reservas-auditorios"),
          where("owner", "==", userEmail)
        );

        const querySnapshot = await getDocs(reservasQuery);
        const fetchedReservas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservas(fetchedReservas);
      } catch (err) {
        console.error("Error fetching reservas:", err);
        setError("No se pudo cargar la información de las reservas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservas();
  }, [db]);

  if (isLoading) return <p className="loading">Cargando reservas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="reservas-container">
      <h1 className="reservas-title">Reservas</h1>
      <div className="reservas-grid">
        {reservas.length === 0 ? (
          <p>No tienes reservas asociadas a tu cuenta.</p>
        ) : (
          reservas.map((reserva) => (
            <div key={reserva.id} className="reserva-card">
              <h2 className="reserva-aula">{reserva.auditorio}</h2>
              <p className="reserva-info">Fecha: {reserva.fecha}</p>
              <p className="reserva-info">Hora: {reserva.hora}</p>
              <button className="reserva-delete">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                  alt="Eliminar"
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reservas;