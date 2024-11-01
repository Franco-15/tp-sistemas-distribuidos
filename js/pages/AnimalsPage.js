//todo: ver si no pasa a ser 'HomePage.js'

import { getAnimals } from "../api.js";


export function loadAnimalPage() {
    console.log('entra') //!sacar
    
    renderAnimalsArray().then(animalArray => {
        const app = document.getElementById('app');

        app.innerHTML = `
            <h2>Lista de Animales</h2>
            <ul>
                ${animalArray.map(animal => `
                    <li>ID: ${animal.id}, Nombre: ${animal.nombre}, Descripción: ${animal.description}</li>
                `).join('')}
            </ul>
            <button id="addAnimalButton">Agregar Animal</button>
            
            <div id="popupForm" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background-color: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
                <h3>Agregar Nuevo Animal</h3>
                <form id="animalForm">
                    <label for="animalName">Nombre:</label>
                    <input type="text" id="animalName" name="nombre" required><br><br>
                    <label for="animalDescription">Descripción:</label>
                    <input type="text" id="animalDescription" name="description" required><br><br>
                    <button type="submit">Guardar</button>
                    <button type="button" id="closeButton">Cerrar</button>
                </form>
            </div>

            <>
            <div id="popupOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background-color: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
        `;
        
        // eventos
        const addAnimalButton = document.getElementById('addAnimalButton');
        const popupForm = document.getElementById('popupForm');
        const popupOverlay = document.getElementById('popupOverlay');
        const closeButton = document.getElementById('closeButton');
    
        // popup
        addAnimalButton.addEventListener('click', () => {
            popupForm.style.display = 'block';
            popupOverlay.style.display = 'block';
        });
    
        // cierra pop-up cuando se hace click en el boton de cerrar o en el fondo
        closeButton.addEventListener('click', () => {
            popupForm.style.display = 'none';
            popupOverlay.style.display = 'none';
        });
    
        popupOverlay.addEventListener('click', () => {
            popupForm.style.display = 'none';
            popupOverlay.style.display = 'none';
        });
    });
}

export function renderAnimalsArray() { //todo vendria siendo el get, cambiarlo
    // Llama a la función getAnimals (es la q esta en api.js) y espera su resultado
    return getAnimals().then(animalArray => { //devuelve promesa
        
        console.log("Array de animales:", animalArray); // Muestra el array en la consola
        return animalArray
    });
}