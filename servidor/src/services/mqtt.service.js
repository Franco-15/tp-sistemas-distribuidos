/**
 * Servicios para el manejo de los mensajes MQTT
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { readJSONFile } from './files.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const animalsFilePath = path.join(__dirname, '../data/animals.json');
const checkpointsFilePath = path.join(__dirname, '../data/checkpoints.json');

//Chequear el formato del mensaje MQTT
export const checkMessageFormat = (data) => {
    try {
        if (data.hasOwnProperty('packageNum') &&
            data.hasOwnProperty('totalPackages') &&
            data.hasOwnProperty('checkpointID') &&
            data.hasOwnProperty('animals')) {
            return true;
        }
    } catch (error) {
        console.error('Error en el formato del mensaje MQTT:', error);
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
    const animalsData = readJSONFile(animalsFilePath);
    const validData = [];
    data.animals.forEach(animal => {
        if (animalsData.some((storedAnimal) => storedAnimal.id === animal.id)) {
            validData.push(animal);
        }
    });
    return { ...data, animals: validData };
};

export const getInitialPositions = () => {
    const checkpointsData = readJSONFile(checkpointsFilePath);
    return checkpointsData.map(checkpoint => ({
        ...checkpoint,
        animals: []
    }));
};

export const addReceivedPacket = (packet, receivedPackets) => {
    // Buscar si existe un checkpoint con el mismo ID
    const existingCheckpointIndex = receivedPackets.findIndex(
        rp => rp.checkpointID === packet.checkpointID
    );
    if (existingCheckpointIndex !== -1) {
        // Si existe, actualizar los animales
        receivedPackets[existingCheckpointIndex].animals =
            [...receivedPackets[existingCheckpointIndex].animals, ...packet.animals];
    } else {
        // Si no existe, agregar nuevo objeto
        receivedPackets.push({
            checkpointID: packet.checkpointID,
            animals: [...packet.animals]
        });
    }
};

export const getCheckpointData = (receivedPackets, checkpointID) => {
    return receivedPackets.find(packet => packet.checkpointID === checkpointID);
};

export const deleteCheckpointData = (receivedPackets, checkpointID) => {
    const index = receivedPackets.findIndex(packet => packet.checkpointID === checkpointID);
    if (index !== -1) {
        receivedPackets.splice(index, 1);
    }
};

export const saveNewPositions = (validData, positions) => {
    try {
        //De las posiciones que no coincidan con el checkpointID, eliminar los animales que coincidan con el id de los animales de validData
        positions.forEach(position => {
            if (position.id !== validData.id) {
                position.animals = position.animals.filter(animal => !validData.animals.some(validAnimal => validAnimal.id === animal.id));
            } else {
                position.animals = validData.animals;
            }
        });
    } catch (error) {
        console.error('Error al actualizar las posiciones:', error);
    }
};

export const updatePositions = (positions) => {
    try {
        const checkpointsData = readJSONFile(checkpointsFilePath);

        //Crear un conjunto de IDs de checkpoints actuales
        const currentCheckpointIds = new Set(checkpointsData.map(cp => cp.id));

        //Eliminar checkpoints que ya no existen
        const updatedPositions = positions.filter(pos => currentCheckpointIds.has(pos.id));
        positions.length = 0;
        positions.push(...updatedPositions);

        //Actualizar o agregar checkpoints
        checkpointsData.forEach(checkpoint => {
            const existingPos = positions.find(pos => pos.id === checkpoint.id);

            if (!existingPos) {
                // Si no existe, agregar nuevo checkpoint
                console.log(`Agregando nuevo checkpoint: ${checkpoint.id}`);
                positions.push({
                    ...checkpoint,
                    animals: []
                });
            } else {
                // Si existe, actualizar propiedades manteniendo los animales
                Object.assign(existingPos, {
                    ...checkpoint,
                    animals: existingPos.animals
                });
            }
        });
    } catch (error) {
        console.error('Error al actualizar las posiciones:', error);
    }
};

export const getPacketToSend = (data) => {
    const checkpointsData = readJSONFile(checkpointsFilePath);
    const animalsData = readJSONFile(animalsFilePath);
    const checkpoint = checkpointsData.find(checkpoint => checkpoint.id === data.checkpointID);
    const animals = data.animals.map(animal => animalsData.find(storedAnimal => storedAnimal.id === animal.id));
    const packet = {
        ...checkpoint,
        animals: animals
    };
    
    return packet;
};