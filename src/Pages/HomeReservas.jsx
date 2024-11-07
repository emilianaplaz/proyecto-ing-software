import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import './HomeReservas.css';

function HomeReservas() {
  const navigate = useNavigate();

  const handleAuditorioClick = () => {
    navigate('/auditorios');

  };

    const handleAulaClick = () => {
      navigate('/aulas');
  };

  return (
    <div className="container-home">
      <Header />
      <div className="info">
        <div className="title">Reserva tus salones y auditorios</div>
        <div className="options">
          <button className="option" onClick={handleAuditorioClick}>Auditorio</button>
          <button className="option" onClick={handleAulaClick}>Aula</button>
        </div>
      </div>
    </div>
  );
}

export default HomeReservas;
