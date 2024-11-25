
import Header from '../Components/Header';

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";



function Calendario() {
  const { auditorioId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isCalendarView, setIsCalendarView] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const db = getFirestore();

  useEffect(() => {
    if (isDateSelected) {
      const getAvailableSlots = async () => {
        try {
          const reservasSnapshot = await getDocs(
            query(collection(db, "reservas-auditorios"), where("auditorio", "==", auditorioId))
          );

          const reservasFecha = reservasSnapshot.docs.filter((doc) =>
            doc.data().fecha === selectedDate.toISOString().split("T")[0]
          );

          const slots = [];
          const startTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 7, 0, 0);
          const endTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 19, 0, 0);
          let currentTime = startTime;

          while (currentTime < endTime) {
            const slotEnd = new Date(currentTime);
            slotEnd.setHours(slotEnd.getHours() + 1);
            slotEnd.setMinutes(slotEnd.getMinutes() + 30);

            const formattedSlot = `${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")} - ${slotEnd.getHours().toString().padStart(2, "0")}:${slotEnd.getMinutes().toString().padStart(2, "0")}`;

            const isAvailable = !reservasFecha.some((doc) => doc.data().hora === formattedSlot);

            slots.push({
              id: formattedSlot,
              horario: formattedSlot,
              isAvailable,
            });

            currentTime.setMinutes(currentTime.getMinutes() + 105);
          }

          setAvailableSlots(slots);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        }
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
      navigate("/confirmar-reserva-auditorio");
    }
  };

  const disablePastDates = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00 for comparison
    return date < today; // Disable past dates
  };

  const disableWeekends = ({ date }) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Disable weekends (Sunday and Saturday)
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
            tileDisabled={({ date }) => disablePastDates({ date }) || disableWeekends({ date })}
            locale="es-ES"
          />
          {isDateSelected && (
            <button className="continuar-button" onClick={handleContinueToSlots}>
              Continuar
            </button>
          )}
        </div>
      ) : (
        <div>
          <h2 className="horarios">Horarios Disponibles</h2>
          {availableSlots.map((slot) => (
            <div
              key={slot.id}
              className={`available-slot ${slot.isAvailable ? "" : "gray-slot"} ${
                selectedSlot === slot ? "selected" : ""
              }`}
              onClick={() => handleSlotSelection(slot)}
            >
              {slot.horario}
            </div>
          ))}
          <button className="back-button" onClick={handleBackToCalendar}>
            Regresar
          </button>
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