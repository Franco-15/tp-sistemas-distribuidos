import express from 'express';
import { validUser } from '../controllers/admins.controller.js';

const router = express.Router();

// Ruta para el login
router.post('/', (req, res) => { 
    validUser(req, res);
});

export default router;


