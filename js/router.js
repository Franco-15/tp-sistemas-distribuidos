import { renderAnimalsArray } from './animals.js';

function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash || '#/animales';

    switch (hash) {
        case '#/animales':
            renderAnimalsArray(); // invoca la funcion que muestra el array con los animales
            break;
        case '#/puntos-de-control':
            loadControlPointsView();
            break;
        default:
            app.innerHTML = `<h2>Vista no encontrada</h2>`;
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
