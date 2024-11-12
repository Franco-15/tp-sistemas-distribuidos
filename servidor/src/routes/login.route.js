import { validUser } from '../controllers/admins.controller.js';


const setHeaders= (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todas las fuentes
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS"); // Metodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With"); // Encabezados permitidos 
}

export const loginRoute = (req, res) => {
    setHeaders(res);
    validUser(req,res);
}