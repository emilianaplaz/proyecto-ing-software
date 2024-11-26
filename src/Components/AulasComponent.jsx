import React, { useState, useEffect } from 'react';
import { auth, db } from '../credenciales';
import { collection, getDocs } from 'firebase/firestore'; // Importamos getDocs para obtener todos los documentos de una colección
import './AuditoriosComponent.css'

function AulasComponent({ onSalonClick }) {
    const [salones, setSalones] = useState([]);
  
    useEffect(() => {
      const getSalones = async () => {
        const querySnapshot = await getDocs(collection(db, "salones"));
        const salonesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSalones(salonesList);
      };
  
      getSalones();
    }, []);
  
    return (
      <div className="auditorios-container">
        <div className="auditorios-grid">
          {salones.map(salon => (
            <button
              key={salon.id}
              className="auditorio-button"
              onClick={() => onSalonClick(salon)}
            >
              {salon.nombre}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default AulasComponent;