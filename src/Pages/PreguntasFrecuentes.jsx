import React from 'react'
import Header from '../Components/Header'
import './PreguntasFrecuentes.css'; // Importa los estilos desde el archivo CSS

const PreguntasFrecuentes = () => {
  const preguntas = [
    {
      pregunta: "¿Si soy estudiante necesito permiso para reservar un aula?",
      respuesta:
        "Sí, los estudiantes deben esperar a que el administrador les otorgue el permiso de reserva de aula para que su reserva sea procesada.",
    },
    {
      pregunta: "¿Cualquier estudiante puede reservar un aula?",
      respuesta:
        "No, solo aquellos que tengan una razón válida como preparadores y miembros de agrupaciones.",
    },
    {
      pregunta: "¿Cuánto tiempo se tarda en procesar una solicitud?",
      respuesta:
        "Se recomienda hacer la solicitud con 3 días de antelación, sin embargo, puede ser procesada al momento.",
    },
  ];

  return (
    <div className="container">
      <Header />
      <header className="header">
        <h1 className="title">Preguntas Frecuentes</h1>
      </header>
      <div className="content">
        {preguntas.map((item, index) => (
          <div key={index} className="question-block">
            <h3 className="question">{item.pregunta}</h3>
            <p className="answer">{item.respuesta}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
