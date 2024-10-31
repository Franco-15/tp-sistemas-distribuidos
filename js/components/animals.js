import { getAnimals } from "../api.js";

// Editar animal
function patch(id) {
    alert(`Editar animal con ID: ${id}`);
    // Aquí podrías cargar la información del animal y mostrar el formulario para editarlo
}

// eliminar un animal 
//? no deberia ser delete solo? pero es palabra reservada

function deleteA(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este animal?')) {
        alert(`Animal con ID ${id} eliminado`);
        // Aquí llamaría al backend para eliminarlo y luego actualiza la lista
        renderAnimalList();
    }
}

export function renderAnimalsArray() { //todo vendria siendo el get, cambiarlo
    // Llama a la función getAnimals (es la q esta en api.js) y espera su resultado
    getAnimals().then(animalArray => { //devuelve promesa
        
        console.log("Array de animales:", animalArray); // Muestra el array en la consola

        // HTML
        const app = document.getElementById('app');
        app.innerHTML = `
            <h2>Lista de Animales</h2>
            <ul>
                ${animalArray.map(animal => `
                    <li>ID: ${animal.id}, Nombre: ${animal.nombre}, Description: ${animal.description}</li>
                `).join('')}
                //todo: agregarle mas mistica para que quede mas fachero
            </ul>
        `;
    });
}



//! no va esto aca
function post(id, name, description) {
    
    //deberia ahcer un get desde al back
    renderAnimalList();
    
}