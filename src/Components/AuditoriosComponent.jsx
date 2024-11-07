import React, { useState, useEffect } from 'react';
import { auth, db } from '../credenciales';
import { collection, getDocs } from 'firebase/firestore'; // Importamos getDocs para obtener todos los documentos de una colección
import './AuditoriosComponent.css'

function AuditoriosComponent({ onAuditorioClick }) {
  const [auditorios, setAuditorios] = useState([]);

  useEffect(() => {
    const getAuditorios = async () => {
      const querySnapshot = await getDocs(collection(db, "auditorios"));
      const auditorioList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAuditorios(auditorioList);
    };

    getAuditorios();
  }, []);

  return (
    <div className="auditorios-container">
      <div className="auditorios-grid">
        {auditorios.map(auditorio => (
          <button
            key={auditorio.id}
            className="auditorio-button"
            onClick={() => onAuditorioClick(auditorio)}
          >
            {auditorio.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AuditoriosComponent;
