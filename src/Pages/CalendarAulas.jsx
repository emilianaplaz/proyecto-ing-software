import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../credenciales';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from '../Components/Header';
import './Calendar.css';


function CalendarAulas() {
  const { aulaId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isCalendarView, setIsCalendarView] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

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
    setSelectedSlot(slot);
  };

  const handleFinalContinueAula = () => {
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
      navigate("/aulas");
    }
  };

  // Disable weekends and past dates in the calendar
  const disableDates = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignorar la hora, solo comparar fechas
    const isPastDate = date < today;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    return isPastDate || isWeekend;
  };

  // Disable the slot 8:45 - 10:15
  const disableSlot = (slot) => {
    return slot.horario === "8:45 - 10:15";
  };

  // Generating sample slots
  const sampleSlots = [
    { id: "1", horario: "7:00 - 8:30" },
    { id: "2", horario: "8:45 - 10:15" },
    { id: "3", horario: "10:30 - 12:00" },
    { id: "4", horario: "12:15 - 13:45" },
    { id: "5", horario: "14:00 - 15:30" },
    { id: "6", horario: "15:45 - 17:15" },
    { id: "7", horario: "17:30 - 19:00" },
  ];

  return (
    <div className="calendar-container">
      <Header />
      {isCalendarView ? (
        <div className="horas-container">
          <h1>Selecciona tu fecha</h1>
          
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileDisabled={disableDates}
            locale="es-ES"
          />
          <button className="back-button" onClick={handleBackToCalendar}>
            Regresar
          </button>
          {isDateSelected && (
            <button className="continuar-button" onClick={handleContinueToSlots}>
              Continuar
            </button>
          )}

            
        </div>
      ) : (
        <div>
          <h2>Selecciona un horario</h2>
          {sampleSlots.map((slot) => (
            <div
              key={slot.id}
              className={`available-slot ${selectedSlot === slot ? "selected" : ""} ${disableSlot(slot) ? 'disabled' : ''}`}
              onClick={() => !disableSlot(slot) && handleSlotSelection(slot)}
            >
              {slot.horario}
            </div>
          ))}
          <button className="back-button" onClick={handleBackToCalendar}>
            Regresar
          </button>
          {selectedSlot && (
            <button className="continuar-button" onClick={handleFinalContinueAula}>
              Continuar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarAulas;


