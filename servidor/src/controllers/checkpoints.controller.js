import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE_PATH = "./src/data/checkpoints.json"

//En esta clase se abarcan todos los metodos en respuesta a las solicitudes que pueden llegar del cliente en relación a los puntos de control

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

export const getPuntosControl = () => { //Metodo que recupera todos los checkpoints
    const result = getJson()
    const response = {
        data: result
    }
    return JSON.stringify(response)
}

export const getPuntoControl = (idPtoControl, res) => { //Metodo que recupera un checkpoint
    const result = getJson()
    const buscado = result.findIndex((item) => {
        return item.id === idPtoControl
    })
    if (buscado < 0) {
        res.writeHead(404, 'El checkpoint buscado no existe o no se encuentra registrado en el sistema');
        return res.end()

    } else {
        const checkpoint = JSON.stringify(result[buscado])
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.write(checkpoint)
        return res.end()

    }
}

export const postPuntoControl = (parsedBody) => { //Metodo que agrega un checkpoint
    const result = getJson();

    const exists = result.findIndex((ptoControl) => ptoControl.id === parsedBody.id);
    if (exists > -1) {
        return false

    }
    result.push(parsedBody);
    writeFileSync(FILE_PATH, JSON.stringify(result), 'utf-8')
    return true
}


export const deletePuntoControl = (idPtoControl, res) => { //Metodo que elimina un checkpoint
    const result = getJson()
    const buscado = result.findIndex((item) => item.id === idPtoControl);
    if (buscado < 0) {
        return false

    } else {
        result.splice(buscado, 1);
        writeFileSync(FILE_PATH, JSON.stringify(result), 'utf-8')
        return true
    }

}

export const patchPuntosControl = (newCheckpoint, res) => { //Metodo que modifica un checkpoint
    const result = getJson();
    const buscado = result.findIndex((item) => {
        return item.id === newCheckpoint.id
    })
    if (buscado < 0) {
        return false

    } else {
        const oldCheckpoint = result[buscado];
        result[buscado] = {
            id: newCheckpoint.id,
            lat: newCheckpoint.lat || oldCheckpoint.lat,
            long: newCheckpoint.long || oldCheckpoint.long,
            description: newCheckpoint.description || oldCheckpoint.description
        }
        writeFileSync(FILE_PATH, JSON.stringify(result), 'utf-8')
        return true
    }
}