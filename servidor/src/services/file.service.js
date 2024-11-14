/**
 * Este módulo proporciona funciones para leer y escribir archivos JSON.
 */

import fs from 'fs';

//Funcion para leer un archivo JSON
export const readJSONFile = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`Error reading JSON file: ${error.message}`);
    }
};

//Funcion para leer un archivo JSON
export const writeJSONFile = (filePath, content) => {
    try {
        const dataToWrite = JSON.stringify(content, null, 2);
        fs.writeFileSync(filePath, dataToWrite);
    } catch (error) {
        throw new Error(`Error writing JSON file: ${error.message}`);
    }
};