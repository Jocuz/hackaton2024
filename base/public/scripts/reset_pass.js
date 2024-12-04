import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

// Configuración de Firebase
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

document.getElementById('resetForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Evitar que el formulario se envíe de manera predeterminada
  var email = document.getElementById('email').value;

  sendPasswordResetEmail(auth, email).then(function() {
    alert('Correo de restablecimiento de contraseña enviado.');
    window.location.href = '../../templates/inicio_sesion.html';
  }).catch(function(error) {
    alert('Error al enviar el correo de restablecimiento de contraseña: ' + error.message);
  });
});