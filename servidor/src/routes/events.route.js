const clients = [];

export const eventsRoute = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive', 'Access-Control-Allow-Origin': '*', // Permite acceso desde cualquier origen
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });

    clients.push(res);
}

export const sendSSE = (data) => {
    clients.forEach((client) => {
        client.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}