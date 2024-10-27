#include <WiFi.h>
#include <PubSubClient.h>
#include <NimBLEDevice.h>  // Librería NimBLE

// Configuración WiFi
const char* ssid = "";
const char* password = "";

// Configuración MQTT
const char* mqtt_server = ""; // Dirección del broker MQTT
const char* topic = "";   // Topic MQTT para publicar dispositivos detectados
const char* boardId = "PC_1";           // Identificador de la placa

WiFiClient espClient;
PubSubClient client(espClient);
NimBLEScan* pBLEScan;

void wifiConnect() {
  Serial.println("\nConnecting to ");
  Serial.print(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }
  Serial.print("\nConnected to network: ");
  Serial.println(ssid);
}

// Conectar a MQTT
void mqttConnect() {
  int connectionAttempts = 0;
  Serial.print("\nConnecting to MQTT server");
  while (!client.connected() && connectionAttempts<10) {
    if (!client.connect(boardId)) {
      Serial.print(".");
      connectionAttempts+=1;
      delay(10);
    }
  }

  if(client.connected()){
    Serial.println("\nSuccesfully connection to MQTT server!");
  }else
    Serial.println("\nFailed to connect to the MQTT server!");
}

void setup() {
  Serial.begin(115200);
  wifiConnect();
  client.setServer(mqtt_server, 1883);

  // Inicializar NimBLE
  NimBLEDevice::init(""); 
  pBLEScan = NimBLEDevice::getScan();  // Instancia de escaneo NimBLE
  pBLEScan->setActiveScan(true);       // Escaneo activo para obtener más información
  pBLEScan->setInterval(1000);         // Intervalo de escaneo en milisegundos
  pBLEScan->setWindow(999);            // Duración de la ventana de escaneo en milisegundos
}

void loop() {
  while(!client.connected()) {
    mqttConnect();
  }
  client.loop();

  // Iniciar el escaneo de Bluetooth y obtener dispositivos detectados
  NimBLEScanResults foundDevices = pBLEScan->start(5, false);  // Escanea por 5 segundos

  int count = foundDevices.getCount();  // Obtener la cantidad de dispositivos encontrados
  for (int i = 0; i < count; i++) {
    NimBLEAdvertisedDevice device = foundDevices.getDevice(i);
    
    // Obtener la dirección y la potencia de la señal (RSSI) del dispositivo
    String deviceInfo = String(boardId) + " - " + String(device.getAddress().toString().c_str()) + " - RSSI: " + String(device.getRSSI());
    
    // Publicar la información en el topic MQTT
    if (client.connected()) {
      client.publish(topic, deviceInfo.c_str());
    }
  }

  // Limpiar los resultados del escaneo para el próximo ciclo
  pBLEScan->clearResults();
}
