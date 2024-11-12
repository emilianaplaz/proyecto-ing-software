import React, { useState } from 'react';
import { auth } from '../credenciales';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'; 
import HeaderLanding from '../Components/HeaderLanding';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    // Validar el correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(correo\.unimet\.edu\.ve|unimet\.edu\.ve)$/;
    if (!emailPattern.test(email)) {
      setEmailError('Debe ingresar un correo Unimet');
      return;
    } else {
      setEmailError('');
    }

    // Validar la contraseña
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return;
    } else {
      setPasswordError('');
    }

    try {
      // Iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userId', auth.currentUser.email);
      console.log('Inicio de sesión exitoso');
      navigate('/reservas');
    } catch (err) {
      setGeneralError(err.message);
    }
  };

  return (
    <div>
      <div>
        <HeaderLanding/> 
      </div>
      
      <div className="login-container">
        <div className="login-box">
          <h3>Iniciar sesión</h3>
          {generalError && <p className="error">{generalError}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            {emailError && <p className="error">{emailError}</p>}
            <input
              type="email"
              placeholder="Correo Unimet"
              required
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                // Validar correo en tiempo real
                const emailPattern = /^[a-zA-Z0-9._%+-]+@(correo\.unimet\.edu\.ve|unimet\.edu\.ve)$/;
                if (!emailPattern.test(value)) {
                  setEmailError('Debe ingresar un correo Unimet');
                } else {
                  setEmailError('');
                }
              }}
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <input
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                // Validar contraseña en tiempo real
                if (value.length < 6) {
                  setPasswordError('La contraseña debe tener al menos 6 caracteres');
                } else {
                  setPasswordError('');
                }
              }}
            />
            <button type="submit">Iniciar sesión</button>
          </form>
          <p>
            <a href="/forgot-password">¿Olvidó su contraseña?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
