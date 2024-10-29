import React, { useState } from 'react';
import { auth } from '../credenciales'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import './ForgotPassword.css'; 
import HeaderLanding from '../Components/HeaderLanding';

const db = getFirestore();

const isEmailRegistered = async (email) => {
  const q = query(collection(db, 'usuarios'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; 
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Verifica si el correo está registrado
    const isRegistered = await isEmailRegistered(email);
    if (!isRegistered) {
      setError('El correo electrónico no está registrado.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Se ha enviado un correo de restablecimiento de contraseña.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div>
          <HeaderLanding/> 
      </div>

      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <h3>Restablecer Contraseña</h3>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          <form className="forgot-password-form" onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Correo Unimet"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Enviar Correo</button>
          </form>
        </div>
      </div>
      </div>
  );
};

export default ForgotPassword;