// index.js
import mqtt from './mqtt.js';
import axios from 'axios';
const apiUrl = 'http://localhost:3000/API/animals/position';


mqtt.on('message', async (topic, message) => {
    if (topic === 'checkpoint') {
        try {
            const data = JSON.parse(message.toString());
            console.log('Datos recibidos del broker:', data);

            // Envía los datos al servidor en la ruta API/animals/position
            const response = await axios.post(apiUrl, data);
            console.log('Mensaje enviado a la API:', response.data);

        } catch (error) {
            console.error('Error al enviar el mensaje a la API:', error);
        }
    }
});


