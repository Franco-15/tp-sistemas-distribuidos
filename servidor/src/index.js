import express from 'express'; 
import cors from 'cors';
import http from 'http';
import {receiveFromCheckPoint} from './controllers/mqtt.controller.js'
import {eventsRoute} from './routes/events.route.js';
import animalsRoute from './routes/animals.route.js';
import {checkpointsRoute} from './routes/checkpoints.route.js';
import {loginRoute} from './routes/login.route.js';
import {devicesRoute} from './routes/devices.route.js';

const HTTP_PORT = 3000;
const rutaAnimal = "/api/animals"
const rutaCheckpoint = "/api/checkpoints"
const rutaLogin = "/api/login"
const rutaRefresh = "/api/refresh"
const rutaDevices = "/api/availableDevices"
const rutaPositions = "/api/animals/position"


receiveFromCheckPoint();

// Configuramos CORS globalmente para todas las rutas
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Cambia al origen correcto
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Middleware para analizar JSON

// Definición de rutas
app.use(rutaPositions, eventsRoute);
app.use(rutaAnimal, animalsRoute);
app.use(rutaCheckpoint, checkpointsRoute);
app.use(rutaLogin, loginRoute);
app.use(rutaDevices, devicesRoute);


app.get('/api/refresh', (req, res) => {
    res.status(501).send({ message: 'Hay que desarrollar esto con JWT' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});