import React from 'react';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* <div className="logo">
          <img src="path_to_logo" alt="Reservas Unimet Logo" />
          <h2>Reservas Unimet</h2>
        </div> */}
        <h3>Registrarse</h3>
        <form className="signup-form">
          <input type="email" placeholder="Correo Unimet" required />
          <input type="password" placeholder="Contraseña" required />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;


