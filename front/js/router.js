// router.js

import { loadLoginView } from './pages/LoginPage.js';
import { loadAnimalPage } from './pages/AnimalsPage.js';
import { loadCheckpointPage } from './pages/CheckpointPage.js';
import { loadLocacionPage } from './pages/LocacionPage.js';
import { loadMapPage } from './pages/mapPage.js';


function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash;

    // Si no hay hash, redirige directamente a login
    if (!hash || hash === '#/') {
        window.location.hash = '#/login'; // Cambia el hash a /login
        return loadLoginView();           // Carga la vista de login
    }

    // Controla las vistas según el hash actual
    switch (hash) {
        case '#/login':
            document.getElementById("nav_bar").style.display = "none";
            loadLoginView();
            break;
        case '#/animals':
            document.getElementById("nav_bar").style.display = "block";
            loadAnimalPage(); 
            break;
        case '#/puntos-de-control': 
            loadCheckpointPage(); 
            break;
        case '#/locacion':
            loadLocacionPage();
            break;
        case '#/map': 
            loadMapPage();
            break;
        default:
            app.innerHTML = `<h2>Proximamente...</h2>`;
    }
}

window.addEventListener('hashchange', router); // Escucha los cambios en el hash
window.addEventListener('load', router);       // Ejecuta el router al cargar la página

