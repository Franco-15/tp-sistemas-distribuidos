#include <WiFi.h>
#include <PubSubClient.h>
#include <NimBLEDevice.h>
#include <ArduinoJson.h>

//Configuracion de la red WiFi y MQTT
const char* ssid = "";
const char* password = "";
const char* mqtt_server = ""; //Direccion broker MQTT
const char* topic = "checkpoint"; //Topic MQTT
const char* boardId = "cee1f9bf-6e42-4071-859a-82d71e231cc1";

WiFiClient espClient;
PubSubClient client(espClient);
NimBLEScan* pBLEScan;

//Tamanio max de dispositivos por paquete
int maxDevicesPerPacket = 1;

//Funcion para conectar a la red WiFi
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

//Funcion para conectar al servidor MQTT
void mqttConnect() {
  int connectionAttempts = 0;
  Serial.print("\nConnecting to MQTT server");
  while (!client.connected() && connectionAttempts < 10) {
    if (!client.connect(boardId)) {
      Serial.print(".");
      connectionAttempts += 1;
      delay(100);
    }
  }
  if (client.connected()) {
    Serial.println("\nSuccessfully connected to MQTT server!");
  } else {
    Serial.println("\nFailed to connect to the MQTT server!");
  }
}

void setup() {
  Serial.begin(115200);
  wifiConnect();                        // Conexión a WiFi
  client.setServer(mqtt_server, 1883);  // Configurar el servidor MQTT
  mqttConnect();                        // Conexión a MQTT

  //Inicializacion de NimBLE para escaneo Bluetooth
  NimBLEDevice::init("");
  pBLEScan = NimBLEDevice::getScan();
  pBLEScan->setActiveScan(true);  // Activar el escaneo para obtener más información
  pBLEScan->setInterval(1000);    // Intervalo entre escaneos (ms)
  pBLEScan->setWindow(999);       // Duración de la ventana de escaneo (ms)
}

//Escanea dispositivos Bluetooth y devuelve un array JSON con los dispositivos detectados
JsonArray getScannedDevices(DynamicJsonDocument& doc) {
  JsonArray animals = doc.createNestedArray("animals");
  NimBLEScanResults foundDevices = pBLEScan->start(5, false);  // Escaneo de 5 segundos

  int count = foundDevices.getCount();
  for (int i = 0; i < count; i++) {
    NimBLEAdvertisedDevice device = foundDevices.getDevice(i);
    JsonObject dispositivo = animals.createNestedObject();
    dispositivo["id"] = String(device.getAddress().toString().c_str());  // Dirección MAC
    dispositivo["rssi"] = device.getRSSI();                              // Nivel de señal
  }

  return animals;
}

//Muestra los dispositivos detectados en el monitor serial
void showResultsBySerial(DynamicJsonDocument& jsonData) {
  Serial.println("Dispositivos Bluetooth detectados:");
  serializeJsonPretty(jsonData, Serial);
  Serial.println();
}

//Funcion para publicar mensaje en el topic MQTT
void publishData(const char* message) {
  if (client.connected()) {
    client.publish(topic, message);
    Serial.println("Message sent successfully by MQTT");
  } else {
    Serial.println("¡CONNECTION ERROR. Couldn't send message by MQTT!");
  }
}

//Funcion donde se dividen en paquetes los dispostivos detectados y se llama a la funcion para que los publique
void publishDataInBatches(JsonArray animals) {
  int totalDevices = animals.size();
  int totalPackages = (totalDevices + maxDevicesPerPacket - 1) / maxDevicesPerPacket;  //Calcula la cantidad de paquetes necesarios

  for (int packageNum = 0; packageNum < totalPackages; packageNum++) {
    DynamicJsonDocument packageDoc(512);
    packageDoc["checkpointID"] = boardId;
    packageDoc["packageNum"] = packageNum + 1;
    packageDoc["totalPackages"] = totalPackages;

    JsonArray packageAnimals = packageDoc.createNestedArray("animals");

    int startIdx = packageNum * maxDevicesPerPacket;
    int endIdx = min(startIdx + maxDevicesPerPacket, totalDevices);

    // Agrega dispositivos al paquete actual
    for (int i = startIdx; i < endIdx; i++) {
      packageAnimals.add(animals[i]);
    }

    // Serializa el paquete y lo envía
    char buffer[512];
    serializeJson(packageDoc, buffer, sizeof(buffer));
    publishData(buffer);
    showResultsBySerial(packageDoc);  // Muestra el paquete enviado
  }
}

void loop() {
  //Asegura la conexión al broker. Mientras no se conecte, no continua la ejecucion del codigo
  while (!client.connected()) {
    mqttConnect();
  }
  client.loop();
  
  //Obtener dispositivos detectados
  DynamicJsonDocument doc(1024);
  JsonArray animals = getScannedDevices(doc);  //Obtener dispositivos directamente

  //Enviar en paquetes los dispositivos detectados
  publishDataInBatches(animals);

  pBLEScan->clearResults();  // Limpiar resultados previos
  delay(5000);               // Espera antes de un nuevo escaneo
}
