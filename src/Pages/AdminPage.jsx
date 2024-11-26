import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { getFirestore, doc, collection, addDoc } from "firebase/firestore";
import './AdminPage.css';

const AdminPage = () => {
    const [pendingReservations, setPendingReservations] = useState([]);
  
    useEffect(() => {
      const fetchPendingReservations = async () => {
        const snapshot = await firebase.firestore().collection('reservas').where('status', '==', 'Pendiente').get();
        const reservations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPendingReservations(reservations);
      };
  
      fetchPendingReservations();
    }, []);
  
    const approveReservation = async (id) => {
      await firebase.firestore().collection('reservas').doc(id).update({ status: 'Confirmada' });
    };
  
    const rejectReservation = async (id) => {
      await firebase.firestore().collection('reservas').doc(id).update({ status: 'Rechazada' });
    };
  
    return (
      <div>
        <h1>Solicitudes Pendientes</h1>
        {pendingReservations.map(reservation => (
          <div key={reservation.id}>
            <p>{reservation.userId}</p>
            <button onClick={() => approveReservation(reservation.id)}>Aceptar</button>
            <button onClick={() => rejectReservation(reservation.id)}>Rechazar</button>
          </div>
        ))}
      </div>
    );
  };
  