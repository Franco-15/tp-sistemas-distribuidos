import mqtt from 'mqtt';
import dotenv from 'dotenv';
import { checkMessageFormat, filterDataByRSSI, validateData } from '../models/mqttReceiver.js';
import { sendSSE } from '../routes/events.js';

dotenv.config(); // carga variables de entorno


export const receiveFromCheckPoint = () => {

    const mqttOptions = { reconnectPeriod: 1000 };
    const mqttBroker = process?.env?.MQTT_BROKER_URL || 'mqtt://localhost:1883';
    const mqttTopic = process?.env?.MQTT_TOPIC || 'test/checkpoint';
    const mqttClient = mqtt.connect(mqttBroker, mqttOptions); // Conectar al broker

    mqttClient.on('connect', () => {
        console.log(`Conectado al broker MQTT en ${mqttBroker}`);
        mqttClient.subscribe(mqttTopic, (err) => {
            if (err) {
                console.error('Error al suscribirse:', err);
            } else {
                console.log('Suscrito al tema: checkpoint ');
            }
        });
    });

    mqttClient.on('error', (err) => {
        console.error('Error en el cliente MQTT:', err.message);
    });


    // Cuando llega un mensaje al topic suscrito
    mqttClient.on('message', (topic, message) => {
        try {
            if (topic === mqttTopic) {
                const data = JSON.parse(message.toString());
                if (checkMessageFormat(data)) {
                    let filteredData = filterDataByRSSI(data);

                    console.log('Animales cercanos al checkpoint:', filteredData);
                    const validData = validateData(filteredData);
                    console.log('Datos validados:', validData);
                    sendSSE(validData);

                } else
                    console.error('Mensaje en formato incorrecto:', data);
            }
        } catch (err) {
            // Si ocurre un error al parsear el JSON, muestra el mensaje original y el error
            console.error(`Error al parsear el mensaje en ${topic}:`, message.toString());
            console.error('Detalle del error:', err);
        }
    });
};