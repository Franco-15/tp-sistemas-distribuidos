import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE_PATH =  './src/data/animals.json' 

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

export const getAnimales = () => {
        const result = getJson()
        const response = {
            data: result
        }
        return JSON.stringify(response)

}

export const getAnimal = (idAnimal,res) => { 
    const result = getJson()
    const buscado = result.findIndex((item) => {
        return item.id === idAnimal
    })
    if (buscado < 0){
        res.writeHead(404, {'message':'El animal buscado no existe o no se encuentra registrado en el sistema'});
        return res.end()
        
    }else{
        let animalBuscado = JSON.stringify(result[buscado])
        console.log(animalBuscado)
        res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Animal localizado'})
        res.write(animalBuscado)
        return res.end()
        
    }
}

export const postAnimal = (parsedBody,res) => {
    const result = getJson();

    const exists = result.findIndex((animal) => animal.id === parsedBody.id);
    if (exists > -1) {
        res.writeHead(400, {'message':'El animal con este ID ya existe'});
        return res.end();
        
    }
    result.push(parsedBody);
    writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
}

export const deleteAnimales = (req,res) => {
    const result = getJson()
    writeFileSync(FILE_PATH,JSON.stringify([]),'utf-8')
}

export const deleteAnimal = (idAnimal, res) => {
    const result = getJson()
    const buscado = result.findIndex((item) => item.id === idAnimal);

    if (buscado < 0) {
        res.writeHead(404, {'message':'El checkpoint buscado no existe o no se encuentra registrado en el sistema'});
        return res.end()
    }else{      
        result.splice(buscado, 1); 
        writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
    }
    
}

export const patchAnimal = (newAnimal,res) => {
    const result = getJson();
    const buscado = result.findIndex((item) => {
        return item.id === newAnimal.id
    })
    if(buscado < 0){
        res.writeHead(404, {'message':'El checkpoint buscado no existe o no se encuentra registrado en el sistema'});
        return res.end()
        
    }else{
        const oldAnimal = result[buscado];
        result[buscado] = {
            id: newAnimal.id,
            name: newAnimal.name || oldAnimal.name,
            description: newAnimal.description || oldAnimal.description
        }
        writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
    }
}