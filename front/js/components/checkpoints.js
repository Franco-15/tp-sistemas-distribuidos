//import { getPtosControl } from "../api/apiCheckpoint.js";

// Editar animal
function patch(lat, long, description) {
    alert(`Editar checkpoint con ID: ${id}`);
    // Aquí podrías cargar la información del animal y mostrar el formulario para editarlo
}

// eliminar un animal 
//? no deberia ser delete solo? pero es palabra reservada

function deleteC(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este checkpoint?')) {
        alert(`chekpoint con ID ${id} eliminado`);
        // Aquí llamaria al backend para eliminarlo y actualiza la lista
        renderAnimalList(); //todo: ver bien que es esto
    }
}

/*
export function renderPtosCtrolArray() { //todo vendria siendo el get, cambiarlo
    // Llama a la función getAnimals (es la q esta en api.js) y espera su resultado
    getPtosControl().then(ptoCtrolArray => { //devuelve promesa
        
        console.log("Puntos de control:", ptoCtrolArray); // Muestra el array en la consola

        // HTML
        const app = document.getElementById('app');
        app.innerHTML = `
            <h2>Lista de checkpoints (segun Rama)</h2>
            <ul>
                ${ptoCtrolArray.map(ptoCtrol => `
                    <li>ID: ${ptoCtrol.id}, Nombre: ${ptoCtrol.nombre}, Description: ${ptoCtrol.description}</li>
                `).join('')}
                //todo: agregarle mas mistica para que quede mas fachero
            </ul>
        `;
    });
}
*/
//! no se si va esto aca
function post(id, lat, long, description) {
    
    //deberia ahcer un get desde al back
    renderAnimalList();
    
}