#include <WiFi.h>
#include <HTTPClient.h>

// Pines para los sensores
const int pHSensorPin = A0; 
const int turbiditySensorPin = A1;

// Wifi
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// URL del servidor
String serverPh = "https://sensorgotitaviva-default-rtdb.firebaseio.com/gotitaviva/cocacola/ph.json";
String serverTurbiedad = "https://sensorgotitaviva-default-rtdb.firebaseio.com/gotitaviva/cocacola/turbiedad.json";

void setup() {
  Serial.begin(115200);
  delay(1000);

  // Conexión a Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Conectando a Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado.");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Lecturas de los sensores
    int sensorValue_pH = analogRead(pHSensorPin); 
    // Convertir el voltaje (ESP32 usa 5V y 12 bits)
    float voltage_pH = sensorValue_pH * (5 / 4095.0); 

    int sensorValue_turbidity = analogRead(turbiditySensorPin);
    // dividir la turbidez entre 100 para obtener valores validos en el rango UTN's
    int turbidez = sensorValue_turbidity / 100; 

    // Mostrar los valores leídos por los sensores
    Serial.print("Sensor pH: ");
    Serial.println(voltage_pH);
    Serial.print("Sensor Turbidez: ");
    Serial.println(sensorValue_turbidity);

    
    // Generación JSON enviados
    String postDataPh = "{\"ph\": " + String(voltage_pH) + "}";
    String postDataTurbiedad = "{\"turbiedad\": " + String(turbidez) + "}";

    //String postDataPh = "{\"ph\": 6}";
    //String postDataTurbiedad = "{\"turbiedad\": 76 }";
  
    // Instancia HTTPClient
    HTTPClient http;

    http.begin(serverPh.c_str()); // Inicializar el servidor 
    http.addHeader("Content-Type", "application/json"); // Establecer tipo de contenido JSON
    int httpResponseCodePh = http.POST(postDataPh); // Enviar con método POST
    if (httpResponseCodePh > 0) { // manejar la respuesta del servidor
        Serial.print("Respuesta del servidor pH: ");
        Serial.println(httpResponseCodePh);
    } else {
        Serial.print("Error al enviar solicitud POST pH. Código de error: ");
        Serial.println(httpResponseCodePh);
    }

    http.begin(serverTurbiedad.c_str()); // Inicializar el servidor
    int httpResponseCodeTurbiedad = http.POST(postDataTurbiedad); // Enviar con método POST
    if (httpResponseCodeTurbiedad > 0) { // manejar la respuesta del servidor
        Serial.print("Respuesta del servidor Turbidez: ");
        Serial.println(httpResponseCodeTurbiedad);
    } else {
        Serial.print("Error al enviar solicitud POST Turbidez. Código de error: ");
        Serial.println(httpResponseCodeTurbiedad);
    }

    // Finalizar la conexión HTTP
    http.end();
  } else {
    Serial.println("Wi-Fi desconectado, intentando reconectar...");
    WiFi.reconnect();
  }

  delay(5000); // Esperar 5 segundos antes de la próxima lectura
}
