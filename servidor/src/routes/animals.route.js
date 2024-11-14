import express from 'express';
import * as animalsMethods from '../controllers/animals.controller.js';

//Clase en la que se manejan todas las rutas finales asociadas a animales

const router = express.Router();

let animals
let id

// GET /api/animals - Obtener todos los animales
router.get('/', (req, res) => {
    try {
        animals = animalsMethods.getAnimales();
        res.writeHead(200,{'Content-Type': 'application/json'})
        res.write(animals)
        return res.end()
    } catch (error) {
        res.writeHead(500, 'Error del servidor al intentar recuperar informacion sobre animales')  
        return res.end()
    }
});

// GET /api/animals/:id - Obtener un animal especifico
router.get('/:id', (req, res) => {
    id = req.url.split("/")
    animalsMethods.getAnimal(id[1],res);
});

// POST /api/animals - Agregar un animal
router.post('/', (req, res) => {
    const { id, name, description } = req.body;

    if (!id || !name || !description) {
        res.writeHead(400, 'No se pudo agregar al animal debido a la falta de datos' );
        return res.end()
    }

    try {
        if(animalsMethods.postAnimal(req.body)){
            res.writeHead(200,'El animal fue agregado exitosamente')
        }else{
            res.writeHead(400, 'El animal con este ID ya existe');
        }
        return res.end()
        
    } catch (error) {
        res.writeHead(500, 'Error del servidor al intentar agregar al animal')
        return res.end()
    }
});

// DELETE /api/animals - Eliminar todos los animales
router.delete('/', (req, res) => {
    try {
        animalsMethods.deleteAnimales();
        res.writeHead(200, 'Todos los animales han sido eliminados')
        return res.end()
    } catch (error) {
        res.writeHead(500, 'Error del servidor al intentar eliminar los animales')
        return res.end()
    }
});

// DELETE /api/animals/:id - Eliminar un animal especifico
router.delete('/:id', (req, res) => {
    try {
        id = req.url.split("/")
        if(animalsMethods.deleteAnimal(id[1])){
            res.writeHead(200, 'El animal fue eliminado exitosamente')
        }else{
            res.writeHead(404, 'El animal buscado no existe o no se encuentra registrado en el sistema');
        }
        return res.end()
    } catch (error) {
        res.writeHead(500,'Error del servidor al intentar eliminar al animal')
        return res.end()
    }
});

// PATCH /api/animals/:id - Modificar un animal
router.patch('/:id', (req, res) => {
    id = req.url.split("/")
    const { name, description } = req.body;

    if (!name || !description) {
        res.writeHead(400, 'Información incompleta para modificar el animal');
        return res.end()
    }

    try {
        const newAnimal = {
            id: id[1],
            name: name,
            description: description
        }
        if(animalsMethods.patchAnimal(newAnimal)){
            res.writeHead(200, 'Se modificó correctamente al animal');
        }else{
            res.writeHead(404, 'El animal buscado no existe o no se encuentra registrado en el sistema');
        }
        return res.end()
    } catch (error) {
        res.writeHead(500, 'Error del servidor al intentar modificar al animal')
        return res.end()
    }
});

export default router;
