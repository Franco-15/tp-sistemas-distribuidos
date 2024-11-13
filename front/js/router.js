// router.js

import { loadLoginView } from './pages/LoginPage.js';
import { loadAnimalPage } from './pages/AnimalsPage.js';
import { loadCheckpointPage } from './pages/CheckpointPage.js';
import { loadLocacionPage } from './pages/LocacionPage.js';
import { startEventSource } from './api/apiLocationHelper.js';

function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash;
    
    startEventSource();

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
            loadAnimalPage(); 
            break;
        case '#/puntos-de-control': 
            console.log("ptos de control") //!borrar 
            loadCheckpointPage();
            break;
        case '#/locacion': 
            console.log('locacion');
            loadLocacionPage();
            break;
        default:
            app.innerHTML = `<h2>Proximamente...</h2>`;
    }
}

window.addEventListener('hashchange', router); // Escucha los cambios en el hash
window.addEventListener('load', router);       // Ejecuta el router al cargar la página

