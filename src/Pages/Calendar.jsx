import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../credenciales';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from '../Components/Header';
import './Calendar.css';



function Calendario() {
  const { auditorioId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isCalendarView, setIsCalendarView] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (isDateSelected) {
      const getAvailableSlots = async () => {
        const reservasSnapshot = await getDocs(
          query(collection(db, 'reservas-auditorios'), where('salonId', '==', auditorioId))
          
        );

        

        const reservasFecha = reservasSnapshot.docs.filter(doc =>
          doc.data().entrada.toDate().toDateString() === selectedDate.toDateString()
        );

        const slots = [];
        const startTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 7, 0, 0);
        const endTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 19, 0, 0);
        let currentTime = startTime;

        while (currentTime < endTime) {
          const slotEnd = new Date(currentTime);
          slotEnd.setHours(slotEnd.getHours() + 1);
          slotEnd.setMinutes(slotEnd.getMinutes() + 30);

          const isAvailable = !reservasFecha.some(doc => {
            const entrada = doc.data().entrada.toDate();
            const salida = doc.data().salida.toDate();
            return (
              (currentTime >= entrada && currentTime < salida) ||
              (slotEnd > entrada && slotEnd <= salida) ||
              (currentTime <= entrada && slotEnd >= salida)
            );
          });

          slots.push({
            id: `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}-${slotEnd.getHours()}:${slotEnd.getMinutes().toString().padStart(2, '0')}`,
            horario: `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')} - ${slotEnd.getHours()}:${slotEnd.getMinutes().toString().padStart(2, '0')}`,
            isAvailable
          });

          currentTime.setMinutes(currentTime.getMinutes() + 105);
        }

        setAvailableSlots(slots);
      };

      getAvailableSlots();
    }
  }, [auditorioId, selectedDate, isDateSelected]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDateSelected(true);
  };

  const handleContinueToSlots = () => {
    setIsCalendarView(false);
  };

  const handleBackToCalendar = () => {
    setIsCalendarView(true);
    setIsDateSelected(false);
    setSelectedSlot(null);
  };

  const handleSlotSelection = (slot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
    }
  };

  const handleFinalContinue = () => {
    if (selectedDate && selectedSlot) {
      const fechaEnEspanol = selectedDate.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      localStorage.setItem("fecha-seleccionada", fechaEnEspanol);
      localStorage.setItem("hora-seleccionada", selectedSlot.horario);
      console.log("Fecha y hora guardadas:", fechaEnEspanol, selectedSlot.horario);
      navigate("/confirmar-reserva-auditorio");
    }
  };

  // Disable weekends in the calendar
  const disableWeekends = ({ date }) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className="calendar-container">
      <Header />
      {isCalendarView ? (
        <div className="horas-container">
          <h1>Selecciona tu fecha</h1>
          <Calendar 
            onChange={handleDateChange} 
            value={selectedDate} 
            tileDisabled={disableWeekends}
            locale="es-ES"
          />
          {isDateSelected && (
            <button className="continuar-button" onClick={handleContinueToSlots}>Continuar</button>
          )}
        </div>
      ) : (
        <div>
          <h2 className='horarios'>Horarios Disponibles</h2>
          {availableSlots.map(slot => (
            <div
              key={slot.id}
              className={`available-slot ${slot.isAvailable ? '' : 'gray-slot'} ${selectedSlot === slot ? 'selected' : ''}`}
              onClick={() => handleSlotSelection(slot)}
            >
              {slot.horario}
            </div>
          ))}
          <button className="back-button" onClick={handleBackToCalendar}>Regresar</button>
          {selectedSlot && (
            <button className="continuar-button" onClick={handleFinalContinue}>
              Continuar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Calendario;