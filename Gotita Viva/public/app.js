import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCMivNlx7E3fyyXCJCjjloR_nXiQLiSnBY",
  authDomain: "sensorgotitaviva.firebaseapp.com",
  databaseURL: "https://sensorgotitaviva-default-rtdb.firebaseio.com",
  projectId: "sensorgotitaviva",
  storageBucket: "sensorgotitaviva.appspot.com",
  messagingSenderId: "1016935156989",
  appId: "1:1016935156989:web:75f251828f53a6739ec294"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencia al nodo 'gotitaviva/cocacola'
const dbRef = ref(database, 'gotitaviva/cocacola');

// Modal y botón de cierre
const modal = document.getElementById('alertaModal');
const cerrarModal = document.getElementById('cerrarModal');

// Función para cerrar el modal
const closeModal = () => {
  modal.style.display = "none";  // Oculta el modal
};

// Abre el modal
const openModal = () => {
  modal.style.display = "block";  // Muestra el modal
};

// Escucha el evento de clic en el botón de cierre del modal
cerrarModal.addEventListener('click', closeModal);

// Variables para almacenar los valores de pH y turbiedad
let lastPhValue = null;

// Escucha cambios en tiempo real
onValue(dbRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log("Datos completos de Firebase:", data); // Log para ver todos los datos

    // Accede a los valores de PH (último valor actualizado)
    const phValues = Object.values(data.ph);  // Esto devuelve un array con todos los objetos ph
    const lastPhEntry = phValues[phValues.length - 1];  // Último valor
    lastPhValue = lastPhEntry.ph;  // Guarda el valor de pH

    // Accede a los valores de turbiedad (último valor actualizado)
    const turbiedadValues = Object.values(data.turbiedad);  // Esto devuelve un array con todos los objetos de turbiedad
    const lastTurbiedadValue = turbiedadValues[turbiedadValues.length - 1].turbiedad;  // Accede al último valor de turbiedad

    // Actualiza el contenido del HTML para cada sección
    // Actualiza el contenido del HTML para cada sección
document.getElementById('fecha-tinaco1').textContent = `Fecha: ${data.fecha}`;
document.getElementById('ph-tinaco1').textContent = `pH: ${lastPhValue}`;
document.getElementById('turbiedad-tinaco1').textContent = `Turbiedad: ${lastTurbiedadValue}`;

document.getElementById('fecha-tinaco2').textContent = `Fecha: ${data.fecha}`;
document.getElementById('ph-tinaco2').textContent = `pH: ${lastPhValue}`;
document.getElementById('turbiedad-tinaco2').textContent = `Turbiedad: ${lastTurbiedadValue}`;

document.getElementById('fecha-cisterna').textContent = `Fecha: ${data.fecha}`;
document.getElementById('ph-cisterna').textContent = `pH: ${lastPhValue}`;
document.getElementById('turbiedad-cisterna').textContent = `Turbiedad: ${lastTurbiedadValue}`;

document.getElementById('fecha-piscina').textContent = `Fecha: ${data.fecha}`;
document.getElementById('ph-piscina').textContent = `pH: ${lastPhValue}`;
document.getElementById('turbiedad-piscina').textContent = `Turbiedad: ${lastTurbiedadValue}`;

    // Verificar si el valor de pH es >= 15 y mostrar el modal cada 10 segundos si es necesario
    setInterval(() => {
      if (lastPhValue >= 15) {
        openModal(); // Muestra el modal si el pH >= 15
      } else {
        closeModal(); // Oculta el modal si el pH < 15
      }
    }, 10000); // 10000 ms = 10 segundos
  } else {
    console.log("No hay datos disponibles en Firebase.");
  }
});