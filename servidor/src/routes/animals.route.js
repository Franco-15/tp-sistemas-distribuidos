import * as animalsMethods from '../controllers/animals.controller.js'

//Clase en la que se manejan todas las rutas finales asociadas a animales

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
            if(parametros.length == 2){ // GET /api/animals - Obtener todos los animales

                try{
                    animals = animalsMethods.getAnimales()
                    setHeaders(res)
                    res.writeHead(200,{'Content-Type': 'application/json'})
                    res.write(animals)
                    return res.end()
                }catch(e){
                    res.writeHead(500,'No se encontro el animal')  
                    return res.end()
                }
            }else if(parametros.length == 3){ // GET /api/animals/:id - Obtener un animal especifico
                    animalsMethods.getAnimal(parametros[2],res)
            }
        }else if(req.method === 'POST'){ // POST /api/animals - Agregar un animal
            try{
                setHeaders(res)
            
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    if(!parsedBody.id || !parsedBody.name || !parsedBody.description){ //Entra por aca si falta algun dato
                        res.writeHead(400, 'No se pudo agregar al animal debido a la falta de datos')
                        res.end()
                        return;
                    }else{
                        
                        if(animalsMethods.postAnimal(parsedBody)){
                            res.writeHead(200,{'Content-Type': 'application/json'})
                        }else{
                            res.writeHead(400, 'El animal con este ID ya existe');
                        }
                        return res.end()
                    }
                })

            }catch (e){ //Fallo el intento
                res.writeHead(500,'Error del servidor al intentar agregar al animal')
                return res.end()
            }
        }else if(req.method === 'DELETE'){  // DELETE /api/animals/:id - Eliminar un animal especifico
            setHeaders (res) ;
            if(animalsMethods.deleteAnimal(parametros[2])){
                res.writeHead(200,'El animal fue eliminado exitosamente')
            }else{
                res.writeHead(400, 'El animal buscado no existe o no se encuentra registrado en el sistema');
            }
            return res.end()
            
        }else if(req.method === 'PATCH'){ // PATCH /api/animals/:id - Modificar un animal
            try {
                setHeaders(res);
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    if(!parametros[1] || !parsedBody.name || !parsedBody.description){ //Entra por aca si falta algun dato
                        res.writeHead(400, 'Informacion incompleta para modificar el animal')
                        return res.end()
                    }else{
                        const newAnimal = {
                            id: parametros[2],
                            name: parsedBody.name,
                            description: parsedBody.description
                        }
                        if(animalsMethods.patchAnimal(newAnimal)){
                            res.writeHead(200, 'Se modificó correctamente al animal');
                        }else{
                            res.writeHead(404, 'El animal buscado no existe o no se encuentra registrado en el sistema');
                        }
                        return res.end()
                    }
                })
            } catch (e) { //Problema del servidor al intentar realizar modificacion
                res.writeHead(500, 'Error del servidor al intentar modificar un animal') 
                return res.end()
            }
        }else{ //Caso se confundio de calle
            res.writeHead(404, 'Ruta no encontrada');
            return res.end() 
        }

      
};