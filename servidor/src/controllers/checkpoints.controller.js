import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE_PATH = "./src/data/checkpoints.json"

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

export const getPuntosControl = () => {
    const result = getJson()
    const response = {
        data: result
    }
    return JSON.stringify(response)
}

export const getPuntoControl = (idPtoControl, res) => {
    const result = getJson()
    const buscado = result.findIndex((item) => {
        return item.id === idPtoControl
    })
    if (buscado < 0) {
        res.writeHead(404, { 'message': 'El checkpoint buscado no existe o no se encuentra registrado en el sistema' });
        return res.end()

    } else {
        const checkpoint = JSON.stringify(result[buscado])
        res.writeHead(200, { 'Content-Type': 'application/json', 'message': 'Se encontro el checkpoint' })
        res.write(checkpoint)
        return res.end()

    }
}

export const postPuntoControl = (parsedBody) => {
    const result = getJson();

    const exists = result.findIndex((ptoControl) => ptoControl.id === parsedBody.id);
    if (exists > -1) {
        return false

    }
    result.push(parsedBody);
    writeFileSync(FILE_PATH, JSON.stringify(result), 'utf-8')
    return true
}

export const deletePuntosControl = () => {
    const result = getJson()

    writeFileSync(FILE_PATH, JSON.stringify({}), 'utf-8')
}

export const deletePuntoControl = (idPtoControl, res) => {
    const result = getJson()
    const buscado = result.findIndex((item) => item.id === idPtoControl);
    res.writeHead(200, { 'message': 'oaaa' });
    if (buscado < 0) {
        return false

    } else {
        result.splice(buscado, 1);
        writeFileSync(FILE_PATH, JSON.stringify(result), 'utf-8')
        return true
    }

}

export const patchPuntosControl = (newCheckpoint, res) => {
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