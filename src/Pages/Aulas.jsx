import React, { useState } from 'react';
import Header from '../Components/Header';
import './Aulas.css';
import { useNavigate } from 'react-router-dom';
import AulasComponent from '../Components/AulasComponent';

function Aulas() {

  const [selectedAula, setSelectedAula] = useState(null);
  const navigate = useNavigate();

  const handleAulaClick = (aula) => {
    setSelectedAula(aula);
  };

  const handleContinue = () => {
    if (selectedAula) {
      localStorage.setItem("aula-seleccionado", selectedAula.nombre);
      console.log(selectedAula.nombre) ;
      navigate("/confirmar-reserva-aula");
    }
  };

  return (
    <div className="container-aulas">
      <Header />
        <div className="title" >Selecciona tu aula</div>
        <AulasComponent onAulaClick={handleAulaClick}/>
      
        <button className='button-continuar-aulas' onClick={handleContinue}
        disabled={!selectedAula}>
        Continuar
      </button>
      </div>
  
  );
}

export default Aulas;