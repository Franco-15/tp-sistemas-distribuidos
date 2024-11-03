// publisher.js
import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on('connect', () => {
    console.log('Conectado al broker MQTT como publicador');
    
    const message = JSON.stringify({
        
        checkpointID: 12,
        animals: [
            { id: '11:5e:e7:84:c4:f6', rssi: -50 },
            { id: '7c:0a:3f:83:db:93', rssi: -62 },
            { id: 'c2:5a:3d:ae:10:28', rssi: -73 }
        ]
    });

    client.publish('checkpoint', message, () => {
        console.log('Mensaje publicado:', message);
        client.end(); // Cierra la conexión una vez enviado el mensaje
    });
});