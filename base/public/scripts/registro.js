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

submitButton.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;

    createUserWithEmailAndPassword(auth, email, password).then(cred => {
        alert ("Usuario creado");
        sendEmailVerification(auth.currentUser).then(() =>{
            alert ("Se ha enviado un correo de verificación");
        window.location.href = '../../templates/inicio_sesion.html';
        });
    }).catch(error => {
        const errorCode = error.code;
        
        if(errorCode == 'auth/email-already-in-use')
            alert ("Correo en uso");
        else if(errorCode == 'auth/ivalid-email')
            alert ("Correo invalido");
        else if(errorCode == 'auth/weak-password')
            alert ("La contraseña debe tener al menos 6 caracteres")
    });
});
