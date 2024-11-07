import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../credenciales';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from '../Components/Header';
import './Calendar.css';

function Calendario() {
  const { auditorioId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);


  useEffect(() => {
    if (isDateSelected) {
      const getAvailableSlots = async () => {
        // Obtener todas las reservas del auditorio seleccionado
        const reservasSnapshot = await getDocs(
          query(collection(db, 'reservas'), where('salonId', '==', auditorioId))
        );

        // Obtener todas las reservas en la fecha seleccionada
        const reservasFecha = reservasSnapshot.docs.filter(doc =>
          doc.data().entrada.toDate().toDateString() === selectedDate.toDateString()
        );

        // Calcular los horarios disponibles
        const slots = [];
        const startTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 7, 0, 0);
        const endTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 19, 0, 0);
        let currentTime = startTime;

        while (currentTime <= endTime) {
          const isAvailable = !reservasFecha.some(doc =>
            currentTime >= doc.data().entrada.toDate() && currentTime < doc.data().salida.toDate()
          );
          if (isAvailable) {
            slots.push({
              id: `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`,
              horario: `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`
            });
          }
          currentTime.setMinutes(currentTime.getMinutes() + 15);
        }

        setAvailableSlots(slots);
      };

      getAvailableSlots();
    }
  }, [auditorioId, selectedDate, isDateSelected]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDateSelected(true);
    setShowAvailableSlots(false);
  };

  return (
    <div class="calendar-container">
      <Header />
      <h1>Selecciona tu fecha</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      {isDateSelected && (
        <div>
          <button className="continuar-button" onClick={() => setShowAvailableSlots(true)}>Continuar</button>
          {showAvailableSlots && (
            <div>
              <h2>Horarios Disponibles</h2>
              {availableSlots.map(slot => (
                <div key={slot.id} className="available-slot">
                  {slot.horario}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Calendario;
