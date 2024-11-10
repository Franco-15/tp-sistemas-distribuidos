import { readFileSync, existsSync } from 'fs';
import express from 'express'; 

const FILE_PATH = './src/data/availableDevices.json';  

const router = express.Router();  // Creamos un enrutador

// Función para leer el archivo JSON
const getJson = () => {
    const fileExist = existsSync(FILE_PATH);  
    if (fileExist) {
        const file = readFileSync(FILE_PATH, 'utf-8');  
        const parsedFile = JSON.parse(file);  
        return parsedFile;
    } else {
        return [];
    }
};

// Ruta GET para obtener todos los dispositivos
router.get('/', (req, res) => {
    try {
        const result = getJson()
        res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Dispositivos registrados en el sistema'})
        res.write(JSON.stringify(result))
        res.end()
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar los dispositivos disponibles'}); 
    }
});

export default router;

/*import { readFileSync, existsSync } from 'fs';

const FILE_PATH =  './src/data/availableDevices.json' 

const getJson = () => {
    const fileExist = existsSync(FILE_PATH);
    if (fileExist) {
        const file = readFileSync(FILE_PATH, 'utf-8');
        const parsedFile = JSON.parse(file);
        return parsedFile;
    } else {
        return [];
    } 
} 

export const devicesRoute = (req, res) => { //Enviamos dispositivos al front
    const result = getJson()
    res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Dispositivos registrados en el sistema'})
    res.write(JSON.stringify(result))
    res.end()
    return
}
*/
