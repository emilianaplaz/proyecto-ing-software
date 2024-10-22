import React from 'react';
import './LoginSignUp.css';

const LoginSignUp = () => {
  return (
    <div className="login-signup-container">
      <div className="login-signup-box">
        {/* <div className="logo">
          <img src="path_to_logo" alt="Reservas Unimet Logo" />
          <h2>Reservas Unimet</h2>
        </div> */}
        <h3>Registrarse</h3>
        <form className="login-signup-form">
          <input type="email" placeholder="Correo Unimet" required />
          <input type="password" placeholder="Contraseña" required />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;


