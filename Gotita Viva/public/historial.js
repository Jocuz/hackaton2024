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

// Referencia al nodo 'gotitaviva'
const dbRef = ref(database, 'gotitaviva/cocacola');

// Variable para almacenar los datos completos
let dataStore = {};

// Escucha cambios en tiempo real
onValue(dbRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log("Datos completos de Firebase:", data); // Log para ver todos los datos
    dataStore = data; // Guardamos los datos completos
  } else {
    console.log("No hay datos disponibles");
  }
}, (error) => {
  console.error("Error al obtener los datos: ", error);
});

// Función para mostrar los datos de gotitaviva cuando el usuario haga clic en "Aceptar"
function showData() {
  const dataContainer = document.getElementById('data-container');
  const dataList = document.getElementById('data-list');

  // Limpiar la lista antes de agregar los nuevos registros
  dataList.innerHTML = '';

  // Verificar si los datos están disponibles en dataStore
  if (!dataStore || Object.keys(dataStore).length === 0) {
    console.log('No se encontraron datos de gotitaviva');
    document.getElementById('no-data').style.display = 'block';
    return;
  }

  // Obtener los últimos 10 registros de pH y turbiedad
  const phValues = dataStore.ph ? Object.values(dataStore.ph).slice(-10) : [];
  const turbiedadValues = dataStore.turbiedad ? Object.values(dataStore.turbiedad).slice(-10) : [];
  const fechas = dataStore.fecha ? [dataStore.fecha].slice(-10) : [];

  if (phValues.length === 0 || turbiedadValues.length === 0) {
    document.getElementById('no-data').style.display = 'block';
    return;
  }

  // Recorrer los últimos 10 registros y mostrarlos
  for (let i = 0; i < phValues.length; i++) {
    const listItem = document.createElement('div');
    listItem.innerHTML = `
      <div class="data-item">
        <h3>Registro ${i + 1}</h3>
        <p><strong>Fecha:</strong> ${fechas[i] || 'Fecha no disponible'}</p>
        <p><strong>pH:</strong> ${phValues[i].ph || 'No disponible'}</p>
        <p><strong>Turbiedad:</strong> ${turbiedadValues[i].turbiedad || 'No disponible'}</p>
      </div>
    `;
    dataList.appendChild(listItem);
  }

  // Mostrar el contenedor con los datos
  dataContainer.style.display = 'block';
}

// Función para generar el PDF
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const phValues = dataStore.ph ? Object.values(dataStore.ph).slice(-10) : [];
  const turbiedadValues = dataStore.turbiedad ? Object.values(dataStore.turbiedad).slice(-10) : [];
  const fechas = dataStore.fecha ? [dataStore.fecha].slice(-10) : [];

  const logoUrl = '../assets/logo.png';
    doc.addImage(logoUrl, 'PNG', 10, 5, 15, 15);


  // Configurar la fuente en negritas y centrado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text('Historial de Datos', doc.internal.pageSize.width / 2, 10, { align: 'center' });

  // Título centrado
  doc.setFontSize(12);
  doc.text('pH y Turbiedad - Últimos 10 Registros', doc.internal.pageSize.width / 2, 20, { align: 'center' });

  let yPosition = 30;
  for (let i = 0; i < phValues.length; i++) {
    doc.text(`Registro ${i + 1}.`, 14, yPosition);
    doc.text(`Fecha: ${fechas[i] || 'Fecha no disponible'}`, 14, yPosition + 10);
    doc.text(`pH: ${phValues[i].ph || 'No disponible'}`, 14, yPosition + 20);
    doc.text(`Turbiedad: ${turbiedadValues[i].turbiedad || 'No disponible'}`, 14, yPosition + 30);

    // Separador
    doc.setLineWidth(0.5);
    doc.line(14, yPosition + 35, 200, yPosition + 35);

    yPosition += 40; // Separar cada registro

    // Si la página se llena, se agrega una nueva página
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20; // Reiniciar posición vertical
    }
  }

  // Descargar el archivo PDF
  doc.save('historial_de_datos.pdf');
}

// Asegurarse de que el código se ejecute solo después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const acceptBtn = document.getElementById('acceptBtn');
  acceptBtn.addEventListener('click', showData);

  // Agregar el evento para descargar el PDF
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  downloadPdfBtn.addEventListener('click', generatePDF);
});
