import React, { useState } from 'react';
import { auth } from '../credenciales';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'; 
import HeaderLanding from '../Components/HeaderLanding';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userId', auth.currentUser.uid);
      console.log('Inicio de sesión exitoso');
      console.log('El userId guardado es:', auth.currentUser.uid);      // Aquí puedes redirigir al usuario a otra página
      navigate('/reservas');
    } catch (err) {
      setError(err.message);
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
          {error && <p className="error">{error}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo Unimet"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
