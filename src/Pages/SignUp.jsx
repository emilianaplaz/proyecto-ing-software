import React, { useState } from 'react';
import { auth, db } from '../credenciales';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore'; //
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
    
    // Validar el correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(correo\.unimet\.edu\.ve|unimet\.edu\.ve)$/;
    if (!emailPattern.test(email)) {
      setError('Debe ingresar un correo Unimet');
      return;
    }

    // Determinar el rol basado en el correo
    const rol = email.endsWith('@correo.unimet.edu.ve') ? 'estudiante' : 'profesor';
    

    try {
      // Verificar si la cédula ya existe
      const ciDocRef = doc(db, 'usuarios', ci);
      const ciDoc = await getDoc(ciDocRef);

      if (ciDoc.exists()) {
        setError('Ya existe un usuario con la misma CI.');
        return;
      }

      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Agregar usuario a Firestore usando "ci" como ID del documento
      await setDoc(doc(db, 'usuarios', ci), {
        name,
        email,
        rol,
        createdAt: new Date(),
      });
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

