import mqtt from './mqtt.js';
import { handleMessage } from './msnHandler.js';

mqtt.on('message', (topic, message) => {
    handleMessage(topic, message);
});


