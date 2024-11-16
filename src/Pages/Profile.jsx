import Header from '../Components/Header';
import './Profile.css';

import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDocs, updateDoc, collection, query, where } from 'firebase/firestore';

function Perfil() {
  const [name, setName] = useState('');
  const [ci, setCi] = useState('');
  const [email, setEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  

  const handleEditClick = async () => {
    setError('');
    setIsLoading(true);
  
    try {
      if (!editMode) {
        // Activar modo edición y establecer el nombre en el perfil de autenticación
        const updates = {
          displayName: name,
        };
        await updateProfile(auth.currentUser, updates);
      } else {
        // Actualizar el nombre en Firestore usando el ID de cédula (ci)
        const userDocRef = doc(db, 'usuarios', ci); // Usar `ci` como ID del documento
        await updateDoc(userDocRef, { name });
      }
  
      setEditMode(!editMode);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setError('Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-profile">
      <Header />
      <div className="profile-container">
        <div className="profile-box">
          <h1 className="title">Perfil</h1>
          <form className="update-form">
            <input
              type="text"
              placeholder="Nombre"
              disabled={!editMode}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cédula de Identidad (CI)"
              disabled
              value={ci}
              readOnly
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              disabled
              value={email}
              readOnly
            />
          </form>
          <button className="edit" onClick={handleEditClick}>
            {editMode ? 'Guardar' : 'Editar'}
          </button>
          {isLoading && <p className="loading">Cargando...</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Perfil;