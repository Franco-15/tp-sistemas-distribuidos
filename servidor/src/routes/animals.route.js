import * as animalsMethods from '../controllers/animals.controller.js'

let animals
let parametros



const setHeaders= (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todas las fuentes
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS"); // Metodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With"); // Encabezados permitidos 
}

export const animalsRoute = (req, res) => {
    parametros = req.url.split("/")
        parametros = parametros.filter(el => el != '')   //filtro los vacios
        if(req.method === 'GET'){
            console.log(parametros.length)
            if(parametros.length == 2){ //Entra en este if para para obtener todos los animales

                try{
                    animals = animalsMethods.getAnimales()
                    setHeaders(res)
                    res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Se encontro el listado de animales'})
                    res.write(animals)
                    return res.end()
                }catch(e){
                    res.writeHead(500,{'message':'No se encontro e'})  
                    return res.end()
                }
            }else if(parametros.length == 3){
                    animalsMethods.getAnimal(parametros[2],res)
            }
        }else if(req.method === 'POST'){ //Agrega un animal
            try{
                setHeaders(res)
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
                        
                        if(animalsMethods.postAnimal(parsedBody)){
                            res.writeHead(200,{'Content-Type': 'application/json', 'message': 'El animal fue agregado exitosamente'})
                        }else{
                            res.writeHead(400, {'message':'El animal con este ID ya existe'});
                        }
                        return res.end()
                    }
                })

            }catch (e){ //Fallo el intento
                console.log('Error', e)
                res.writeHead(500, {'message':'Error del servidor al intentar agregar al animal'})
                return res.end()
            }
        }else if(req.method === 'DELETE'){ //Elimina uno o multiples animales
            
            setHeaders (res) ;
            if(parametros.length == 2){ //Eliminamos todos los animales
                
                animalsMethods.deleteAnimales(req,res)
                res.writeHead(200, {'message':'Todos los animales han sido eliminados'})
                return res.end()
            }else if(parametros.length == 3){ //Eliminamos un animal
                if(animalsMethods.deleteAnimal(parametros[2])){
                    res.writeHead(200,{'message': 'El animal fue eliminado exitosamente'})
                }else{
                    res.writeHead(400, {'message':'El animal buscado no existe o no se encuentra registrado en el sistema'});
                }
                return res.end()
            }
            return res.end()
        }else if(req.method === 'PATCH'){ //Se modifica la data de algun animal
            try {
                setHeaders(res);
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
                        if(animalsMethods.patchAnimal(newAnimal)){
                            res.writeHead(200, {'message':'Se modificó correctamente al animal'});
                        }else{
                            res.writeHead(404, {'message':'El animal buscado no existe o no se encuentra registrado en el sistema'});
                        }
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