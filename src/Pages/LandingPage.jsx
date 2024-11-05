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
  
      if (!userDoc.exists()) {
        setError('El usuario no está registrado. Por favor, regístrate primero.');
        await auth.currentUser.delete();
        return;
      }
  
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div>
      <div>
        <HeaderLanding /> 
      </div> 

    
      
<div className="container-landing">
    <div className="container-left">
        <div className="title-landing">
            <h1 className="title-landing">Reserva tus salones</h1>
        </div>
        <div className="button-container">
            <button className="iniciar-sesion-btn">
                <Link to="/login">Iniciar Sesión</Link>
            </button>

            <button className="registrarse-btn">
                <Link to="/signup">Registrarse</Link>
            </button>

            
        </div>
        <div className="google-button-container">
            <button className="google-button">
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

