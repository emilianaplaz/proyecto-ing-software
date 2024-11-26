import React, { useState } from 'react';
import Header from '../Components/Header';
import './Aulas.css';
import AulasComponent from '../Components/AulasComponent';
import { useNavigate } from 'react-router-dom';


function Aulas() {
  const [selectedAula, setSelectedAula] = useState(null);
  const navigate = useNavigate();

  const handleSalonClick = (salon) => {
    setSelectedAula(salon);
  };

  const handleContinue = () => {
    if (selectedAula) {
      localStorage.setItem("auditorio-seleccionado", selectedAula.nombre);
      console.log(selectedAula.nombre);
      navigate(`/calendario/${selectedAula.id}`);
    }
  };

  return (
    <div className="container-aula">
      <Header />
      <div className="aula-title">Selecciona tu aula</div>
      <AulasComponent onSalonClick={handleSalonClick} />
      <button
        className="continuar-button"
        onClick={handleContinue}
        disabled={!selectedAula} // Disable the button if no aula is selected
      >
        Continuar
      </button>
    </div>
  );
}

export default Aulas;