import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import HeaderLanding from '../Components/HeaderLanding';
import logoUnimet from '../assets/Images/LogoUnimet.jpg';
import logoGoogle from '../assets/Images/googleLogo.jpg';
import { auth } from '../credenciales'; 
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../credenciales';

function LandingPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Asegúrate de usar useNavigate para redireccionar

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
  
      // Verificar si el correo electrónico ya existe en Firestore
      const emailQuery = await getDocs(query(collection(db, 'usuarios'), where('email', '==', user.email)));
  
      if (!emailQuery.empty) {
        // Si el correo ya está registrado, inicia sesión
        console.log('Correo ya registrado, iniciando sesión:', user.displayName);
        navigate('/home'); // Cambia '/home' por la ruta a la que quieras redirigir
        return;
      }
  
      // Si el usuario no existe, procede con el registro
      const name = user.displayName;
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
        email: user.email,
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

// (
//             <form className="signup-form" onSubmit={handleGoogleCI}>
//               <p>Por favor, ingresa tu cédula</p>
//               <input
//                 type="text"
//                 placeholder="CI"
//                 required
//                 pattern="\d+"
//                 title="Solo se permiten números"
//                 value={ci}
//                 onChange={(e) => setCi(e.target.value)}
//               />
//               <button type="submit">Registrar con Google</button>
//             </form>
//           )