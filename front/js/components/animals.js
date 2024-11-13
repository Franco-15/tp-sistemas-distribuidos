import { getAnimals } from "../api.js";
//!se va esto, paso a animalsPage.js

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





//! no va esto aca
function post(id, name, description) {
    
    //deberia ahcer un get desde al back
    renderAnimalList();
    
}