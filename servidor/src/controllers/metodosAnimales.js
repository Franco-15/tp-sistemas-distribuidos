import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE_PATH =  './servidor/src/data/animales.json'

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

export const getAnimales = (req, res) => {
    try{
        const result = getJson()
        res.setHeader('Content-Type', 'application/json')
        const response = {
            data: result
        }
        res.end(JSON.stringify(response))
    }catch (e) {
        console.log(e)
        res.writeHead(500)
        res.end('Error')
    }
}

export const getAnimal = (idAnimal,res) => {  //Entiendo que aca el req tendria la info sobre que animal se esta buscando
    const result = getJson()
    const buscado = result.findIndex((item) => {
        return item.id === idAnimal
    })
    if (buscado < 0){
        res.writeHead(404, 'El animal buscado no existe o no se encuentra registrado en el sistema');
        res.end()
        return
    }else{
        /*En este caso no se si deberiamos devolver algo a el front u otro lado, puse el res.end con
            la info para comprobar que este todo en orden*/
        //res.end(JSON.stringify(result[buscado]))
        return result[buscado]
    }
}

export const postAnimal = (parsedBody,res) => {
    const result = getJson();

    const exists = result.findIndex((animal) => animal.id === parsedBody.id);
    if (exists > -1) {
        res.writeHead(400, 'El animal con este ID ya existe');
        res.end();
        return;
    }
    result.push(parsedBody);
    writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
    res.end();
}

export const deleteAnimales = (req,res) => {
    const result = getJson()
    writeFileSync(FILE_PATH,JSON.stringify({}),'utf-8')
    res.end();
}

export const deleteAnimal = (idAnimal, res) => {
    const result = getJson()
    const buscado = result.findIndex((item) => item.id === idAnimal);

    if (buscado < 0) {
        res.writeHead(404, 'Animal no encontrado');
        res.end();
        return;
    }else{      
        result.splice(buscado, 1); 
        writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
        res.end();
    }
    
}