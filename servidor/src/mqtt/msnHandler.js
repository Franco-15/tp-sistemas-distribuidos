import { saveToDatabase } from '../repositories/couchdb.js'; //todo:chequear 
import { sendSSE } from '../routes/sse/sse.controller.js'; //todo chequear 

export function handleMessage(topic, message) {
    if (topic === 'AAA') {
        try {
            const data = JSON.parse(message.toString());
            saveToDatabase(data);
            sendSSE(data);
        } catch (error) {
            console.error('Error al procesar el mensaje:', error);
        }
    }
}

