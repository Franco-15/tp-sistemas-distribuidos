//el nombre desp lo vemos 
//todo: nombre del tema?

import mqtt from 'mqtt';

const mqttClient = mqtt.connect(process?.env?.MQTT_BROKER_URL);

mqttClient.on('connect', () => {
    console.log('Conectado al broker MQTT');
    mqttClient.subscribe('AAAA', (err) => {
        if (err) {
            console.error('Error al suscribirse:', err);
        } else {
            console.log('Suscrito al tema:AAAA ');
        }
    });
});

mqttClient.on('error', (err) => {
    console.error('Error en el cliente MQTT:', err);
});

export default mqttClient;
