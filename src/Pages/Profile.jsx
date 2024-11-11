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

  useEffect(() => {
    const userEmail = localStorage.getItem('userId'); // Get the email from localStorage

    if (userEmail) {
      const fetchUserData = async () => {
        try {
          const usersCollection = collection(db, 'usuarios');
          const userQuery = query(usersCollection, where('email', '==', userEmail));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setName(userData.name || '');
            setCi(querySnapshot.id);
            setEmail(userData.email || '');
          } else {
            console.error('Documento del usuario no encontrado con el email:', userEmail);
            setError('No se encontraron datos del usuario.');
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
          setError('Error al cargar el perfil');
        }
      };

      fetchUserData();
    } else {
      setError('Sesión expirada. Inicia sesión nuevamente.');
    }
  }, []);

  const handleEditClick = async () => {
    setError('');
    setIsLoading(true);

    try {
      const updates = {
        displayName: name, // Update name in authentication profile
      };

      if (!editMode) {
        await updateProfile(auth.currentUser, updates);
      } else {
        const userDocRef = doc(db, 'usuarios', auth.currentUser.uid);
        await updateDoc(userDocRef, { name });
      }

      setEditMode(!editMode);
    } catch (error) {
      console.error('Error updating profile:', error);
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