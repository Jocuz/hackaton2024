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



// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Registro de usuario
const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    try {
        // Registrar al usuario
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);

        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';
        successMessage.textContent = 'Registro exitoso. Ahora puedes iniciar sesión.';
        errorMessage.style.display = 'none';
        console.log('Usuario registrado:', userCredential.user);
    } catch (error) {
        // Manejar errores
        errorMessage.style.display = 'block';
        errorMessage.textContent = `Error: ${error.message}`;
        successMessage.style.display = 'none';
        console.error('Error al registrar:', error);
    }
});