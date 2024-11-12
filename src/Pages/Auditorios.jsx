import React, { useState } from 'react';
import Header from '../Components/Header';
import AuditoriosComponent from '../Components/AuditoriosComponent';
import { useNavigate } from 'react-router-dom';
import './Auditorios.css';


function Auditorios() {
  const [selectedAuditorio, setSelectedAuditorio] = useState(null);
  const navigate = useNavigate();

  const handleAuditorioClick = (auditorio) => {
    setSelectedAuditorio(auditorio);
  };

  const handleContinue = () => {
    if (selectedAuditorio) {
      localStorage.setItem("auditorio-seleccionado", selectedAuditorio.nombre);
      console.log(selectedAuditorio.nombre) ;
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