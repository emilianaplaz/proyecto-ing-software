import React, { useState } from 'react';
import { auth } from '../credenciales'; // Asegúrate de que la configuración de Firebase esté correctamente importada
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'; // Asegúrate de tener un archivo CSS para estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso');
      // Aquí puedes redirigir al usuario a otra página
      // Por ejemplo: navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
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
  );
};

export default Login;
