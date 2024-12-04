// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import {sendEmailVerification, getAuth, signInWithPopup, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword,  
    onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMivNlx7E3fyyXCJCjjloR_nXiQLiSnBY",
  authDomain: "sensorgotitaviva.firebaseapp.com",
  databaseURL: "https://sensorgotitaviva-default-rtdb.firebaseio.com",
  projectId: "sensorgotitaviva",
  storageBucket: "sensorgotitaviva.firebasestorage.app",
  messagingSenderId: "1016935156989",
  appId: "1:1016935156989:web:75f251828f53a6739ec294"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

login.addEventListener('click', (e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('pass').value;

  signInWithEmailAndPassword(auth, email, password).then(cred => {
      alert ("Usuario logueado");
      console.log(cred.user);
  }).catch(error => {
      const errorCode = error.code;
      
      if(errorCode == 'auth/invalid-email')
          alert ("Correo no valido");
      else if(errorCode == 'auth/user-disabled')
          alert ("Usuario deshabilitado");
      else if(errorCode == 'auth/user-not-found')
          alert ("Usuario no existe");
      else if(errorCode == 'auth/wrong-password')
        alert ("Contraseña incorrecta");
  });
});

cerrar.addEventListener('click', (e) => {
  auth.signOut().then(() => {
    alert("Sesión cerrada");
    window.location.href = '../../index.html';
  }).catch((error) => {
    alert("Error al cerrar sesión");
  });
});

auth.onAuthStateChanged(user => {
  if(user){
    console.log("Usuario activo");
    var email = user.emailVerified;
    if(email){
      window.open("https://www.google.com")
    }else{
      auth.signOut()
    }
  }else{
    console.log("Usuario inactivo")
  }
});
