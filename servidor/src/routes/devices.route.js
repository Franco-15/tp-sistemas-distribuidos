import { readFileSync, existsSync } from 'fs';
import express from 'express';  // Necesitamos Express para crear rutas

const FILE_PATH = './src/data/availableDevices.json';  // Ruta del archivo JSON

const router = express.Router();  // Creamos un enrutador

// Función para leer el archivo JSON
const getJson = () => {
    const fileExist = existsSync(FILE_PATH);  // Verifica si el archivo existe
    if (fileExist) {
        const file = readFileSync(FILE_PATH, 'utf-8');  // Lee el archivo
        const parsedFile = JSON.parse(file);  // Parsea el archivo JSON
        return parsedFile;
    } else {
        return [];
    }
};

// Ruta GET para obtener todos los dispositivos
router.get('/devices', (req, res) => {
    try {
        const result = getJson();
        if (result.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron dispositivos registrados en el sistema.'
            });
        }
        res.status(200).json({
            message: 'Dispositivos registrados en el sistema',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los dispositivos' });  // En caso de error
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
