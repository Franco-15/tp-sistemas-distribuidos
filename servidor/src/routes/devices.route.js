import { readFileSync, existsSync } from 'fs';
import express from 'express'; 

//Clase en la que se manejan todas las rutas finales asociadas a los dispositivos disponibles del sistema

const FILE_PATH = './src/data/availableDevices.json';  

const router = express.Router(); 

//Función para leer el archivo JSON
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

// GET /api/availableDevices - Obtiene todos los dispositivos no identificados del sistema
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