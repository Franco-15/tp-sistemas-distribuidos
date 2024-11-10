import express from 'express';
import { refreshUser } from '../controllers/admins.controller.js';

const router = express.Router();

// Ruta para llevar a cabo el refresh del token
router.post('/', (req, res) => { 
    refreshUser(req, res);
});

export default router;