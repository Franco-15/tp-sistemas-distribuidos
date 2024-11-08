import * as metodosAnimales from '../controllers/metodosAnimales.js'

let animals
let parametros

export const animalsRoute = (req, res) => {
    parametros = req.url.split("/")
        parametros = parametros.filter(el => el != '')   //filtro los vacios
        if(req.method === 'GET'){
            console.log(parametros.length)
            if(parametros.length == 2){
                //Entra en este if para para obtener todas las vacas
                try{
                    animals = metodosAnimales.getAnimales()
                    //setHeaders(res)
                    res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Se encontro el listado de animales'})
                    res.write(animals)
                    return res.end()
                }catch(e){
                    res.writeHead(500,{'message':'Falcaont'})  
                    return res.end()
                }
            }else if(parametros.length == 3){
                if(parametros[2] == "position"){
                    try {
                        //Entra en este if para para rescatar posiciones de todos los animales
                        //setHeaders(res); 
                        let body = '';
                        req.on('data', (chunk) => {
                            body = body + chunk;
                        });
                        req.on('end', () => {
                            const parsedBody = JSON.parse(body);
                            //Habria que verificar que el UUID del arduino concuerde con alguno del checkpoints.json
                            checkpoints = metodosPuntosControl.getJson()
                            const externalId = parsedBody.checkpointId
                            const exists = checkpoints.findIndex(checkpoint => checkpoint.id === externalId);
                            if (exists>-1) {
                                const dataCheckpoint = checkpoints[exists]
                                //directamente dejo los animales que tengo registrados
                                const recAnimals = parsedBody.animals
                                animals = metodosAnimales.getJson()
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
                            else {
                                res.writeHead(500,{'message':'ID desconocido'})
                            }
                            return res.end()
                        })
                    } catch (e) {
                    res.writeHead(500,{'message':'Error inesperado'})  //! CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
                    return res.end()
                }
                   
                }else{
                    //Entra en este if para para obtener un animal especifico
                    metodosAnimales.getAnimal(parametros[2],res)
                }
            }
        }else if(req.method === 'POST'){ 
            //Entra en este if para agregar un animal
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
                        
                        metodosAnimales.postAnimal(parsedBody,res)
                        res.writeHead(200,{'Content-Type': 'application/json', 'message': 'El animal fue agregado exitosamente'})
                        res.end()
                    }
                })

            }catch (e){
                console.log('Error', e)
                res.writeHead(500, {'message':'Error inesperado'}) //? CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
                return res.end()
            }
        }else if(req.method === 'DELETE'){
            //
            //setHeaders (res) ;
            if(parametros.length == 2){
                
                //Metodo para eliminar (matar) todos los animales
                metodosAnimales.deleteAnimales(req,res)
            }else if(parametros.length == 3){
                //Metodo para eliminar (matar) un animal especifico
                metodosAnimales.deleteAnimal(parametros[2],res)
            }
            res.writeHead(200,{'message':'Eliminacion Realizada'})
            return res.end()
        }else if(req.method === 'PATCH'){
            try {
                //setHeaders(res);
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    if(!parametros[1] || !parsedBody.name || !parsedBody.description){ //Entra por aca si falta algun dato
                        res.writeHead(400, {'message':'No se pudo modificar al animal debido a la falta de datos'})
                        return res.end()
                    }else{
                        const newAnimal = {
                            id: parametros[2],
                            name: parsedBody.name,
                            description: parsedBody.description
                        }
                        metodosAnimales.patchAnimal(newAnimal,res)
                        res.writeHead(200,{'message':'Se modifico correctamente al animal'})
                        return res.end()
                    }
                })
            } catch (e) {
                console.log('Error', e)
                res.writeHead(500, {'message':'Error inesperado'}) //? CHUSMEAR PORQUE SE LLEGARIA A ESTA LINEA DE CODIGO
                return res.end()
            }
        }else{ //Caso se confundio de calle
            res.writeHead(404,  {'message':'Ruta no encontrada'});
            return res.end() 
        }
};