//punto de entrada: se inicializan las conexiones y se llama al msnHandler
import mqtt from './mqtt.js';
import { handleMessage } from './msnHandler.js';

mqtt.on('message', (topic, message) => {   // Cada vez que llega un nuevo mensaje, se ejectura msnHandler 
    handleMessage(topic, message);
});




