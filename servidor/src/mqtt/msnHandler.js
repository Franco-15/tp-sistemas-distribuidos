export function handleMessage(topic, message) {
    if (topic === 'checkpoint') {
        try {
            const data = JSON.parse(message.toString());
            console.log(data);
            //!   aca tendria q persistir la info de los mensajes?
            //!   como toma el servidor la info q recibe del mqtt?
        } catch (error) {
            console.error('Error al procesar el mensaje:', error);
        }
    }
}

