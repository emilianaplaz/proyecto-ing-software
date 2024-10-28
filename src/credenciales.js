// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByxA_ytB6XGIlEuety51XLpN1kJQXL69E",
  authDomain: "reservas-unimet.firebaseapp.com",
  projectId: "reservas-unimet",
  storageBucket: "reservas-unimet.appspot.com",
  messagingSenderId: "835778077893",
  appId: "1:835778077893:web:c280d5ec9c21a674117cac"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

export { auth };
export default appFirebase;