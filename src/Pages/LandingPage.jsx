import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import HeaderLanding from '../Components/HeaderLanding';
import logoUnimet from '../assets/Images/LogoUnimet.jpg';
import logoGoogle from '../assets/Images/googleLogo.jpg';
import { auth } from '../credenciales'; // Asegúrate de que esta ruta sea correcta
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../credenciales'; // Asegúrate de que esta ruta sea correcta

function LandingPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Asegúrate de inicializar useNavigate

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verificar si el usuario ya existe en Firestore usando su UID
      const userDocRef = doc(db, 'usuarios', user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        // Si el usuario ya existe, simplemente inicia sesión
        console.log('Usuario ya registrado, iniciando sesión:', user.displayName);
        navigate('/home'); // Cambia '/home' por la ruta a la que quieras redirigir
        return;
      }

      // Si el usuario no existe, verifica si el correo electrónico ya existe en Firestore
      const emailQuery = await getDocs(query(collection(db, 'usuarios'), where('email', '==', user.email)));
      
      if (!emailQuery.empty) {
        setError('Ya existe un usuario registrado con este correo electrónico.');
        return;
      }

      // Si el usuario no existe, procede a solicitar la CI
      const name = user.displayName;
      let ci;

      // Solicitar la CI y validar que solo contenga números
      while (true) {
        ci = prompt("Por favor, ingresa tu cédula (solo números):");
        if (ci === null) {
          // Si el usuario cancela, salir del bucle
          return;
        }
        if (/^\d+$/.test(ci)) { // Verifica si la CI solo contiene números
          break; // Sale del bucle si la CI es válida
        } else {
          alert("Por favor, ingresa una cédula válida que contenga solo números.");
        }
      }
  
      // Verificar si la cédula ya existe
      const ciDocRef = doc(db, 'usuarios', ci);
      const ciDoc = await getDoc(ciDocRef);
  
      if (ciDoc.exists()) {
        setError('Ya existe un usuario con la misma CI.');
        return;
      }
  
      // Agregar usuario a Firestore usando "uid" como ID del documento
      await setDoc(doc(db, 'usuarios', user.uid), {
        name,
        email: user.email, // Guarda el correo electrónico en el documento
        ci,
        rol: user.email.endsWith('@correo.unimet.edu.ve') ? 'estudiante' : 'profesor',
        createdAt: new Date(),
      });
  
      console.log('Usuario registrado con Google:', name, user.email, ci);
      navigate('/home'); // Cambia '/home' por la ruta a la que quieras redirigir
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
              Continuar con Google
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


