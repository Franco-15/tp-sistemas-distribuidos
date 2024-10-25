#include <WiFi.h>
#include <PubSubClient.h>
#include <NimBLEDevice.h>  // Librería NimBLE

// Configuración WiFi
const char* ssid = "";
const char* password = "";

// Configuración MQTT
const char* mqtt_server = ""; // Dirección del broker MQTT
const char* topic = "";   // Topic MQTT para publicar dispositivos detectados
const char* placaID = "PC_1";           // Identificador de la placa

WiFiClient espClient;
PubSubClient client(espClient);
NimBLEScan* pBLEScan;

void setup_wifi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

// Conectar a MQTT
void reconnect() {
  while (!client.connected()) {
    if (!client.connect(placaID)) {
      delay(5000);
    }
  }
}

void setup() {
  setup_wifi();
  client.setServer(mqtt_server, 1883);

  // Inicializar NimBLE
  NimBLEDevice::init(""); 
  pBLEScan = NimBLEDevice::getScan();  // Instancia de escaneo NimBLE
  pBLEScan->setActiveScan(true);       // Escaneo activo para obtener más información
  pBLEScan->setInterval(1000);         // Intervalo de escaneo en milisegundos
  pBLEScan->setWindow(999);            // Duración de la ventana de escaneo en milisegundos
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Iniciar el escaneo de Bluetooth y obtener dispositivos detectados
  NimBLEScanResults foundDevices = pBLEScan->start(5, false);  // Escanea por 5 segundos

  int count = foundDevices.getCount();  // Obtener la cantidad de dispositivos encontrados
  for (int i = 0; i < count; i++) {
    NimBLEAdvertisedDevice device = foundDevices.getDevice(i);
    
    // Obtener la dirección y la potencia de la señal (RSSI) del dispositivo
    String deviceInfo = String(placaID) + " - " + String(device.getAddress().toString().c_str()) + " - RSSI: " + String(device.getRSSI());
    
    // Publicar la información en el topic MQTT
    if (client.connected()) {
      client.publish(topic, deviceInfo.c_str());
    }
  }

  // Limpiar los resultados del escaneo para el próximo ciclo
  pBLEScan->clearResults();
}
