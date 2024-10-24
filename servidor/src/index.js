import http from 'http';
import { v4 as uuidv4 } from 'uuid';

const HTTP_PORT = 3000;  //Esto es placebo supongo (no se xd)
const textHolderAnimal = "Reemplazar todos los lugares donde este esto"
const textHolderPtoDeCtrl = "Reemplazar todos los lugares donde este esto"

/* Dudas/pensamientos/cosas para hacer:
    - Habria que crear metodos para gestionar el tema de los GET y DELETE(Revisar codigos viejos de Martin)
        Esto se podría hacer en la misma clase o en otras clases (Siento que esto ultimo es más la vibe de martin)
    - Viendo un tp viejo(Angus) usan mucho setHeader al principio de los createServer, investigar porque xd
    - Investigar el como diferenciar el GET y DELETE de un solo ID con el de todos los IDs.
*/

const server = http.createServer((req, res) => {
    if(req.url === textHolderAnimal){
        if(req.method === 'GET'){

        }else if(req.method === 'POST'){ /*Tomar en consideración que estos datos se supone que se filtran del listado de animales conectados al punto de control.
                                            Por el momento, asumo que las actualizaciones del PdC entraran por aca*/
            try{
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    //Habria que aplicar un chequeo de datos(no lo hice porque ni idea que nombres tendran las variables)
                })
            }catch (e){
                console.log('Error', e)
                res.writeHead(500, "Error")
                res.end()
            }
        }else if(req.method === 'DELETE'){
            
        }else{ //Caso se confundio de calle
            res.writeHead(404, 'Ruta no encontrada');
            res.end() 
        }
    } else if (req.url === textHolderPtoDeCtrl){
        if(req.method === 'GET'){

        }else if(req.method === 'POST'){
            try{
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    //Habria que aplicar un chequeo de datos(no lo hice porque ni idea que nombres tendran las variables)
                })
            }catch (e){
                console.log('Error', e)
                res.writeHead(500, "Error")
                res.end()
            }
        }else if(req.method === 'DELETE'){
            
        }else{ //Caso se confundio de calle
            res.writeHead(404, 'Ruta no encontrada');
            res.end() 
        }
    }else{ //Caso se confundio de calle
        res.writeHead(404, 'Ruta no encontrada');
        res.end() 
    }
})