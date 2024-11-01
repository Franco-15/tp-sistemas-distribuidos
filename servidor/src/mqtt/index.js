import mqttClient from './mqtt.js';
import { handleMessage } from './msnHandler.js';

mqttClient.on('message', (topic, message) => {
    handleMessage(topic, message);
});


