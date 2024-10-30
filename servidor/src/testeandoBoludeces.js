import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE_PATH = "./servidor/src/data/checkpoints.json";
const fileExist = existsSync(FILE_PATH);
if (fileExist) {
    const file = readFileSync(FILE_PATH, 'utf-8');
    const checkpoints = JSON.parse(file);
    const externalId = "12"; // Id externo que quieres comparar (UUID)
    const exists = checkpoints.some(checkpoint => checkpoint.id === externalId);

    if (exists) {
    console.log("El id coincide con uno de los checkpoints");
    } else {
    console.log("No hay coincidencias");
    }
}else{
    console.log("no entro xd")
}

