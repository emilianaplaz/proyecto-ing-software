import React, { useState, useEffect } from 'react';
import { auth, db } from '../credenciales';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore'; // Importamos limit para limitar los resultados
import './AulasComponent.css';

function AulasComponent({ onAulaClick }) {
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const getAulas = async () => {
      const q = query(collection(db, "salones"), limit(9)); 
      const querySnapshot = await getDocs(q);
      const aulasList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAulas(aulasList);
    };

    getAulas();
  }, []);

  return (
    <div className="aulas-container">
      <div className="aulas-grid">
        {aulas.map(aula => (
          <button
            key={aula.id}
            className="aula-button"
            onClick={() => onAulaClick(aula)}
          >
            {aula.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AulasComponent;
