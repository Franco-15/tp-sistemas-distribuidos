import express from 'express'; 
import cors from 'cors';
import {receiveFromCheckPoint} from './controllers/mqtt.controller.js'
import eventsRoute from './routes/events.route.js';
import animalsRoute from './routes/animals.route.js';
import checkpointsRoute from './routes/checkpoints.route.js';
import loginRoute from './routes/login.route.js';
import devicesRoute from './routes/devices.route.js';
import refreshRoute from './routes/refresh.route.js';
import {authenticateToken} from './middlewares/authenticateToken.js';

const HTTP_PORT = 3000;
const rutaAnimal = "/api/animals"
const rutaCheckpoint = "/api/checkpoints"
const rutaLogin = "/api/login"
const rutaRefresh = "/api/refresh"
const rutaDevices = "/api/availableDevices"
const rutaPositions = "/api/animals/position"


receiveFromCheckPoint();

const app = express();

// Configuramos CORS globalmente para todas las rutas
app.use(cors({
    origin: 'http://localhost:3000', // Cambia al origen correcto
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Middleware para analizar JSON

// Definición de rutas
app.use(rutaPositions,authenticateToken, eventsRoute);
app.use(rutaAnimal,authenticateToken, animalsRoute);
app.use(rutaCheckpoint,authenticateToken, checkpointsRoute);
app.use(rutaLogin, loginRoute);
app.use(rutaDevices,authenticateToken, devicesRoute);
app.get(rutaRefresh, refreshRoute);


// Manejo de rutas no encontradas
app.use((req, res) => {
    res.writeHead(404,{'message':'Ruta no encontrada' })  
    return res.end()
});

// Iniciar el servidor
app.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});

app.use((err, req, res, next) => {
    res.writeHead(500,{'message':'Ocurrió un error en el servidor'})  
    return res.end()
});

