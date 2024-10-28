import React, { useState } from 'react';
import { auth } from '../credenciales'; 
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import './ForgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
        console.log("Correo ingresado:", email);

      // Verificar si el correo electrónico está registrado
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        setError('Este correo no está registrado.');
        return;
      }

      // Enviar el correo de restablecimiento de contraseña
      await sendPasswordResetEmail(auth, email);
      setMessage('Se ha enviado un correo de restablecimiento de contraseña.');
    } catch (err) {
      // Manejo de errores más específico
      if (err.code === 'auth/invalid-email') {
        setError('Correo electrónico no válido.');
      } else if (err.code === 'auth/user-not-found') {
        setError('Usuario no encontrado.');
      } else {
        setError('Error al enviar el correo: ' + err.message);
      }
    }
  };

  return (
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
  );
};

export default ForgotPassword;
