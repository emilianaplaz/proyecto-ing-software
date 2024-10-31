import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import HeaderLanding from '../Components/HeaderLanding';
import logoUnimet from '../assets/Images/LogoUnimet.jpg';
import logoGoogle from '../assets/Images/googleLogo.jpg';
import { auth } from '../credenciales'; // Asegúrate de que esta ruta sea correcta
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../credenciales'; // Asegúrate de que esta ruta sea correcta

function LandingPage() {
  const [error, setError] = useState('');

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verificar si el usuario ya existe en Firestore
      const userDocRef = doc(db, 'usuarios', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setError('Ya existe un usuario registrado con esta cuenta de Google.');
        return; // No continuar si el usuario ya existe
      }

      // Aquí puedes mostrar un formulario para ingresar la cédula
      // Por simplicidad, vamos a simular que se obtiene la cédula y el nombre
      const name = user.displayName;
      const email = user.email;
      const ci = prompt("Por favor, ingresa tu cédula:");

      // Verificar si la cédula ya existe
      const ciDocRef = doc(db, 'usuarios', ci);
      const ciDoc = await getDoc(ciDocRef);

      if (ciDoc.exists()) {
        setError('Ya existe un usuario con la misma CI.');
        return;
      }

      // Agregar usuario a Firestore usando "ci" como ID del documento
      await setDoc(doc(db, 'usuarios', ci), {
        name,
        email,
        rol: email.endsWith('@correo.unimet.edu.ve') ? 'estudiante' : 'profesor',
        createdAt: new Date(),
      });

      console.log('Usuario registrado con Google:', name, email, ci);
      // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div>
        <HeaderLanding /> 
      </div> 

      <div className="container">
        <div className="container-left">
          <div className="title-landing">
            <h1 className="title-landing">Reserva tus salones</h1>
          </div>
          <div className="button-container">
            <button className="iniciar-sesion-btn">Iniciar Sesión</button>
            <Link to="/signup" className="registrarse-link">
              Registrarse
            </Link>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="google-button-container">
            <button className="google-button" onClick={handleGoogleSignUp}>
              <img src={logoGoogle} alt="Google Logo" className="google-logo" />
            </button>
          </div>
        </div>

        <div className="container-right">
          <div className="logo-landing">
            <img src={logoUnimet} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
