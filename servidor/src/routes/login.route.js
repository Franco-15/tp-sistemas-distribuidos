import { validUser } from '../controllers/metodosAdmin.js';

export const loginRoute = (req, res) => {
    validUser(req,res)
}