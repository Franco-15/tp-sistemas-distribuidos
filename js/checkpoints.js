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

function get() {
    
    // deberia ahcer un get al back, devuelve un array 
    renderAnimalList();
    
}


//! no se si va esto aca
function post(id, lat, long, description) {
    
    //deberia ahcer un get desde al back
    renderAnimalList();
    
}