import { readFileSync, writeFileSync, existsSync } from 'fs';
import { readJSONFile, writeJSONFile } from '../services/file.service.js';

const FILE_PATH =  './src/data/animals.json'
const AVAILABLE_DEVICES_FILE_PATH = './src/data/availableDevices.json'

//En esta clase se abarcan todos los metodos en respuesta a las solicitudes que pueden llegar del cliente en relación a los animales

export const getJson = () => {
    const fileExist = existsSync(FILE_PATH);
    if (fileExist) {
        const file = readFileSync(FILE_PATH, 'utf-8');
        const parsedFile = JSON.parse(file);
        return parsedFile;
    } else {
        return [];
    } 
} 

export const getAnimales = () => { //Metodo que recupera todos los animales
        const result = getJson()
        const response = {
            data: result
        }
        return JSON.stringify(response)

}

export const getAnimal = (idAnimal,res) => { //Metodo que recupera un animal
    const result = getJson()
    const buscado = result.findIndex((item) => {
        return item.id === idAnimal
    })
    if (buscado < 0){
        res.writeHead(404, 'El animal buscado no existe o no se encuentra registrado en el sistema');
        return res.end()
        
    }else{
        let animalBuscado = JSON.stringify(result[buscado])
        res.writeHead(200,{'Content-Type': 'application/json'})
        res.write(animalBuscado)
        return res.end()
        
    }
}

export const postAnimal = (parsedBody) => { //Metodo que agrega un animal
    const result = getJson();
    const availableDevices = readJSONFile(AVAILABLE_DEVICES_FILE_PATH);

    const exists = result.findIndex((animal) => animal.id === parsedBody.id);
    if (exists > -1) {
        return false
        
    }
    if (availableDevices.devices.includes(parsedBody.id)) {
        availableDevices.devices.splice(availableDevices.devices.indexOf(parsedBody.id), 1);
        writeJSONFile(AVAILABLE_DEVICES_FILE_PATH, availableDevices);
    }
    result.push(parsedBody);
    writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
    return true
}

export const deleteAnimal = (idAnimal, res) => { //Metodo que elimina un animal
    const result = getJson()
    const buscado = result.findIndex((item) => item.id === idAnimal);

    if (buscado < 0) {
        return false
    }else{      
        result.splice(buscado, 1); 
        writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
        return true
    }
    
}

export const patchAnimal = (newAnimal) => { //Metodo que modifica un animal
    const result = getJson();
    const buscado = result.findIndex((item) => {
        return item.id === newAnimal.id
    })
    if(buscado < 0){
        return false
    }else{
        const oldAnimal = result[buscado];
        result[buscado] = {
            id: newAnimal.id,
            name: newAnimal.name || oldAnimal.name,
            description: newAnimal.description || oldAnimal.description
        }
        writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
        return true
    }
}