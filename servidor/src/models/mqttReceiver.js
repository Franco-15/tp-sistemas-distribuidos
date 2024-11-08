import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Crea __dirname en el entorno de módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const animalsFilePath = path.join(__dirname, '../data/animals.json');
const checkpointsFilePath = path.join(__dirname, '../data/checkpoints.json');

console.log(animalsFilePath);
console.log(checkpointsFilePath);

let animalsData = [];
let checkpointsData = [];

try {
    animalsData = JSON.parse(fs.readFileSync(animalsFilePath, 'utf8'));
} catch (error) {
    console.error('Error al cargar el archivo animals.json:', error);
}

try {
    checkpointsData = JSON.parse(fs.readFileSync(checkpointsFilePath, 'utf8'));
} catch (error) {
    console.error('Error al cargar el archivo checkpoints.json:', error);
}

export const checkMessageFormat = (data) => {
    try {
        if (data.hasOwnProperty('checkpointID') && data.hasOwnProperty('animals')) {
            return true;
        }
    } catch (error) {
        console.error('Error al parsear el mensaje:', error);
    }
    return false;
};

export const filterDataByRSSI = (data) => {
    try {
        const filteredAnimals = data.animals.filter(animal => animal.rssi >= -80); // Cambiar por -40 
        return { ...data, animals: filteredAnimals };

    } catch (error) {
        console.error('Error al filtrar los datos:', error);
        return [];
    }
};

export const validateData = (data) => {
    const validData = [];
    console.log('data:', data);
    data.animals.forEach(animal => {
        if (animalsData.some((storedAnimal) => storedAnimal.id === animal.id)) {
            validData.push(animal);
        }
    });
    return { ...data, animals: validData };
};