import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE_PATH =  './src/data/animals.json' 

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
        res.writeHead(404,'El animal buscado no existe o no se encuentra registrado en el sistema');
        return res.end()
        
    }else{
        let animalBuscado = JSON.stringify(result[buscado])
        console.log(animalBuscado)
        res.writeHead(200,{'Content-Type': 'application/json'})
        res.write(animalBuscado)
        return res.end()
        
    }
}

export const postAnimal = (parsedBody) => {
    const result = getJson();

    const exists = result.findIndex((animal) => animal.id === parsedBody.id);
    if (exists > -1) {
        return false
        
    }
    result.push(parsedBody);
    writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
    return true
}

export const deleteAnimal = (idAnimal, res) => {
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

export const patchAnimal = (newAnimal) => {
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