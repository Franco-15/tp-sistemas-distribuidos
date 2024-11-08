const clients = [];

export const eventsRoute = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });

    clients.push(res);
}

export const sendSSE = (data) => {
    clients.forEach((client) => {
        client.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}