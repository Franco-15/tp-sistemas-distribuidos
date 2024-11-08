import express from 'express';
import * as animalsMethods from '../controllers/animals.controller.js';

const router = express.Router();

let animals;

// GET /api/animals - Obtener todos los animales
router.get('/', async (req, res) => {
    try {
        animals = await animalsMethods.getAnimales();
        res.status(200).json({
            message: 'Se encontró el listado de animales',
            data: animals
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el listado de animales' });
    }
});

// GET /api/animals/position - Obtener posiciones de todos los animales
router.get('/position', async (req, res) => {
    try {
        const { checkpointId, animals: recAnimals } = req.body;
        const checkpoints = await metodosPuntosControl.getJson();
        const checkpoint = checkpoints.find(c => c.id === checkpointId);

        if (!checkpoint) {
            return res.status(500).json({ message: 'ID desconocido' });
        }

        animals = await animalsMethods.getJson();
        const filteredAnimals = animals.filter(animal => recAnimals.some(recAnimal => animal.id === recAnimal.id));
        const result = {
            id: checkpoint.id,
            lat: checkpoint.lat,
            long: checkpoint.long,
            description: checkpoint.description,
            animals: filteredAnimals
        };

        res.status(200).json({
            message: 'Animales localizados',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor al intentar posicionar los animales' });
    }
});

// GET /api/animals/:id - Obtener un animal específico
router.get('/:id', async (req, res) => {
    try {
        const animal = await animalsMethods.getAnimal(req.params.id);
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el animal' });
    }
});

// POST /api/animals - Agregar un animal
router.post('/', async (req, res) => {
    const { id, name, description } = req.body;

    if (!id || !name || !description) {
        return res.status(400).json({ message: 'No se pudo agregar al animal debido a la falta de datos' });
    }

    try {
        await animalsMethods.postAnimal(req.body);
        res.status(200).json({ message: 'El animal fue agregado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor al intentar agregar al animal' });
    }
});

// DELETE /api/animals - Eliminar todos los animales
router.delete('/', async (req, res) => {
    try {
        await animalsMethods.deleteAnimales();
        res.status(200).json({ message: 'Todos los animales han sido eliminados' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar los animales' });
    }
});

// DELETE /api/animals/:id - Eliminar un animal específico
router.delete('/:id', async (req, res) => {
    try {
        await animalsMethods.deleteAnimal(req.params.id);
        res.status(200).json({ message: 'Animal dado de baja del sistema' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el animal' });
    }
});

// PATCH /api/animals/:id - Modificar un animal
router.patch('/:id', async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;

    if (!name || !description) {
        return res.status(400).json({ message: 'Información incompleta para modificar el animal' });
    }

    try {
        const newAnimal = { id, name, description };
        await animalsMethods.patchAnimal(newAnimal);
        res.status(200).json({ message: 'Se modificó correctamente al animal' });
    } catch (error) {
        res.status(500).json({ message: 'Error al intentar modificar el animal' });
    }
});

export default router;
