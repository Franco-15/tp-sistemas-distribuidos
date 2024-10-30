#include <WiFi.h>
#include <PubSubClient.h>
#include <NimBLEDevice.h>  // Librería para trabajar con Bluetooth
#include <ArduinoJson.h> // Libreria para trabajar con archivos JSON

// Configuracion WiFi
const char* ssid = "";
const char* password = "";

// Configuracion MQTT
const char* mqtt_server = ""; // Direccion broker MQTT
const char* topic = "checkpoint"; // Topic MQTT
const char* boardId = "cee1f9bf-6e42-4071-859a-82d71e231cc1";

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
      delay(100);
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
  mqttConnect();

  // Inicializar NimBLE
  NimBLEDevice::init(""); 
  pBLEScan = NimBLEDevice::getScan();  // Instancia de escaneo NimBLE
  pBLEScan->setActiveScan(true);       // Escaneo activo para obtener más info
  pBLEScan->setInterval(1000);         // Intervalo de escaneo en milisegundos
  pBLEScan->setWindow(999);            // Duracion de la ventana de escaneo en milisegundos

}

DynamicJsonDocument getDevicesData(){
  //Creacion de documento JSON de tamanio variable para que se ajuste al tamanio necesario de salida 
  DynamicJsonDocument doc(1024);
  doc["checkpointID"] = boardId;

  // Crear un array JSON para los dispositivos detectados
  JsonArray animals = doc["animals"].to<JsonArray>();
  scanDevices(&animals);

  return doc;
}

void scanDevices(JsonArray* arr){

  // Iniciar el escaneo de Bluetooth y obtener dispositivos detectados
  NimBLEScanResults foundDevices = pBLEScan->start(5, false);  // Escanea por 5 segundos

  int count = foundDevices.getCount();  // Obtener la cantidad de dispositivos encontrados
  for (int i = 0; i < count; i++) {
    NimBLEAdvertisedDevice device = foundDevices.getDevice(i);

    // Crear un objeto JSON para cada dispositivo detectado
    JsonObject dispositivo = arr->add<JsonObject>();
    dispositivo["id"] = String(device.getAddress().toString().c_str());  // Direccion MAC del dispositivo
    dispositivo["rssi"] = device.getRSSI();                      // RSSI del dispositivo
  }
}

void showResultsBySerial(DynamicJsonDocument jsonData){
  // Mostrar el JSON en el monitor serie en formato legible
  Serial.println("Dispositivos Bluetooth detectados:");
  serializeJsonPretty(jsonData, Serial);
  Serial.println();
}

void publishData(char* message){
  //Publicar en el topic MQTT la informacion de los dispositivos detectados
  if (client.connected()) {
    client.publish(topic, message);
    Serial.println("Message sent successfully by MQTT");
  }
  else
    Serial.println("¡CONNECTION ERROR. Couldn't send message by MQTT!");
}

void loop() {
  while(!client.connected()) {
    mqttConnect();
  }
  client.loop();

  DynamicJsonDocument jsonData = getDevicesData();
  showResultsBySerial(jsonData);

  // Medir el tamanio requerido para serializar el JSON. size_t = unsigned long
  size_t jsonSize = measureJson(jsonData);
  // Crear un buffer de tamanio jsonSize para almacenar el JSON serializado
  char serializedData[jsonSize + 1];  // +1 para el caracter nulo '\0'
  serializeJson(jsonData, serializedData, sizeof(serializedData));

  //Publicar datos serializados por MQTT
  publishData(serializedData);

  // Clean de los resultados
  pBLEScan->clearResults();

  // Esperar unos segundos antes de escanear nuevamente
  delay(5000);
}