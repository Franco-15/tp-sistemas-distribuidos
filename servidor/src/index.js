import express from 'express'; 
import cors from 'cors';
import http from 'http';
import {receiveFromCheckPoint} from './controllers/mqtt.controller.js'
import {eventsRoute} from './routes/events.route.js';
import {animalsRoute} from './routes/animals.route.js';
import {checkpointsRoute} from './routes/checkpoints.route.js';
import {loginRoute} from './routes/login.route.js';
import {devicesRoute} from './routes/devices.route.js';

const HTTP_PORT = 3000;  //Puerto desde el que se comunica el back
const rutaAnimal = "/api/animals"
const rutaCheckpoint = "/api/checkpoints"
const rutaLogin = "/api/login"
const rutaRefresh = "/api/refresh"
const rutaDevices = "/api/availableDevices"
const rutaPositions = "/api/animals/position"


receiveFromCheckPoint();



//Usamos express y cors para poder comunicar back/front
const app = express();

app.options('*', cors()); // Permite todas las solicitudes de preflight OPTIONS

app.use(cors({
    origin: 'http://localhost:3000', // Cambia al origen correcto
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Metodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    //credentials: true
}));



const server = http.createServer((req, res) => {

    if ((req.method) == 'OPTIONS') {
        setHeaders(res); 
        res.writeHead(204); 
        return res.end();
    } 
    
    console.log(req.method)
    if(req.url == rutaPositions){ //Ruta para iniciar conexion entre front y mqtt
        eventsRoute(req, res);
    }else if(req.url.startsWith(rutaAnimal)){ //Ruta que redirige a los metodos de los animales
        //setHeaders(res); 
        animalsRoute(req, res);
    }else if (req.url.startsWith(rutaCheckpoint)){ //Ruta que redirige a los metodos de los checkpoints
        //setHeaders(res);
        checkpointsRoute(req, res);
    }else if(req.url.startsWith(rutaLogin)){ //Ruta para llevar a cabo el logueo inicial
        //setHeaders(res);
        loginRoute(req,res)
    }else if(req.url.startsWith(rutaRefresh)){ //Ruta para ir refrescando la sesion de usuario (desarrollado en promocion)
        //setHeaders(res);
        //ACA HABRIA QUE DESARROLLAR EL TEMA DEL REFRESH
    }else if(req.url.startsWith(rutaDevices)){ // Ruta de los dispositivos no identificados 
        devicesRoute(req,res)
    }else { //Ruta invalida
        res.writeHead(404, {'message':'Ruta no encontrada'})
        return res.end() 
    }  
})

server.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`)
})

const setHeaders= (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todas las fuentes
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS"); // Metodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With"); // Encabezados permitidos 
}