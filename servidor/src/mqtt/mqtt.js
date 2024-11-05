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
