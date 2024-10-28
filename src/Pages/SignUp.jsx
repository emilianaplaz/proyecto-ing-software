import React, { useState } from 'react';
import { auth } from '../credenciales'; // Asegúrate de importar tu configuración de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [ci, setCi] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Aquí puedes agregar lógica adicional después de un registro exitoso
      console.log('Usuario registrado:', name, ci, email);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h3>Registrarse</h3>
        {error && <p className="error">{error}</p>}
        <form className="signup-form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Nombre y Apellido"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="CI"
            required
            pattern="\d+"
            title="Solo se permiten números"
            value={ci}
            onChange={(e) => setCi(e.target.value)}
          />
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
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

