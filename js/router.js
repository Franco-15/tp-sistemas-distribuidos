// router.js

import { loadLoginView } from './pages/LoginPage.js';
import { renderAnimalsArray } from './components/animals.js';
import { renderPtosCtrolArray } from './components/checkpoints.js';

function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash;

    // Si no hay hash, redirige directamente a login
    if (!hash || hash === '#/') {
        console.log("funca"); //!borrar
        window.location.hash = '#/login'; // Cambia el hash a /login
        return loadLoginView();           // Carga la vista de login
    }

    // Controla las vistas según el hash actual
    switch (hash) {
        case '#/login':
            loadLoginView();
            break;
        case '#/animals':
            console.log("animales") //!borrar
            renderAnimalsArray();
            break;
        case '#/puntos-de-control': 
            console.log("ptos de control") //!borrar 
            renderPtosCtrolArray(); 
            break;
        default:
            app.innerHTML = `<h2>Vista no encontrada</h2>`;
    }
}

window.addEventListener('hashchange', router); // Escucha los cambios en el hash
window.addEventListener('load', router);       // Ejecuta el router al cargar la página

