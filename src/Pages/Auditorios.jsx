import React, { useState } from 'react';
import Header from '../Components/Header';
import AuditoriosComponent from '../Components/AuditoriosComponent';
import './Auditorios.css';
import { useNavigate } from 'react-router-dom';



function Auditorios() {
  const [selectedAuditorio, setSelectedAuditorio] = useState(null);
  const navigate = useNavigate();

  const handleAuditorioClick = (auditorio) => {
    setSelectedAuditorio(auditorio);
  };

  const handleContinue = () => {
    if (selectedAuditorio) {
      localStorage.setItem("auditorio-seleccionado", selectedAuditorio.id);
      console.log(selectedAuditorio) // Save to localStorage
      navigate(`/calendario/${selectedAuditorio.id}`);
    }
  };

  return (
    <div className="container-auditorio">
      <Header />
      <div className="auditorio-title">Selecciona tu auditorio</div>
      <AuditoriosComponent onAuditorioClick={handleAuditorioClick} />
      <button
        className="continuar-button"
        onClick={handleContinue}
        disabled={!selectedAuditorio}
      >
        Continuar
      </button>
    </div>
  );
}

export default Auditorios;