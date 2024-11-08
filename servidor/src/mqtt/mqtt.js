import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config(); // carga variables de entorno

const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL); // Conectar al broker


mqttClient.on('connect', () => {
    console.log('Conectado al broker MQTT AAAAA');
    mqttClient.subscribe('checkpoint', (err) => {
        if (err) {
            console.error('Error al suscribirse:', err);
        } else {
            console.log('Suscrito al tema: checkpoint ');
        }
    });
});

mqttClient.on('error', (err) => {
    console.error('Error en el cliente MQTT:', err);
});



export default mqttClient;

/*
/* (Cuando llega el msn)
1. Verificar que el topico sea el correcto
2. Verificar la estructura del mensaje (que existan los campos necesarios)
3. Verificar que el checkpointID exista en el archivo de checkpoints.json
4. Verificar que los animales existan en el archivo de animales.json
5. Armar mensaje de respuesta con los animales que se encontraron

{
    checkpointID: <macWemos>,
    animals: [
      { id: '11:5e:e7:84:c4:f6', rssi: -50 },
      { id: '7c:0a:3f:83:db:93', rssi: -62 },
      { id: 'c2:5a:3d:ae:10:28', rssi: -73 }
    ]
}
  
// index.js
import mqtt from './mqtt.js';
import axios from 'axios';
const apiUrl = 'http://localhost:3000/animals/position'; //sin el API xq sino no entra en el req.url.startsWith(rutaAnimal) del index.js


mqtt.on('message', async (topic, message) => {
    if (topic === 'checkpoint') {
        const data = JSON.parse(message.toString());
        console.log('Datos recibidos del broker:', data);
        
        console.log('Mensaje enviado a la API:', data);

    }
});


import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config(); // carga variables de entorno

const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL); // Conectar al broker


mqttClient.on('connect', () => {
    console.log('Conectado al broker MQTT AAAAA');
    mqttClient.subscribe('checkpoint', (err) => {
        if (err) {
            console.error('Error al suscribirse:', err);
        } else {
            console.log('Suscrito al tema: checkpoint ');
        }
    });
});

mqttClient.on('error', (err) => {
    console.error('Error en el cliente MQTT:', err);
});



export default mqttClient;
*/
