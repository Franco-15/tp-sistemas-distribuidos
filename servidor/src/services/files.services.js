/**
 * Este módulo proporciona funciones para leer y escribir archivos JSON.
 * 
 * Funcionalidad principal:
 * - Leer un archivo JSON y devolver su contenido como un objeto.
 * - Escribir un objeto en un archivo JSON.
 * - Manejar errores en caso de que ocurra un error al leer o escribir un archivo.
 */

import fs from 'fs';

// Read a JSON file
export const readJSONFile = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`Error reading JSON file: ${error.message}`);
    }
};

// Write to a JSON file
export const writeJSONFile = (filePath, content) => {
    try {
        const dataToWrite = JSON.stringify(content, null, 2);
        fs.writeFileSync(filePath, dataToWrite);
    } catch (error) {
        throw new Error(`Error writing JSON file: ${error.message}`);
    }
};
