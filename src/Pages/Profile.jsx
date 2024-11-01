import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import Header from '../Components/Header';
import './Profile.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; //


function Perfil() {

  const [name, setName] = useState('');
  const [ci, setCi] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const ciDocRef = doc(db, 'usuarios', user.uid); // Use the user's UID to fetch their data

      getDoc(ciDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setName(userData.name || '');
          setCi(userData.ci || '');
          setEmail(userData.email || '');
        } else {
          console.log("No data available");
          setError('No user data found');
        }
      }).catch((error) => {
        console.error("Error fetching user data:", error);
        setError('Error fetching user data');
      });
    }
  }, []);




  return (
    <div className="container">
      <Header />
      <div className="profile-container">
        <div className="profile-box">
        <h1 className='title'>Perfil</h1>
        <form  className="update-form">
          <input
            type="text"
            placeholder={name}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder={ci}
            required
            pattern="\d+"
            value={ci}
            onChange={(e) => setCi(e.target.value)}
          />
          <input
            type="text"
            placeholder={email}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        </div>
      </div>
      </div>
      
  
  );
}

export default Perfil;