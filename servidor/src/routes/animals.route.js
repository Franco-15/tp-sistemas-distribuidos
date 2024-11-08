import * as animalsMethods from '../controllers/animals.controller.js'

let animals
let parametros

export const animalsRoute = (req, res) => {
    parametros = req.url.split("/")
        parametros = parametros.filter(el => el != '')   //filtro los vacios
        if(req.method === 'GET'){
            console.log(parametros.length)
            if(parametros.length == 2){ //Entra en este if para para obtener todos los animales

                try{
                    animals = animalsMethods.getAnimales()
                    //setHeaders(res)
                    res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Se encontro el listado de animales'})
                    res.write(animals)
                    return res.end()
                }catch(e){
                    res.writeHead(500,{'message':'Falcaont'})  
                    return res.end()
                }
            }else if(parametros.length == 3){
                if(parametros[2] == "position"){ //Entra en este if para para rescatar posiciones de todos los animales
                    //Esto tal vez debamos borrarlo
                    try {
                        //setHeaders(res); 
                        let body = '';
                        req.on('data', (chunk) => {
                            body = body + chunk;
                        });
                        req.on('end', () => {
                            const parsedBody = JSON.parse(body);
                            checkpoints = metodosPuntosControl.getJson()
                            const externalId = parsedBody.checkpointId
                            const exists = checkpoints.findIndex(checkpoint => checkpoint.id === externalId);
                            if (exists>-1) {
                                const dataCheckpoint = checkpoints[exists]
                                const recAnimals = parsedBody.animals
                                animals = animalsMethods.getJson()
                                const filteredAnimals = animals.filter(animal => recAnimals.some(recAnimal => animal.id === recAnimal.id));
                                const result = {
                                    id: dataCheckpoint.id,
                                    lat: dataCheckpoint.lat,
                                    long: dataCheckpoint.long,
                                    description: dataCheckpoint.description,
                                    animals: filteredAnimals    
                                }

                                res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Animales localizados'})
                                res.write(JSON.stringify(result))
                            } 
                            else { //ID no identificado en el archivo checkpoints.json
                                res.writeHead(500,{'message':'ID desconocido'})
                            }
                            return res.end()
                        })
                    } catch (e) {
                    res.writeHead(500,{'message':'Error del servidor al intentar posicionar los animales'}) 
                    return res.end()
                }
                   
                }else{ //Obtiene un animal especifico
                    animalsMethods.getAnimal(parametros[2],res)
                }
            }
        }else if(req.method === 'POST'){ //Agrega un animal
            try{
                //setHeaders(res)
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    if(!parsedBody.id || !parsedBody.name || !parsedBody.description){ //Entra por aca si falta algun dato
                        res.writeHead(400, {'message':'No se pudo agregar al animal debido a la falta de datos'})
                        res.end()
                        return;
                    }else{
                        console.log(parsedBody.id)
                        
                        animalsMethods.postAnimal(parsedBody,res)
                        res.writeHead(200,{'Content-Type': 'application/json', 'message': 'El animal fue agregado exitosamente'})
                        res.end()
                    }
                })

            }catch (e){ //Fallo el intento
                console.log('Error', e)
                res.writeHead(500, {'message':'Error del servidor al intentar agregar al animal'})
                return res.end()
            }
        }else if(req.method === 'DELETE'){ //Elimina uno o multiples animales
            //
            //setHeaders (res) ;
            if(parametros.length == 2){ //Eliminamos todos los animales
                
                animalsMethods.deleteAnimales(req,res)
            }else if(parametros.length == 3){ //Eliminamos un animal
                animalsMethods.deleteAnimal(parametros[2],res)
            }
            res.writeHead(200,{'message':'Animal dado de baja del sistema'})
            return res.end()
        }else if(req.method === 'PATCH'){ //Se modifica la data de algun animal
            try {
                //setHeaders(res);
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    if(!parametros[1] || !parsedBody.name || !parsedBody.description){ //Entra por aca si falta algun dato
                        res.writeHead(400, {'message':'Informacion incompleta para modificar el animal'})
                        return res.end()
                    }else{
                        const newAnimal = {
                            id: parametros[2],
                            name: parsedBody.name,
                            description: parsedBody.description
                        }
                        animalsMethods.patchAnimal(newAnimal,res)
                        res.writeHead(200,{'message':'Se modifico correctamente al animal'})
                        return res.end()
                    }
                })
            } catch (e) { //Problema del servidor al intentar realizar modificacion
                console.log('Error', e)
                res.writeHead(500, {'message':'Error del servidor al intentar modificar un animal'}) 
                return res.end()
            }
        }else{ //Caso se confundio de calle
            res.writeHead(404,  {'message':'Ruta no encontrada'});
            return res.end() 
        }
};