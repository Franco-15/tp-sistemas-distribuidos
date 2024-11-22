/**
 * Este módulo se encarga de gestionar la conexión y suscripción a un broker MQTT.
 * Utiliza las variables de entorno para configurar la URL del broker y el tema al que suscribirse.
 * 
 * Funcionalidad principal:
 * - Conectar al broker MQTT utilizando las opciones especificadas.
 * - Suscribirse a un tema específico para recibir mensajes.
 * - Procesar los mensajes recibidos verificando su formato, filtrando datos por RSSI,
 *   validando los datos y enviando paquetes válidos a través de SSE.
 * - Manejar errores de conexión y de formato de mensaje.
 * 
 * Dependencias:
 * - mqtt: para la conexión y gestión de mensajes MQTT.
 * - dotenv: para cargar variables de entorno.
 * - Funciones auxiliares de 'mqttReceiver.js' para el procesamiento de datos.
 * - Función 'sendSSE' de 'events.route.js' para enviar datos procesados.
 */

import mqtt from 'mqtt';
import dotenv from 'dotenv';
import {
    checkMessageFormat,
    filterDataByRSSI,
    validateData,
    getInitialPositions,
    addReceivedPacket,
    getCheckpointData,
    deleteCheckpointData,
    saveNewPositions,
    updatePositions,
    getPacketToSend,
    updateAvailableDevices
} from '../services/mqtt.service.js';
import { sendSSE } from '../routes/events.route.js';

dotenv.config(); // carga variables de entorno


export const receiveFromCheckPoint = () => {

    let receivedPackets = [];
    let positions = getInitialPositions();
    const mqttOptions = { reconnectPeriod: 1000 };
    const mqttBroker = process?.env?.MQTT_BROKER_URL || 'mqtt://localhost:1883';
    const mqttTopic = process?.env?.MQTT_TOPIC || 'test/checkpoint';
    const mqttName = process?.env?.MQTT_NAME || 'mqttReceiver';
    const mqttPassword = process?.env?.MQTT_PASSWORD || 'mqttReceiver';
    const mqttClient = mqtt.connect(mqttBroker, { clientId: mqttName, username: mqttName, password: mqttPassword, ...mqttOptions });

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
                    addReceivedPacket(data, receivedPackets);
                    if (data.totalPackages == data.packageNum) {
                        updateAvailableDevices(receivedPackets);
                        const checkpointReceived = getCheckpointData(receivedPackets, data.checkpointID);
                        deleteCheckpointData(receivedPackets, data.checkpointID);
                        let filteredData = filterDataByRSSI(checkpointReceived);
                        const validData = validateData(filteredData);
                        const packetToSend = getPacketToSend(validData);
                        updatePositions(positions);
                        saveNewPositions(packetToSend, positions);
                        sendSSE(JSON.stringify(positions));
                        console.log('Mensaje recibido y procesado:', positions);
                    }
                } else
                    console.error('Mensaje en formato incorrecto:', data);
            }
        } catch (err) {
            console.error(`Error al parsear el mensaje en ${topic}:`, err);
        }
    });
};
