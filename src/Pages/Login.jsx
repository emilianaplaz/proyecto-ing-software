import React, { useState } from 'react';
import { auth } from '../credenciales';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'; 
import HeaderLanding from '../Components/HeaderLanding';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();  

  const getUserRole = async (email) => {
    const db = getFirestore(); // Obtén la instancia de Firestore
    const usersRef = collection(db, 'usuarios'); // Referencia a la colección de usuarios
    const q = query(usersRef, where('email', '==', email)); // Consulta para buscar por correo

    try {
      const querySnapshot = await getDocs(q); // Obtén los documentos que coinciden con la consulta

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data(); // Obtén los datos del primer documento
        return userData.rol; // Retorna el rol del usuario
      } else {
        throw new Error('Usuario no encontrado'); // Manejo de error si el usuario no existe
      }
    } catch (error) {
      throw new Error('Error al obtener el rol del usuario: ' + error.message);
    }
  };


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
      const userRole = await getUserRole(email); // Llama a la función para obtener el rol
      localStorage.setItem('userId', auth.currentUser.email);
      localStorage.setItem('userRole', userRole); // Guardar el rol en localStorage
      console.log('Inicio de sesión exitoso');
      console.log(userRole); // Añade esto para verificar el rol
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
