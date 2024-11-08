import { readFileSync, existsSync } from 'fs';

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

