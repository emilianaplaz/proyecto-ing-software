import React, { useState } from 'react';
import { auth, db } from '../credenciales';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore'; //
import './SignUp.css';
import HeaderLanding from '../Components/HeaderLanding';

const SignUp = () => {
  const [name, setName] = useState('');
  const [ci, setCi] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ciError, setCiError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    // Validar el correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(correo\.unimet\.edu\.ve|unimet\.edu\.ve)$/;
    if (!emailPattern.test(email)) {
      setEmailError('Debe ingresar un correo Unimet');
      return;
    } else {
      setEmailError('');
    }

    // Validar la cédula
    if (!/^\d+$/.test(ci)) {
      setCiError('Solo se permiten números');
      return;
    } else {
      setCiError('');
    }

    // Validar la contraseña
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return;
    } else {
      setPasswordError('');
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
    <div>
      <div>
        <HeaderLanding />
      </div>

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
            {ciError && <p className="error">{ciError}</p>}
            <input
              type="text"
              placeholder="CI"
              required
              value={ci}
              onChange={(e) => {
                const value = e.target.value;
                setCi(value);
                // Validar solo números
                if (!/^\d*$/.test(value)) {
                  setCiError('Solo se permiten números');
                } else {
                  setCiError('');
                }
              }}
            />
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
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
